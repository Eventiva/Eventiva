import type { EnvHandler } from "@teambit/envs";
import type { ComponentContext, ComponentFile, ComponentTemplate } from "@teambit/generator";

export type GeneratorOptions = {
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
   * dependency names to include
   * in the runtime template.
   */
  dependencies?: string[];

  /**
   * list of files to include
   * if runtime is requested.
   */
  files?: (context: ComponentContext) => ComponentFile[];

  /**
   * list of imports to include in the pipeline.
   */
  imports?: (context: ComponentContext) => string[];

  /**
   * name of the extension for the runtime name.
   */
  extension?: string;

  /**
   * list of methods.
   */
  methods?: (context: ComponentContext) => string;
}
