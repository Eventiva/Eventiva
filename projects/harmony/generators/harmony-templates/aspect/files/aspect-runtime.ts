import { upperFirst, camelCase as camelCaseFn } from 'lodash';
import { ComponentID } from '@teambit/component-id';
import { ComponentContext } from '@teambit/generator';
import { generateName } from './slot-template.js';
import { RuntimeOptions } from '../../harmony-templates-options.js';

type Dependencies = {
  component:  ComponentID,
  imports: string[]
}

function generateSlot(slots: string[]) {
  const methods = slots.map((slot) => {
    const { pascalCase, camelCaseSlot, camelCase, displayName } = generateName(slot);

    return `\n  /**
   * register a list of ${displayName}.
   */
  register${pascalCase}(${camelCase}s: ${pascalCase}[]) {
    this.${camelCaseSlot}.register(${camelCase}s);
    return this;
  }

  /**
   * list all ${displayName}.
   */
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

function generateDependencyTypes(deps?: string[], runtimeName: string = 'node') {
  if (!deps) return `deps: []`;
  const typeDeps = deps?.map((dep) => {
    const capRuntime = upperFirst(runtimeName);
    const camelCaseDep = upperFirst(camelCaseFn(dep));
    return `${camelCaseDep}${capRuntime}`;
  }).join(',');

  const varNames = deps?.map((dep) => {
    return camelCaseFn(dep);
  }).join(', ');

  return `[${varNames}]: [${typeDeps}]`;
}

function generateStaticDeps(deps?: string[]) {
  if (!deps?.length) return '[]';
  const typeDeps = deps?.map((dep) => {
    const camelCaseDep = upperFirst(camelCaseFn(dep));
    return `${camelCaseDep}Aspect`;
  }).join(', ');

  return `[${typeDeps}]`;
}

function generateDepImports(deps: Dependencies[], runtime: string) {
  if (!deps?.length) return '';
  return deps?.map((depId) => {
    const imports = depId.imports?.join(', ') || undefined;
    const camelCaseDep = upperFirst(camelCaseFn(depId.component.name));
    const capRuntime = upperFirst(runtime);
    const [owner, scopeName] = depId.component.scope.split('.');
    return `import { ${camelCaseDep}Aspect, type ${camelCaseDep}${capRuntime} ${imports ? `, ${imports}` : "" }} from '@${owner}/${scopeName}.${depId.component.fullName.replace(new RegExp('/', 'g'), '.')}';\n`;
  }).join('\n');
}

function generateUserImports(
  context: ComponentContext,
  runtime: RuntimeOptions
): string {
  if (!runtime.imports) return '';
  return runtime.imports(context).map((imp) => {
    // if the import is a string, import it as is
    if (typeof imp === 'string') return imp;
    // otherwise check if the user has turned of aspect imports
    if (!imp[1].runtime) return undefined;
    return imp[0];
  }).join('\n')
}

export function runtimeFile(
  context: ComponentContext,
  runtime: RuntimeOptions,
  slots: string[],
) {
  const runtimeSuffix = upperFirst(runtime.name);
  const deps = runtime.dependencies?.map((dep) => ({
    component: typeof dep === 'object' ? ComponentID.fromString(dep[0]) : ComponentID.fromString(dep),
    imports: typeof dep === 'object' ? dep[1].extraImports : undefined
  })) || [];
  const depNames = deps?.map((dep) => dep.component.name) || [];
  const depImports = generateDepImports(deps, runtime.name);
  const userImports = generateUserImports(context, runtime);
  const classExtends = runtime.classExtends ? runtime.classExtends(context) : undefined;
  const configExtends = runtime.configExtends(context);
  const runtimeConfig = typeof configExtends === 'object' ? configExtends[1].config : undefined
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

export class ${runtimeIdentifier} ${classExtends && (`extends ${typeof classExtends === 'object' ? classExtends[0] : classExtends} `)}{
  constructor(
    private config: ${configIdentifier},${constructorProps}
  ) {${classExtends && (typeof classExtends === 'object' ? classExtends[1] : "super()")}
  ${slots.length ? methods : ''}${userMethods}
  static dependencies = ${generateStaticDeps(depNames)};

  static defaultConfig: ${configIdentifier} = ${runtimeConfig ? runtimeConfig : '{}'};

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
