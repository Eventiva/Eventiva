/**
* @format
* -----
* Project: @eventiva/eventiva
* File: aspect-runtime.ts
* Path: \projects\workflows\discord\generator\module\files\aspect-runtime.ts
* Created Date: Sunday, February 4th 2024
* Author: Jonathan Stevens, jonathan@resnovas.com
* Github: https://github.com/TGTGamer
* -----
* Contributing: Please read through our contributing guidelines.
* Included are directions for opening issues, coding standards,
* and notes on development. These can be found at
* https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
* -----
* Code of Conduct: This project abides by the Contributor Covenant, v2.0
* Please interact in ways that contribute to an open, welcoming, diverse,
* inclusive, and healthy community. Our Code of Conduct can be found at
* https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
* -----
* Copyright (c) 2024 Resnovas - All Rights Reserved
* LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms
* of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License v2.0 or later for more details.
* You should have received a copy of the GNU General Public License v2.0 or later
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
* -----
* This project abides by the GPL Cooperation Commitment.
* Before filing or continuing to prosecute any legal proceeding or claim
* (other than a Defensive Action) arising from termination of a Covered
* License, we commit to extend to the person or entity ('you') accused
* of violating the Covered License the following provisions regarding
* cure and reinstatement, taken from GPL version 3.
* For further details on the GPL Cooperation Commitment please visit
* the official website: https://gplcc.github.io/gplcc/
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/

import { upperFirst, camelCase } from 'lodash';
import { ComponentID } from '@teambit/component-id';
import { ComponentContext } from '@teambit/generator';
import { generateName } from './slot-template.js';
import type { RuntimeOptions } from "@eventiva/workflows.bit.runtime-options";;

/**
 * Generates the JSDoc for the `generateSlot` function.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @param slots An array of slot strings.
 * @returns This function generates the JSDoc for a slot generator.
 */
function generateSlot(slots: string[]) {
  const methods = slots.map((slot) => {
    const { pascalCase, camelCaseSlot, camelCase, displayName } = generateName(slot);

    return `\n
  register${pascalCase}(${camelCase}s: ${pascalCase}[]) {
    this.${camelCaseSlot}.register(${camelCase}s);
    return this;
  }


  list${pascalCase}s() {
    return this.${camelCaseSlot}.flatValues();
  }
`;
  }).join('\n\n  ');

  const args = slots.map((slot) => {
    const { camelCaseSlot } = generateName(slot);
    return camelCaseSlot;
  }).join(', ');

  const decelerations = `[${slots.map(
    (slot) => generateName(slot).camelCaseSlot
  ).join(', ')}]: [${slots.map((slot) => generateName(slot).pascalCaseSlot).join(', ')}]`;

  const constructorProperties = slots.length ? slots
    .map((slot) => {
      const { camelCaseSlot, pascalCaseSlot } = generateName(slot);

      return `private ${camelCaseSlot}: ${pascalCaseSlot},`;
    })
    .join('\n    '): '';

  const imports = slots
    .map((slot) => {
      const { pascalCase, name, pascalCaseSlot } = generateName(slot);
      return `import { ${pascalCase}, ${pascalCaseSlot} } from './${name}.js';`;
    })
    .join('\n');

  return {
    decelerations,
    methods,
    imports,
    args,
    constructorProperties,
  };
}

/**
 * Generates an array type declaration for dependency types based on the given dependencies and runtime name.
 * @param deps An optional array of dependency names.
 * @param runtimeName The name of the runtime. Defaults to 'node'.
 * @return A string representing the array type declaration.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @param [deps]
 * @param [runtimeName='node']
 * @returns A function that generates dependency types based on the given dependencies and runtime name.
 */
function generateDependencyTypes(deps?: string[], runtimeName: string = 'node') {
  if (!deps) return `deps: []`;
  const typeDeps = deps?.map((dep) => {
    const capRuntime = upperFirst(runtimeName);
    const camelCaseDep = upperFirst(camelCase(dep));
    return `${camelCaseDep}${capRuntime}`;
  }).join(',');

  const varNames = deps?.map((dep) => {
    return camelCase(dep);
  }).join(', ');

  return `[${varNames}]: [${typeDeps}]`;
}

/**
 * Generates the static dependencies for the given dependencies array.
 * @param deps The array of dependencies
 * @return The static dependencies as an array
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @param [deps]
 * @returns Generates an array of static dependencies based on the provided input.
 */
