#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const run = (cmd, args, env = process.env) =>
    spawnSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), env });
const runCapture = (cmd, args, env = process.env) =>
    spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], cwd: process.cwd(), encoding: 'utf8', env });
const runSilent = (cmd, args, env = process.env) =>
    spawnSync(cmd, args, { stdio: 'ignore', cwd: process.cwd(), env });
const check = (cmd, args) => spawnSync(cmd, args, { stdio: 'ignore', cwd: process.cwd() }).status === 0;

if (process.env.EVENTIVA_CLUSTER_BUILD_IMAGES === '0') {
    process.exit(0);
}

/** postgresql | mysql | full — controls which runtime images are built/loaded (default: full). */
const stack = process.env.EVENTIVA_CLUSTER_STACK ?? process.env.EVENTIVA_CLUSTER_PROFILE ?? 'full';
const buildPostgresRuntime = stack === 'full' || stack === 'postgresql';
const buildMysqlRuntime = stack === 'full' || stack === 'mysql';

const runtimeImage = process.env.EVENTIVA_RUNTIME_IMAGE ?? 'docker.io/eventiva/runtime:local';
const shortRuntimeImage = runtimeImage.replace(/^docker\.io\//, '');
const localRuntimeImage = shortRuntimeImage.startsWith('localhost/')
    ? shortRuntimeImage
    : `localhost/${shortRuntimeImage}`;
const engine = check('which', ['podman']) ? 'podman' : check('which', ['docker']) ? 'docker' : undefined;
if (!engine) {
    console.error('No container engine found. Install podman or docker to build local images.');
    process.exit(1);
}

if (buildPostgresRuntime) {
    const built = run(engine, [
        'build',
        '-f',
        'tools/cluster/Dockerfile.runtime',
        '-t',
        runtimeImage,
        '-t',
        shortRuntimeImage,
        '.',
    ]);
    if ((built.status ?? 1) !== 0) process.exit(built.status ?? 1);
} else {
    console.warn(
        `EVENTIVA_CLUSTER_STACK=${stack}: skipping Postgres/runtime image build (tools/cluster/Dockerfile.runtime).`
    );
}

const mysqlRuntimeImage =
    process.env.EVENTIVA_RUNTIME_IMAGE_MYSQL ?? 'docker.io/eventiva/runtime-mysql:local';
const shortMysqlImage = mysqlRuntimeImage.replace(/^docker\.io\//, '');
if (buildMysqlRuntime) {
    const builtMysql = run(engine, [
        'build',
        '-f',
        'tools/cluster/Dockerfile.runtime.mysql',
        '-t',
        mysqlRuntimeImage,
        '-t',
        shortMysqlImage,
        '.',
    ]);
    if ((builtMysql.status ?? 1) !== 0) process.exit(builtMysql.status ?? 1);
} else {
    console.warn(
        `EVENTIVA_CLUSTER_STACK=${stack}: skipping MySQL runtime image build (tools/cluster/Dockerfile.runtime.mysql).`
    );
}

const context = runCapture('kubectl', ['config', 'current-context']);
const currentContext = (context.stdout ?? '').trim();
const kindAvailable = check('which', ['kind']);
if (kindAvailable && currentContext.startsWith('kind-') && (buildPostgresRuntime || buildMysqlRuntime)) {
    const clusterName = currentContext.replace(/^kind-/, '');
    const kindEnv = engine === 'podman' ? { ...process.env, KIND_EXPERIMENTAL_PROVIDER: 'podman' } : process.env;
    const controlPlaneSuffix = `${clusterName}-control-plane`;

    const sleepMs = (ms) => {
        const seconds = Math.max(1, Math.ceil(ms / 1000));
        spawnSync('sh', ['-c', `sleep ${seconds}`], { stdio: 'ignore' });
    };

    /** Prefer kubectl: podman filter/name for Kind nodes is unreliable across engines. */
    const waitForClusterReadyForImageLoad = () => {
        const maxAttempts = Number(process.env.EVENTIVA_KIND_WAIT_ATTEMPTS ?? '60');
        const intervalMs = Number(process.env.EVENTIVA_KIND_WAIT_INTERVAL_MS ?? '2000');
        const waitTimeoutSec = process.env.EVENTIVA_KIND_KUBECTL_WAIT_TIMEOUT_SEC ?? '45';
        console.warn('Waiting for cluster API and nodes Ready before Kind image load...');
        for (let i = 0; i < maxAttempts; i++) {
            const info = runSilent('kubectl', ['cluster-info'], kindEnv);
            if ((info.status ?? 1) !== 0) {
                sleepMs(intervalMs);
                continue;
            }
            const wait = runSilent(
                'kubectl',
                ['wait', '--for=condition=Ready', 'nodes', '--all', `--timeout=${waitTimeoutSec}s`],
                kindEnv
            );
            if ((wait.status ?? 1) === 0) return true;
            sleepMs(intervalMs);
        }
        const list = runCapture(engine, ['ps', '-a', '--format', '{{.Names}}\t{{.Status}}'], kindEnv);
        const lines = (list.stdout ?? '').split('\n').filter(Boolean);
        const matches = lines.filter((line) => line.includes(controlPlaneSuffix));
        console.error(
            [
                'Cluster did not become ready in time (kubectl wait nodes).',
                matches.length
                    ? `Matching ${engine} containers:\n${matches.join('\n')}`
                    : `No ${engine} container name containing "${controlPlaneSuffix}" found. Check: ${engine} ps -a`,
                'If the Kind node is stopped: podman start <container> or recreate:',
                `  kind delete cluster --name ${clusterName}`,
                `  KIND_EXPERIMENTAL_PROVIDER=podman kind create cluster --name ${clusterName}`,
            ].join('\n')
        );
        return false;
    };

    if (!waitForClusterReadyForImageLoad()) {
        process.exit(1);
    }

    const maxLoadAttempts = Number(process.env.EVENTIVA_KIND_LOAD_RETRIES ?? '3');
    const loadRetryMs = Number(process.env.EVENTIVA_KIND_LOAD_RETRY_MS ?? '5000');

    if (buildPostgresRuntime) {
        // Podman tags images as docker.io/... ; `kind load docker-image eventiva/runtime:local` often fails to resolve.
        const preferredImages = Array.from(
            new Set(
                engine === 'podman'
                    ? [runtimeImage, shortRuntimeImage, localRuntimeImage]
                    : [shortRuntimeImage, localRuntimeImage, runtimeImage]
            )
        );
        let loadedAny = false;
        const tryLoadDockerImage = () => {
            for (const image of preferredImages) {
                const loaded = spawnSync('kind', ['load', 'docker-image', image, '--name', clusterName], {
                    stdio: 'inherit',
                    cwd: process.cwd(),
                    env: kindEnv,
                });
                if ((loaded.status ?? 1) === 0) {
                    loadedAny = true;
                    return;
                }
            }
        };

        const tryLoadArchive = () => {
            const archivePath = '/tmp/eventiva-runtime-local.tar';
            const saved = run(engine, ['save', '-o', archivePath, runtimeImage], kindEnv);
            if ((saved.status ?? 1) !== 0) {
                rmSync(archivePath, { force: true });
                return false;
            }
            const loadedArchive = spawnSync('kind', ['load', 'image-archive', archivePath, '--name', clusterName], {
                stdio: 'inherit',
                cwd: process.cwd(),
                env: kindEnv,
            });
            rmSync(archivePath, { force: true });
            return (loadedArchive.status ?? 1) === 0;
        };

        for (let attempt = 1; attempt <= maxLoadAttempts; attempt++) {
            tryLoadDockerImage();
            if (loadedAny) break;
            if (tryLoadArchive()) {
                loadedAny = true;
                break;
            }
            if (attempt < maxLoadAttempts) {
                console.warn(
                    `Kind image load failed (attempt ${attempt}/${maxLoadAttempts}). Retrying after ${loadRetryMs}ms...`
                );
                sleepMs(loadRetryMs);
                if (!waitForClusterReadyForImageLoad()) {
                    process.exit(1);
                }
            }
        }

        if (!loadedAny) {
            console.error(`Failed to load runtime image into kind cluster "${clusterName}".`);
            console.error(
                'If you see "container state improper", the Kind node may be stopped or broken. Recreate with:\n' +
                    `  kind delete cluster --name ${clusterName}\n` +
                    `  kind create cluster --name ${clusterName}`
            );
            process.exit(1);
        }
    }

    if (buildMysqlRuntime) {
        const localMysqlImage = shortMysqlImage.startsWith('localhost/')
            ? shortMysqlImage
            : `localhost/${shortMysqlImage}`;
        const preferredMysqlImages = Array.from(
            new Set(
                engine === 'podman'
                    ? [mysqlRuntimeImage, shortMysqlImage, localMysqlImage]
                    : [shortMysqlImage, localMysqlImage, mysqlRuntimeImage]
            )
        );
        let mysqlLoadedAny = false;
        const tryLoadMysqlDockerImage = () => {
            for (const image of preferredMysqlImages) {
                const loaded = spawnSync('kind', ['load', 'docker-image', image, '--name', clusterName], {
                    stdio: 'inherit',
                    cwd: process.cwd(),
                    env: kindEnv,
                });
                if ((loaded.status ?? 1) === 0) {
                    mysqlLoadedAny = true;
                    return;
                }
            }
        };

        const tryLoadMysqlArchive = () => {
            const archivePath = '/tmp/eventiva-runtime-mysql-local.tar';
            const saved = run(engine, ['save', '-o', archivePath, mysqlRuntimeImage], kindEnv);
            if ((saved.status ?? 1) !== 0) {
                rmSync(archivePath, { force: true });
                return false;
            }
            const loadedArchive = spawnSync('kind', ['load', 'image-archive', archivePath, '--name', clusterName], {
                stdio: 'inherit',
                cwd: process.cwd(),
                env: kindEnv,
            });
            rmSync(archivePath, { force: true });
            return (loadedArchive.status ?? 1) === 0;
        };

        for (let attempt = 1; attempt <= maxLoadAttempts; attempt++) {
            tryLoadMysqlDockerImage();
            if (mysqlLoadedAny) break;
            if (tryLoadMysqlArchive()) {
                mysqlLoadedAny = true;
                break;
            }
            if (attempt < maxLoadAttempts) {
                console.warn(
                    `Kind MySQL image load failed (attempt ${attempt}/${maxLoadAttempts}). Retrying after ${loadRetryMs}ms...`
                );
                sleepMs(loadRetryMs);
                if (!waitForClusterReadyForImageLoad()) {
                    process.exit(1);
                }
            }
        }
        if (!mysqlLoadedAny) {
            console.error(`Failed to load MySQL runtime image into kind cluster "${clusterName}".`);
            process.exit(1);
        }
    }
}
