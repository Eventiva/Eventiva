#!/usr/bin/env node
/**
 * Build runtime images and optionally load into Kind. Subprocesses use @effect/platform Command.
 */
import { rmSync } from 'node:fs';
import { envRecord, runPromiseWithNode } from '../src/cli-run.js';
import { captureStdout, exitCodeInherit, exitCodeSilent } from '../src/cluster-shell.js';
import {
    CLUSTER_FPK_DOCKERFILE_RUNTIME,
    CLUSTER_FPK_DOCKERFILE_RUNTIME_MYSQL,
} from '../src/cluster-fpk-paths.js';

const cwd = process.cwd();

if (process.env.EVENTIVA_CLUSTER_BUILD_IMAGES === '0') {
    process.exit(0);
}

const stack = process.env.EVENTIVA_CLUSTER_STACK ?? process.env.EVENTIVA_CLUSTER_PROFILE ?? 'full';
const buildPostgresRuntime = stack === 'full' || stack === 'postgresql';
const buildMysqlRuntime = stack === 'full' || stack === 'mysql';

const runtimeImage = process.env.EVENTIVA_RUNTIME_IMAGE ?? 'docker.io/eventiva/runtime:local';
const shortRuntimeImage = runtimeImage.replace(/^docker\.io\//, '');
const localRuntimeImage = shortRuntimeImage.startsWith('localhost/')
    ? shortRuntimeImage
    : `localhost/${shortRuntimeImage}`;

async function check(cmd: string, args: string[]): Promise<boolean> {
    const code = await runPromiseWithNode(exitCodeSilent(cwd, cmd, args));
    return code === 0;
}

async function main(): Promise<void> {
    const engine = (await check('which', ['podman']))
        ? 'podman'
        : (await check('which', ['docker']))
          ? 'docker'
          : undefined;
    if (!engine) {
        console.error('No container engine found. Install podman or docker to build local images.');
        process.exit(1);
    }

    if (buildPostgresRuntime) {
        const built = await runPromiseWithNode(
            exitCodeInherit(cwd, engine, [
                'build',
                '-f',
                CLUSTER_FPK_DOCKERFILE_RUNTIME,
                '-t',
                runtimeImage,
                '-t',
                shortRuntimeImage,
                '.',
            ]),
        );
        if (built !== 0) process.exit(built);
    } else {
        console.warn(
            `EVENTIVA_CLUSTER_STACK=${stack}: skipping Postgres/runtime image build (${CLUSTER_FPK_DOCKERFILE_RUNTIME}).`,
        );
    }

    const mysqlRuntimeImage =
        process.env.EVENTIVA_RUNTIME_IMAGE_MYSQL ?? 'docker.io/eventiva/runtime-mysql:local';
    const shortMysqlImage = mysqlRuntimeImage.replace(/^docker\.io\//, '');
    if (buildMysqlRuntime) {
        const builtMysql = await runPromiseWithNode(
            exitCodeInherit(cwd, engine, [
                'build',
                '-f',
                CLUSTER_FPK_DOCKERFILE_RUNTIME_MYSQL,
                '-t',
                mysqlRuntimeImage,
                '-t',
                shortMysqlImage,
                '.',
            ]),
        );
        if (builtMysql !== 0) process.exit(builtMysql);
    } else {
        console.warn(
            `EVENTIVA_CLUSTER_STACK=${stack}: skipping MySQL runtime image build (${CLUSTER_FPK_DOCKERFILE_RUNTIME_MYSQL}).`,
        );
    }

    const context = await runPromiseWithNode(captureStdout(cwd, 'kubectl', ['config', 'current-context']));
    const currentContext = context.trim();
    const kindAvailable = await check('which', ['kind']);
    if (kindAvailable && currentContext.startsWith('kind-') && (buildPostgresRuntime || buildMysqlRuntime)) {
        const clusterName = currentContext.replace(/^kind-/, '');
        const kindEnv: NodeJS.ProcessEnv =
            engine === 'podman' ? { ...process.env, KIND_EXPERIMENTAL_PROVIDER: 'podman' } : process.env;
        const kindEnvRec = envRecord(kindEnv);
        const controlPlaneSuffix = `${clusterName}-control-plane`;

        const sleepMs = async (ms: number) => {
            const seconds = Math.max(1, Math.ceil(ms / 1000));
            await runPromiseWithNode(exitCodeSilent(cwd, 'sh', ['-c', `sleep ${seconds}`]));
        };

        const waitForClusterReadyForImageLoad = async (): Promise<boolean> => {
            const maxAttempts = Number(process.env.EVENTIVA_KIND_WAIT_ATTEMPTS ?? '60');
            const intervalMs = Number(process.env.EVENTIVA_KIND_WAIT_INTERVAL_MS ?? '2000');
            const waitTimeoutSec = process.env.EVENTIVA_KIND_KUBECTL_WAIT_TIMEOUT_SEC ?? '45';
            console.warn('Waiting for cluster API and nodes Ready before Kind image load...');
            for (let i = 0; i < maxAttempts; i++) {
                const info = await runPromiseWithNode(
                    exitCodeSilent(cwd, 'kubectl', ['cluster-info'], kindEnvRec),
                );
                if (info !== 0) {
                    await sleepMs(intervalMs);
                    continue;
                }
                const wait = await runPromiseWithNode(
                    exitCodeSilent(
                        cwd,
                        'kubectl',
                        ['wait', '--for=condition=Ready', 'nodes', '--all', `--timeout=${waitTimeoutSec}s`],
                        kindEnvRec,
                    ),
                );
                if (wait === 0) return true;
                await sleepMs(intervalMs);
            }
            const list = await runPromiseWithNode(
                captureStdout(cwd, engine, ['ps', '-a', '--format', '{{.Names}}\t{{.Status}}'], kindEnvRec),
            );
            const lines = list.split('\n').filter(Boolean);
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
                ].join('\n'),
            );
            return false;
        };

        if (!(await waitForClusterReadyForImageLoad())) {
            process.exit(1);
        }

        const maxLoadAttempts = Number(process.env.EVENTIVA_KIND_LOAD_RETRIES ?? '3');
        const loadRetryMs = Number(process.env.EVENTIVA_KIND_LOAD_RETRY_MS ?? '5000');

        if (buildPostgresRuntime) {
            const preferredImages = Array.from(
                new Set(
                    engine === 'podman'
                        ? [runtimeImage, shortRuntimeImage, localRuntimeImage]
                        : [shortRuntimeImage, localRuntimeImage, runtimeImage],
                ),
            );
            let loadedAny = false;
            const tryLoadDockerImage = async () => {
                for (const image of preferredImages) {
                    const loaded = await runPromiseWithNode(
                        exitCodeInherit(
                            cwd,
                            'kind',
                            ['load', 'docker-image', image, '--name', clusterName],
                            kindEnvRec,
                        ),
                    );
                    if (loaded === 0) {
                        loadedAny = true;
                        return;
                    }
                }
            };

            const tryLoadArchive = async (): Promise<boolean> => {
                const archivePath = '/tmp/eventiva-runtime-local.tar';
                const saved = await runPromiseWithNode(
                    exitCodeInherit(cwd, engine, ['save', '-o', archivePath, runtimeImage], kindEnvRec),
                );
                if (saved !== 0) {
                    rmSync(archivePath, { force: true });
                    return false;
                }
                const loadedArchive = await runPromiseWithNode(
                    exitCodeInherit(
                        cwd,
                        'kind',
                        ['load', 'image-archive', archivePath, '--name', clusterName],
                        kindEnvRec,
                    ),
                );
                rmSync(archivePath, { force: true });
                return loadedArchive === 0;
            };

            for (let attempt = 1; attempt <= maxLoadAttempts; attempt++) {
                await tryLoadDockerImage();
                if (loadedAny) break;
                if (await tryLoadArchive()) {
                    loadedAny = true;
                    break;
                }
                if (attempt < maxLoadAttempts) {
                    console.warn(
                        `Kind image load failed (attempt ${attempt}/${maxLoadAttempts}). Retrying after ${loadRetryMs}ms...`,
                    );
                    await sleepMs(loadRetryMs);
                    if (!(await waitForClusterReadyForImageLoad())) {
                        process.exit(1);
                    }
                }
            }

            if (!loadedAny) {
                console.error(`Failed to load runtime image into kind cluster "${clusterName}".`);
                console.error(
                    'If you see "container state improper", the Kind node may be stopped or broken. Recreate with:\n' +
                        `  kind delete cluster --name ${clusterName}\n` +
                        `  kind create cluster --name ${clusterName}`,
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
                        : [shortMysqlImage, localMysqlImage, mysqlRuntimeImage],
                ),
            );
            let mysqlLoadedAny = false;
            const tryLoadMysqlDockerImage = async () => {
                for (const image of preferredMysqlImages) {
                    const loaded = await runPromiseWithNode(
                        exitCodeInherit(
                            cwd,
                            'kind',
                            ['load', 'docker-image', image, '--name', clusterName],
                            kindEnvRec,
                        ),
                    );
                    if (loaded === 0) {
                        mysqlLoadedAny = true;
                        return;
                    }
                }
            };

            const tryLoadMysqlArchive = async (): Promise<boolean> => {
                const archivePath = '/tmp/eventiva-runtime-mysql-local.tar';
                const saved = await runPromiseWithNode(
                    exitCodeInherit(cwd, engine, ['save', '-o', archivePath, mysqlRuntimeImage], kindEnvRec),
                );
                if (saved !== 0) {
                    rmSync(archivePath, { force: true });
                    return false;
                }
                const loadedArchive = await runPromiseWithNode(
                    exitCodeInherit(
                        cwd,
                        'kind',
                        ['load', 'image-archive', archivePath, '--name', clusterName],
                        kindEnvRec,
                    ),
                );
                rmSync(archivePath, { force: true });
                return loadedArchive === 0;
            };

            for (let attempt = 1; attempt <= maxLoadAttempts; attempt++) {
                await tryLoadMysqlDockerImage();
                if (mysqlLoadedAny) break;
                if (await tryLoadMysqlArchive()) {
                    mysqlLoadedAny = true;
                    break;
                }
                if (attempt < maxLoadAttempts) {
                    console.warn(
                        `Kind MySQL image load failed (attempt ${attempt}/${maxLoadAttempts}). Retrying after ${loadRetryMs}ms...`,
                    );
                    await sleepMs(loadRetryMs);
                    if (!(await waitForClusterReadyForImageLoad())) {
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
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
