import type { I18NConfig } from './i18n-config.js';
import { Namespace, NamespaceSlot } from './namespace.js';
import { Resource, ResourceSlot } from './resource.js';

export class I18NNode {
  constructor(
    private config: I18NConfig,
    private namespaceSlot: NamespaceSlot,
    private resourceSlot: ResourceSlot,
  ) {}
  
  /**
   * register a list of namespace.
   */
  registerNamespace(namespaces: Namespace[]) {
    this.namespaceSlot.register(namespaces);
    return this;
  }

  /**
   * list all namespace.
   */
  listNamespaces() {
    return this.namespaceSlot.flatValues();
  }


  
  /**
   * register a list of resource.
   */
  registerResource(resources: Resource[]) {
    this.resourceSlot.register(resources);
    return this;
  }

  /**
   * list all resource.
   */
  listResources() {
    return this.resourceSlot.flatValues();
  }

  static dependencies = [];

  static defaultConfig: I18NConfig = {};

  static async provider(
    deps: [],
    config: I18NConfig,
    [namespaceSlot, resourceSlot]: [NamespaceSlot, ResourceSlot]
  ) {
    const i18N = new I18NNode(config, namespaceSlot, resourceSlot);
    

    return i18N;
  }
}

export default I18NNode;
