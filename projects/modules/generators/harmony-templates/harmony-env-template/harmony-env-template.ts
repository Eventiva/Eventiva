import {
  ComponentConfig,
  ComponentContext,
  ComponentFile,
  ComponentTemplate,
} from '@teambit/generator';
import { indexFile } from './files/index-file';
import { NodeEnv } from './files/node-env-bit-env';
import { envJson } from './files/env-jsonc';
import { eslintConfigFile } from './files/config/eslintrc';
import { tsConfigFile } from './files/config/tsconfig.json';
import { jestConfigFile } from './files/config/jest.config';
import { prettierConfigFile } from './files/config/prettier.config';
import { webpackTransformerFile } from './files/config/webpack-transformer';
import { assetsFile } from './files/types/asset';
import { styleFile } from './files/types/style';
import { envDocsFile } from './files/docs';

export type HarmonyEnvTemplateOptions = {
  /**
   * name of the template
   */
  name?: string;

  /**
   * description of the template.
   */
  description?: string;

  /**
   * hide the template from the `bit templates` command.
   */
  hidden?: boolean;
};

export class HarmonyEnvTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'harmony-env',
    readonly description = 'create a customized nodejs dev environment',
    readonly hidden = false,
    readonly installMissingDeps = true,
  ) {}

  generateFiles(context: ComponentContext): ComponentFile[] {
    return [
      indexFile(context),
      NodeEnv(context),
      envJson(),
      eslintConfigFile(),
      tsConfigFile(),
      jestConfigFile(),
      prettierConfigFile(),
      webpackTransformerFile(),
      assetsFile(),
      styleFile(),
      envDocsFile(context)
    ];
  }

  config(): ComponentConfig {
    return {
      'teambit.envs/envs': {
        env: 'teambit.envs/env',
      },
    };
  }

  static from(options: HarmonyEnvTemplateOptions = {}) {
    return () =>
      new HarmonyEnvTemplate(options.name, options.description, options.hidden);
  }
}
