/**
 * this env extends the Bit official NodeJS environment.
 * learn more: https://bit.cloud/bitdev/node/node-env
 */

import { NodeEnv } from '@eventiva/envs.node';

export class Prisma extends NodeEnv {
  /* shorthand name for the environment */
  /**
   * shorthand name for the environment
   *
   * @type {string}
   */
  name = "prisma";

  /**
   * Return the result of calling the 'build' method of the superclass and adding an empty array.
   *
   * @returns {*} Builds and adds an empty array to the result of calling the super class's build method.
   */
  build() {
    return super.build().add([

    ])
  }
}

export default new Prisma();
