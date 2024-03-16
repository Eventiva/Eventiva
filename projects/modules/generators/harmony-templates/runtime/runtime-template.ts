import { ComponentContext, ComponentFile, ComponentTemplate } from "@teambit/generator";
import { runtimeIndexFile } from "./files/runtime-index";
import { runtimeDefFile } from "./files/runtime-def";
import { runtimeImplFile } from "./files/runtime-impl";
import { aspectFile } from "../aspect/files/aspect-template";
import { runtimeDocs } from "./files/runtime-docs";

export type HarmonyRuntimeTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  interactive?: boolean,
  env?: string
};

export class HarmonyRuntimeTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'runtime',
    readonly description = 'builds an harmony runtime. used for development of new runtime environments for harmony',
    readonly hidden = false,
    readonly env?: string,
    readonly installMissingDeps = true
  ) {}

  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    return [
      runtimeIndexFile(context),
      runtimeDefFile(context),
      runtimeImplFile(context),
      aspectFile(context),
      runtimeDocs(context),
    ];
  }

  static from(options: HarmonyRuntimeTemplateOptions = {}) {
    return () => {
      return new HarmonyRuntimeTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env,
      );
    };
  }
}
