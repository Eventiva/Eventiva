/**
 * this env extends the Bit official Harmony environment.
 * learn more: https://bit.cloud/bitdev/harmony/harmony-env
 */
import { HarmonyEnv } from '@bitdev/harmony.harmony-env';
import { Generator} from '@eventiva/envs.generator'

/**
 * Class representing a Node that extends HarmonyEnv.
 * A shorthand name for the environment is 'node'.
 * The Node class includes a generator method.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @extends {HarmonyEnv}
 */
export class Node extends HarmonyEnv {
  /* shorthand name for the environment */
  /**
   * shorthand name for the environment
   * @author Jonathan Stevens (@TGTGamer)
   */
  name = "Eventiva Node Environment";

  /**
   * A generator function.
   * @author Jonathan Stevens (@TGTGamer)
   */
  generators() {
    return Generator()
  }
}

export default new Node();
