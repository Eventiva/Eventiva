import { Command, CommandOptions } from '@teambit/cli';
import { Workspace } from '@teambit/workspace';
import { TodoAspect } from './todo.aspect';
import { report } from 'leasot';

/**
 * create a Bit command that retrieves the component's todos
 * this is done using the CLI aspect
 *  */
export class ToDosCmd implements Command {
  name = 'todos <component-name>';
  description = "Retrieves the component's todos from its metadata";
  options = [] as CommandOptions;

  /**
   * the workspace aspect is being used here to retrieve information regarding component's in this workspace
   * (the scope aspect could have been used here as well, to retrieve information regarding snapped components in the scope)
   */
  constructor(private workspace: Workspace) {}

  async report([id]: [string]) {
    /* get the component ID object by its (string) component ID or component name in the workspace */
    const componentId = await this.workspace.resolveComponentId(id);
    /* get the component model (the in-memory representation of its source-file, metadata, config, etc.) */
    const component = await this.workspace.get(componentId);
    /* retrieve the custom metadata provided by this aspect */
    const todo = component.state.aspects.get(
      TodoAspect.id
    )?.data;

    if (typeof todo === 'undefined')
      return `\x1B[32m✔\x1B[39m No todos or fixmes found in '${id}'`;

    const outputs = todo!.todos.map((fileTodos) => {
      if (fileTodos.length === 0) return null;
      return report(fileTodos, 'table', {});
    });

    const output = outputs
      .filter((fileOutput) => fileOutput !== null)
      .join('\n')
      .replace(',,', '');

    /* the returned value is printed out to the terminal */
    return output;
  }
}
