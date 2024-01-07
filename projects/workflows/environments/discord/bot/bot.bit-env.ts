/**
 * this env extends the Bit official NodeJS environment.
 * learn more: https://bit.cloud/bitdev/node/node-env
 */
import { NodeEnv } from '@bitdev/node.node-env';
import { Compiler } from '@teambit/compiler';
import { EnvHandler } from '@teambit/envs';
import { Pipeline } from '@teambit/builder';
import {
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
} from '@teambit/typescript.typescript-compiler';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTask, JestTester } from '@teambit/defender.jest-tester';
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';

/**
 * A class representing a bot that extends NodeEnv.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class Bot
 * @typedef {Bot}
 * @extends {NodeEnv}
 */
export class Bot extends NodeEnv {
  /**
   * The name of the bot.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = 'bot';

  /**
   * Creates a new instance of TypescriptCompiler using the given tsconfigPath and tsTypesPath. The newly created TypescriptCompiler is wrapped in an EnvHandler and returned.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {EnvHandler<Compiler>} This function returns an instance of the TypescriptCompiler class initialized with the provided tsconfig path and types.
   */
  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      tsconfig: this.tsconfigPath,
      types: resolveTypes(__dirname, [this.tsTypesPath]),
    });
  }

  /**
   * Creates an instance of a JestTester using the jest config path.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {EnvHandler<Tester>} This function returns an instance of JestTester initialized with the Jest configuration file path.
   */
  tester(): EnvHandler<Tester> {
    return JestTester.from({
      config: this.jestConfigPath,
    });
  }

  /**
   * Creates and returns an instance of the ESLint Linter by configuring it with the provided options. The options include the path to the TypeScript configuration file, the path to the ESLint configuration file, the path to the ESLint plugins, and the allowed file extensions for ESLint.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {*} Creates an instance of the ESLintLinter class with the specified configuration.
   */
  linter() {
    return ESLintLinter.from({
      tsconfig: this.tsconfigPath,
      configPath: this.eslintConfigPath,
      pluginsPath: __dirname,
      extensions: this.eslintExtensions,
    });
  }

  /**
   * Creates a PrettierFormatter instance using the provided configuration path.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {*} Creates a PrettierFormatter instance using the specified configuration path.
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: this.prettierConfigPath,
    });
  }

  /**
   * Builds the pipeline by creating tasks for linting, typescript compilation, and Jest testing. Returns the built pipeline.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {*} Builds a pipeline for linting, compiling TypeScript, and running Jest tests.
   */
  build() {
    return Pipeline.from([
      EslintTask.from({
        tsconfig: this.tsconfigPath,
        configPath: this.eslintConfigPath,
        pluginsPath: __dirname,
        extensions: this.eslintExtensions,
      }),
      TypescriptTask.from({
        tsconfig: this.tsconfigPath,
        types: resolveTypes(__dirname, [this.tsTypesPath]),
      }),
      JestTask.from({ config: this.jestConfigPath }),
    ]);
  }
}

export default new Bot();
