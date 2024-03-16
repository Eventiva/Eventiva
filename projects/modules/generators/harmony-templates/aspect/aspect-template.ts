import { ComponentFile, ComponentContext, ComponentTemplate } from "@teambit/generator";
import { ComponentID } from '@teambit/component-id';
import { Logger } from '@teambit/logger';
import prompts from 'prompts';
import { EnvContext } from "@teambit/envs";
import { indexFile } from "./files/index-template.js";
import { HarmonyTemplatesOptions } from "../harmony-templates-options.js";
import { runtimeFile } from "./files/aspect-runtime.js";
import { configFile } from "./files/config-template.js";
import { aspectFile } from "./files/aspect-template.js";
import { AspectUserInput } from "./aspect-user-input.js";
import { slotFile } from "./files/slot-template.js";
import { docsFile } from "./files/docs-template.js";
import { testFile } from "./files/test-template.js";
import { defaultRuntimes } from "./default-runtimes.js";

export type AspectTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  options?: HarmonyTemplatesOptions,
  interactive?: boolean,
  env?: string
};

export class AspectTemplate implements ComponentTemplate {
  constructor(
    private logger: Logger,
    readonly name = 'aspect',
    readonly description = 'create an aspect, and compose to your harmony platform',
    readonly hidden = false,
    readonly env?: string,
    readonly options: HarmonyTemplatesOptions = {},
    readonly interactive = true,
    readonly installMissingDeps = true
  ) {}

  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    this.logger.off();
    const configRuntimes = this.options.runtimes || defaultRuntimes;
    const runtimeNames = configRuntimes?.map((runtime) => runtime.name);
    const userInput: AspectUserInput = this.interactive
      ? await this.prompt(context.componentId, runtimeNames)
      : {};

    const runtimes = !userInput.runtimes 
      ? configRuntimes
      : configRuntimes.filter((runtime) => {
        return userInput?.runtimes?.includes(runtime.name);
      });

    const userRuntimeNames = runtimes.map((runtime) => {
      return runtime.name;
    });

    const configImports = runtimes.reduce<{imports?: string, configExtends?: string}>((acc, runtime) => {
      if (!runtime.imports) return acc;
      
      const runtimeImports = runtime.imports(context).map((imp) => {
        // only import if specifically defined in the runtime config
        if (typeof imp === 'string' || !imp[1].config) return undefined;
        return imp[0];
      }).join('\n');

      const config = runtime.configExtends ? runtime.configExtends?.(context) : undefined;
      const configExtends =  typeof config === 'object' ? config[0] : config

      return {
        imports: acc.imports ? `${acc.imports}\n ${runtimeImports}` : runtimeImports,
        extends: acc.configExtends ? `${acc.configExtends}& ${configExtends}` : configExtends
      };
    }, {imports: '', configExtends: ''});

    const slots = userInput.slots?.filter(slot => !!slot) || [];

    const runtimeFiles = runtimes?.flatMap((runtime) => {
      const userFiles = runtime.files ? runtime.files(context) : [];
      return [runtimeFile(context, runtime, slots || []), ...userFiles];
    }) || [];

    const testFiles = runtimes?.map((runtime) => {
      return testFile(context, runtime.name);
    }) || [];

    const slotFiles = slots?.map((slot) => slotFile(slot)) || [];
    const docsContent = this.options.docsFile
      ? this.options.docsFile(context)
      : docsFile(context);

    return [
      indexFile(context, this.options, userRuntimeNames),
      aspectFile(context),
      configFile(context, configImports),
      docsContent,
      ...testFiles,
      ...runtimeFiles,
      ...slotFiles
    ];
  }


  private async prompt(componentId: ComponentID, runtimes: string[]) {
    const userInput = await prompts([
      {
        name: 'runtimes',
        type: 'multiselect',
        instructions: false,
        onState: ({ aborted }) => {
          if (aborted) {
            console.error('\naborted aspect creation');
            process.exit(1);
          }
        },
        message: `select runtimes to support for "${componentId.name}"`,
        choices: runtimes?.map((runtime) => {
          return {
            title: runtime,
            value: runtime
          }
        })
      },
      {
        name: 'slots',
        type: 'list',
        message: `enter integration slots (e.g. "route,menu-item") for "${componentId.name}"`,
      },
    ]);

    return userInput;
  }

  static from(options: AspectTemplateOptions = {}) {
    return (context: EnvContext) => {
      const logger = context.createLogger(AspectTemplate.name);
      return new AspectTemplate(
        logger,
        options.name,
        options.description,
        options.hidden,
        options.env,
        options.options,
        options.interactive,
      );
    };
  }
}
