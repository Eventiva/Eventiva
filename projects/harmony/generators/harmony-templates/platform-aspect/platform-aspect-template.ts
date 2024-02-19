import { ComponentFile, ComponentTemplate, ComponentContext } from "@teambit/generator";
import { aspectFile } from "../aspect/files/aspect-template";
import { docsFile } from "../aspect/files/docs-template";
import { HarmonyTemplatesOptions } from "../harmony-templates-options";
import { indexFile } from "./files/index-file";
import { uiTests } from "./files/ui-tests";
import { nodeTests } from "./files/node-tests";
import { platformNodeFile } from "./files/platform-node";
import { platformUiTemplate } from "./files/platform-ui-template";
import { routeTypeFile } from "./files/route";
import { backendTypesFile } from "./files/backend";
import { platformAppFile } from "./files/app-file";
import { platformGateway } from "./files/gateway";
import { clientMounterFile } from "./files/client-mount";
import { serverMountFile } from "./files/server-mount";
import { configFile } from "./files/config";

export type PlatformAspectTemplateOptions = {
  name?: string,
  options?: HarmonyTemplatesOptions,
  description?: string,
  hidden?: boolean,
  interactive?: boolean,
  installMissingDeps?: boolean,
  env?: string
};

export class PlatformAspectTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'platform-aspect',
    readonly description = 'create an entry aspect for your Harmony platform. usually responsible for the platform infrastructure',
    readonly hidden = false,
    readonly env?: string,
    readonly installMissingDeps = true,
    readonly options: HarmonyTemplatesOptions = {},
  ) {}

  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    return [
      aspectFile(context),
      docsFile(context),
      indexFile(context),
      uiTests(context),
      nodeTests(context),
      platformNodeFile(context),
      platformUiTemplate(context),
      routeTypeFile(),
      configFile(context),
      backendTypesFile(context),
      platformAppFile(context),
      platformGateway(context),
      clientMounterFile(context),
      serverMountFile(context),
    ];
  }

  static from(options: PlatformAspectTemplateOptions = {}) {
    return () => {
      return new PlatformAspectTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env,
        options.installMissingDeps,
        options.options
      );
    };
  }
}
