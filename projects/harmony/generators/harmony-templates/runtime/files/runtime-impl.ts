import { ComponentContext } from "@teambit/generator";


export function runtimeImplFile(context: ComponentContext) {
  const runtimeDefId = `${context.namePascalCase}Def`;
  return {
    relativePath: `${context.name}.ts`,
    content: `import type { AppBuildResult } from "@teambit/application";
import { pathToFileURL } from 'node:url';
import { NodeApp } from '@bitdev/node.node-app';
import { HarmonyRuntimeContext, RuntimeBuildContext, Runtime } from "@bitdev/harmony.harmony-platform";
import { ${runtimeDefId} } from "./${context.name}-definition.js";

/**
 * A ${context.namePascalCase} runtime for Harmony platforms.
 */
export class ${context.namePascalCase} implements Runtime {
  name = ${runtimeDefId}.name;

  runtimeAspect = import.meta.resolve('./${context.name}.aspect.js');

  private createAppType(runnerPath: string, appName: string) {
    // run your app
    // you can ready made use app types for Webpack, Vite, SSR, ESBuild and more.
    // https://bit.dev/reference/apps/create-apps
    const path = pathToFileURL(runnerPath).toString();

    const nodeApp = NodeApp.from({
      name: this.name,
      mainPath: path,
      artifactName: \`\${appName}-\${this.name}\`
    });

    return nodeApp;
  }

  async run(context: HarmonyRuntimeContext) {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.run(context);
    return appInstance;
  }

  async build(context: RuntimeBuildContext): Promise<AppBuildResult> {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.build(context);
    return appInstance;
  }
}        
`
  };
}
