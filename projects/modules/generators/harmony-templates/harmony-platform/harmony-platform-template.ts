import { ComponentFile, ComponentTemplate, ComponentContext } from "@teambit/generator";
import { indexFile } from "./files/index-file";
import { indexHtmlFile } from "./files/index-html";
import { platformApp } from "./files/harmony-bit-app";
import { platformDocsFile } from "./files/platform-docs";

export type HarmonyPlatformTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  interactive?: boolean,
  env?: string
};

export class HarmonyPlatformTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'harmony-platform',
    readonly description = 'create an harmony platform. compose business aspects into a unified platform',
    readonly hidden = false,
    readonly env?: string,
    readonly installMissingDependencies = true,
    readonly isApp = true,
  ) {}

  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    return [
      indexFile(context),
      indexHtmlFile(context),
      platformApp(context),
      platformDocsFile(context),
    ];
  }

  static from(options: HarmonyPlatformTemplateOptions = {}) {
    return () => {
      return new HarmonyPlatformTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env,
      );
    };
  }
}
