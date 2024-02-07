import React from 'react';
import { UIRuntime } from '@teambit/ui';
import type { LinkProps } from '@teambit/base-react.navigation.link';
import { ComponentUI, ComponentAspect } from '@teambit/component';
import { TodosPage } from './ui/todos-page';
import { TodoAspect } from './todo.aspect';

/**
 * this is the aspect's 'UI' runtime. it runs in the broser, as part of Bit's UI.
 */
export class TodoUI {
  /**
   * list the aspects that are used by this aspect (in the UI runtime)
   * these aspects will be instantiated and inject to this aspect
   */
  static dependencies = [ComponentAspect];
  static runtime = UIRuntime;
  /**
   * the 'provider' method is responsible for receiving the instances
   * of other aspects (that are used by this aspect), and for returning an instance of this aspect
   * (in this case, the instance to run in the browser)
   */
  static async provider([component]: [ComponentUI]) {
    /* register a new path in the component UI */
    component.registerRoute({
      element: <TodosPage />,
      path: '~todos',
    });
    /* add a tab to the UI that points to the specified relative path */
    component.registerNavigation(
      {
        href: '~todos',
        children: 'To-Dos',
      } as LinkProps,
      60
    );

    return new TodoUI();
  }
}

TodoAspect.addRuntime(TodoUI);
