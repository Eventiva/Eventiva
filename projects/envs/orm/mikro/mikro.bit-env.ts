/**
 * this env extends the Bit official NodeJS environment.
 * learn more: https://bit.cloud/bitdev/node/node-env
 */
import { NodeEnv } from '@eventiva/envs.node';

/**
 * A class named Mikro that extends NodeEnv. It has a property 'name' representing the shorthand name for the environment. It contains a method 'build' that returns a Pipeline built from various tasks such as TypescriptTask, EslintTask, and VitestTask.
 *
 * @export
 * @class Mikro
 * @typedef {Mikro}
 * @extends {NodeEnv}
 */
export class Mikro extends NodeEnv {
  /* shorthand name for the environment */
  /**
   * shorthand name for the environment
   *
   * @type {string}
   */
  name = "mikro";

  /**
   * Builds and returns a pipeline with TypeScript, ESLint, and Vitest tasks. The pipeline consists of a TypeScript task with the provided tsconfig path and types resolved from the given tsTypesPath. It also includes an ESLint task with the tsconfig path, ESLint config path, plugins path, and specified extensions. Additionally, it includes a Vitest task with the config resolved from the vitest.config.mjs file.
   *
   * @returns {*} Returns a pipeline with TypeScriptTask, EslintTask, and VitestTask tasks with specified configurations and paths.
   */
  build() {
    return super.build().add([

    ]);
  }
}

export default new Mikro();
