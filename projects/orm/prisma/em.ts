import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface Em {
  /**
   * name of the item
   */
  name: string;
}

export type EmSlot = SlotRegistry<Em[]>;