function generateStaticDeps(deps?: string[]) {
  if (!deps?.length) return '[]';
  const typeDeps = deps?.map((dep) => {
    const camelCaseDep = upperFirst(camelCase(dep));
    return `${camelCaseDep}Aspect`;
  }).join(', ');

  return `[${typeDeps}]`;
}

/**
 * Generates import statements for the given dependencies and runtime.
 * If the dependencies array is empty or null, an empty string is returned.
 * For each dependency, the function generates an import statement with the following template:
 * import { {dependencyName}Aspect, type {dependencyName}{runtime} } from '@{owner}/{scope}.{dependencyFullName}';
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @param deps An array of ComponentIDs representing the dependencies.
 * @param runtime A string representing the runtime environment.
 * @returns Generates the import statements for the given dependencies and runtime.
 */
function generateDepImports(deps: ComponentID[], runtime: string) {
  if (!deps?.length) return '';
  return deps?.map((depId) => {
    const camelCaseDep = upperFirst(camelCase(depId.name));
    const capRuntime = upperFirst(runtime);
    const [owner, scopeName] = depId.scope.split('.');
    return `import { ${camelCaseDep}Aspect, type ${camelCaseDep}${capRuntime} } from '@${owner}/${scopeName}.${depId.fullName.replace(new RegExp('/', 'g'), '.')}';\n`;
  }).join('\n');
}

/**
 * This function generates the content of a runtime file for a component.
 * - `context`: The component context.
 * - `runtime`: The runtime options.
 * - `slots`: An array of slot names.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param context The component context
 * @param runtime The runtime options
 * @param slots An array of slot names
 * @returns This function generates the JSDoc for the runtimeFile function. It takes a ComponentContext, RuntimeOptions, and an array of strings as parameters and returns an object with a relativePath and content property.
 */
export function runtimeFile(
  context: ComponentContext,
  runtime: RuntimeOptions,
  slots: string[],
) {
  const runtimeSuffix = upperFirst(runtime.name);
  const deps = runtime.dependencies?.map((dep) => ComponentID.fromString(dep)) || [];
  const depNames = deps?.map((dep) => dep.name);
  const depImports = generateDepImports(deps, runtime.name);
  const userImports = runtime.imports ? runtime.imports(context).join('\n'): '';
  const runtimeIdentifier = `${context.namePascalCase}${runtimeSuffix}`;
  const configIdentifier = `${context.namePascalCase}Config`;
  const { decelerations, imports, args, methods, constructorProperties } = generateSlot(slots || []);
  const userMethods = runtime.methods ? runtime.methods(context) : '';
  const aspectArgs = args?.length
    ? `(config, ${args})`
    : '(config)'
  const constructorProps = constructorProperties ? `\n    ${constructorProperties}`: '';

  return {
    relativePath: `${context.name}.${runtime.name}.runtime.${runtime?.extension || 'ts'}`,
    content: `${depImports}import type { ${configIdentifier} } from './${context.name}-config.js';
${imports}${userImports}

import { DiscordJsModule } from '@eventiva/bots.aspects.discordjs';
import type { Event, Command, Resources } from '@eventiva/bots.aspects.discordjs';
import { DiscordJsModule } from '@eventiva/bots.aspects.discordjs';
import type { Event, Command, Resources } from '@eventiva/bots.aspects.discordjs';


export class ${runtimeIdentifier} extends DiscordJsModule<${configIdentifier}>  {
  constructor(
    public discord: DiscordjsNode,
    private config: ${configIdentifier},${constructorProps}
  ) {super(discord, config)}
  ${slots.length ? methods : ''}${userMethods}
  static dependencies = ${generateStaticDeps(depNames)};
  public resources: Resources = {}

  public registerEvents(reload?: true) {
    this.discord.registerEvent(this, [
    // add any events here
    ] as Event<any>[])
    return this
  }

  public registerCommands(reload?: true) {
    this.discord.registerCommand(this, [
    // add any commands here
    ] as Command[])
    return this;
  }

  static defaultConfig: ${configIdentifier} = {
    name: "${context.name}",
    logger: {
      level: "info",
    }
  };

  static async provider(
    ${generateDependencyTypes(depNames, runtime.name)},
    config: ${configIdentifier},${slots.length ? `\n    ${decelerations}` : ''}
  ) {
    const ${context.nameCamelCase} = new ${runtimeIdentifier}${aspectArgs};
    ${runtime?.provider ? runtime.provider(context) : '\n' }
    return ${context.nameCamelCase};
  }
}

export default ${runtimeIdentifier};
`,
  };
}
