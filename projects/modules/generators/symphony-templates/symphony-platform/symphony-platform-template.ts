import { ComponentFile, ComponentTemplate, ComponentContext } from "@teambit/generator";
import { indexFile } from "./files/index-file";
import { indexHtmlFile } from "./files/index-html";
import { symphonyPlatformApp } from "./files/symphony-bit-app";
import { platformDocsFile } from "./files/platform-docs";

export type SymphonyPlatformTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  interactive?: boolean,
  env?: string
};

export class SymphonyPlatformTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'symphony-platform',
    readonly description = 'create symphony platform. compose business aspects into a unified platform',
    readonly hidden = false,
    readonly env?: string,
    readonly installMissingDependencies = true,
    readonly isApp = true,
  ) {}

  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    return [
      indexFile(context),
      indexHtmlFile(context),
      symphonyPlatformApp(context),
      platformDocsFile(context),
    ];
  }

  static from(options: SymphonyPlatformTemplateOptions = {}) {
    return () => {
      return new SymphonyPlatformTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env,
      );
    };
  }
}
