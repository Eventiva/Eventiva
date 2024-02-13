/**
 * this env extends the Bit official Harmony environment.
 * learn more: https://bit.cloud/bitdev/harmony/harmony-env
 */
import { HarmonyEnv } from '@bitdev/harmony.harmony-env';
import { Compiler } from "@teambit/compiler";
import { VitestTester, VitestTask } from '@teambit/vite.vitest-tester';
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

export class PythonEnv extends HarmonyEnv {
  /* shorthand name for the environment */
  name = "python-env";

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      tsconfig: this.tsconfigPath,
      types: resolveTypes(__dirname, [this.tsTypesPath]),
    });
  }

  /* the test runner to use during development */
  tester(): EnvHandler<Tester> {
    return VitestTester.from({
      config: require.resolve('./config/vitest.config.mjs'),
    });
  }

  /* the linter to use during development */
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

export default new PythonEnv();
