import { camelCase, startCase, kebabCase } from "lodash";

/**
 * Generates name variations based on the slot name provided. Converts the slot name to kebab case, camel case, and pascal case. Returns an object containing the following properties: camelCaseSlot, pascalCaseSlot, pascalCase, displayName, name, camelCase.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {string} slot A string value representing a slot
 * @returns {{ camelCaseSlot: string; pascalCaseSlot: string; pascalCase: any; displayName: any; name: any; camelCase: any; }} Generates various case variations of the given slot string and returns an object containing the camel case, pascal case, display name, and original kebab case names.
 */
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

/**
 * A function that takes a slot name as parameter and generates a pascal case slot name and pascal case name based on the input slot name. It then returns an object with relativePath and content properties. The content is a string that includes an interface definition with a name property and a type definition using the generated pascal case names for SlotRegistry.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {string} slot A function that generates JSDoc for a given slot
 * @returns {{ relativePath: string; content: string; }} A function that generates a TypeScript file for a given slot name and returns an object with a relative path and content
 */
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
