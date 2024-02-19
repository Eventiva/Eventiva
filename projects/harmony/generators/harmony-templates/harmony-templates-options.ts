import type { EnvHandler } from "@teambit/envs";
import type { ComponentContext, ComponentFile, ComponentTemplate } from "@teambit/generator";

export type HarmonyTemplatesOptions = {
  /**
   * name of the platform.
   */
  platformName?: string;

  /**
   * docs file contents.
   */
  docsFile?: (context: ComponentContext) => ComponentFile;

  /**
   * runtime to generate.
   */
  runtimes?: RuntimeOptions[],

  /**
   * disable creating platform aspects.
   */
  disablePlatformAspect?: boolean;

  /**
   * disable the harmony platform template.
   */
  disableHarmonyPlatform?: boolean;

  /**
   * include additional component templates.
   */
  templates?: EnvHandler<ComponentTemplate>[];
};


export type RuntimeOptions = {
  /**
   * name of the runtime.
   * e.g. browser, node
   */
  name: string;

  /**
   * contents to render into 
   * the runtime provider.
   */
  provider?: (context: ComponentContext) => string;

  /**
   * dependency to include
   * in the runtime template.
   */
  dependencies?: Dependencies;

  /**
   * list of files to include
   * if runtime is requested.
   */
  files?: (context: ComponentContext) => ComponentFile[];

  /**
   * list of imports to include in the pipeline.
   * optionally include a config or aspect flag to include the imports within that file.
   * default is to include in the runtime file.
   */
  imports?: (context: ComponentContext) => Imports;

  /**
   * Adds Extend to the runtimeAspect class. 
   * Pass either a string or an object with name and super.
   * e.g. `Class<ClassOption>`
   * results in "export class Name extends Class<ClassOption> {...}"
   * An optional super can replace the default super() call.
   */
  classExtends?: (context: ComponentContext) => ClassExtends;

  /**
   * defines classes to extend the config. 
   * e.g. "BaseConfig"
   * results in "export type NameConfig = {} & BaseConfig"
   * import must be defined in the imports option. 
   */
  configExtends?: (context: ComponentContext) => ConfigExtends // TODO switch to ConfigExtends and implement the object as a default onto the config in aspect-template.ts

  /**
   * name of the extension for the runtime name.
   */
  extension?: string;

  /**
   * list of methods.
   */
  methods?: (context: ComponentContext) => string;
}


export type Dependencies = (string | [string, {
  /**
   * Adds additional imports to the end of the import list
   * e.g. [`type NameModule`, `extraImport`]
   * results in "import { NameAspect, type NameRuntime, type NameModule, extraImport} from '@owner/scope.dependency';"
   */
  extraImports?: string[] 
}])[]

export type Imports = (string | [string, {
  /**
   * should the import be included in the config file?
   */
  config?: boolean
  /**
   * should the import be included in the aspect file?
   */
  runtime?: boolean
}])[]

export type ClassExtends = string | [string, {
  super: string
}]
export type ConfigExtends = string | [string, {
  config: string
}]