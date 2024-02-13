/**
 * this env extends the Bit official Harmony environment.
 * learn more: https://bit.cloud/bitdev/harmony/harmony-env
 */
import { HarmonyEnv } from '@bitdev/harmony.harmony-env';
import { Compiler } from "@teambit/compiler";
import { VitestTester, VitestTask } from '@teambit/vite.vitest-tester';
import { Generator } from '@eventiva/workflows.generator'
import { EnvHandler } from "@teambit/envs";
import { Pipeline } from '@teambit/builder';
import {
 TypescriptCompiler,
 resolveTypes,
 TypescriptTask,
} from "@teambit/typescript.typescript-compiler";
import { ESLintLinter, EslintTask } from "@teambit/defender.eslint-linter";
import { PrettierFormatter } from "@teambit/defender.prettier-formatter";
import { Tester } from "@teambit/tester";

/**
 * A class that extends HarmonyEnv and provides the environment for Harmony Bot.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @extends {HarmonyEnv}
 */
export class DiscordEnvs extends HarmonyEnv {
  /* shorthand name for the environment */
  /**
   * Shorthand name for the environment.
   * @author Jonathan Stevens (@TGTGamer)
   */
  name = "discord-envs";

  /* the compiler to use during development */
  /**
   * Returns the compiler to use during development.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns Returns the compiler to use during development.
   */
  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      tsconfig: this.tsconfigPath,
      types: resolveTypes(__dirname, [this.tsTypesPath]),
    });
  }

  /**
   * This function returns the instance of HarmonyBotGenerators.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns This function returns the HarmonyBotGenerators.
   */
  generators() {
    return Generator();
  }

  /* the test runner to use during development */
  /**
   * the test runner to use during development
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns Returns the test runner to use during development.
   */
  tester(): EnvHandler<Tester> {
    return VitestTester.from({
      config: require.resolve('./config/vitest.config.mjs'),
    });
  }

  /* the linter to use during development */
  /**
   * Creates and returns an instance of the ESLint linter using the specified configuration. The linter is used during the development process.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns Creates a linter from ESLintLinter with the specified configuration.
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
   * the formatter to use during development
   * (source files are not formatted as part of the components' build)
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: this.prettierConfigPath,
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/node-env/build-pipelines
   */
  build() {
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: this.tsconfigPath,
        types: resolveTypes(__dirname, [this.tsTypesPath]),
      }),
      EslintTask.from({
        tsconfig: this.tsconfigPath,
        configPath: this.eslintConfigPath,
        pluginsPath: __dirname,
        extensions: this.eslintExtensions,
      }),
      VitestTask.from({ 
        config: require.resolve('./config/vitest.config.mjs'),
      }),
    ]);
  }
}

export default new DiscordEnvs();
