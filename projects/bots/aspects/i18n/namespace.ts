import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface Namespace {
  /**
   * name of the item
   */
  name: string;
}

export type NamespaceSlot = SlotRegistry<Namespace[]>;
