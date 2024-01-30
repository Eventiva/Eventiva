import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface Resource {
  /**
   * name of the item
   */
  name: string;
}

export type ResourceSlot = SlotRegistry<Resource[]>;
