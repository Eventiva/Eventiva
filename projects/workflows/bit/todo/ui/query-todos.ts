import { gql, QueryResult, OperationVariables } from '@apollo/client';
/* use Bit's apollo client to match Bit's apollo provider (which is available in every component UI page) */
import { useDataQuery } from '@teambit/ui';
import { ComponentID } from '@teambit/component';
/* this component handles the types used by providers and consumers of component todos */
import type { WorkspaceQueryData } from '@learnbit/extending-bit.metadata.component-todos.entities.todos';
import { TodoAspect } from '../todo.aspect';

/**
 * query the workspace graphql for metadata that was added by this aspect
 * (the metadata for a specific component)
 * explore the available graphql schema using GraphiQL in http://localhost:3000/graphql (replace the port number if needed)
 */
const getTodos = gql`
  query getTodos($id: String!, $include: [String!]) {
    workspace {
      getComponent(id: $id) {
        aspects(include: $include) {
          data
        }
      }
    }
  }
`;

export function useTodos(
  componentId: ComponentID
): QueryResult<WorkspaceQueryData, OperationVariables> {
  const id = componentId.toString();
  const aspectId = TodoAspect.id.split('@');
  /* use the aspect id without its version to query for the aspect's metadata */
  const include = [aspectId[0]];
  const response = useDataQuery<WorkspaceQueryData>(getTodos, {
    variables: { id, include },
  });
  // @ts-ignore
  return response;
}
