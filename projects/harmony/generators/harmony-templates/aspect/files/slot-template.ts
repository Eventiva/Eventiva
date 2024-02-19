import { camelCase, startCase, kebabCase } from "lodash";

export function generateName(slot: string) {
  const kebabCaseName = kebabCase(slot);
  const camelCaseSlot = camelCase(kebabCaseName);
  const pascalCase = startCase(camelCaseSlot).replace(/ /g, '');
  const displayName = kebabCaseName.replace('-', ' ');

  return {
    camelCaseSlot: `${camelCaseSlot}Slot`,
    pascalCaseSlot: `${pascalCase}Slot`,
    pascalCase,
    displayName,
    name: kebabCaseName,
    camelCase: camelCaseSlot,
  };
}

export function slotFile(slot: string) {
  const { pascalCaseSlot, pascalCase } = generateName(slot);

  return {
    relativePath: `${slot}.ts`,
    content: `import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface ${pascalCase} {
  /**
   * name of the item
   */
  name: string;
}

export type ${pascalCaseSlot} = SlotRegistry<${pascalCase}[]>;
`
  };
}
