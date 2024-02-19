import { ComponentContext } from "@teambit/generator";

export function platformNodeFile(context: ComponentContext) {
  const configId = `${context.namePascalCase}Config`;
  const nodeId = `${context.namePascalCase}Node`;

  return {
    relativePath: `${context.name}.node.runtime.ts`,
    content: `import type { ApplicationInstance } from '@teambit/application';
import { Port } from '@teambit/toolbox.network.get-port';
import type { ${configId} } from './${context.name}-config.js';
import { BackendServer, BackendSlot } from './backend.js';
import { startGateway } from './${context.name}-gateway.js';

export class ${nodeId} {
  constructor(
    private backendSlot: BackendSlot,
    private config: ${configId}
  ) {}

  /**
   * run the app in the node runtime.
   */
  async run() {
    const [gatewayFrom, gatewayTo] = this.config.gatewayPort;
    const gatewayPort = await Port.getPort(gatewayFrom, gatewayTo);
    const platformPort = process.env.NODE_RUNTIME_PORT 
      ? parseInt(process.env.NODE_RUNTIME_PORT, 10) 
      : gatewayPort;
      
    const services = await this.runBackendServers();
    const gateway = await startGateway(services, {
      port: platformPort,
    });

    console.log(\`gateway server is listening on \${gateway.port}\`);
  }

  private runBackendServers(): Promise<ApplicationInstance[]> {
    const [fromPort, toPort] = this.config.servicePortRange;
    const backendServers = this.listBackendServers();

    return Promise.all(backendServers.map(async (backendServer) => {
      const servicePort = await Port.getPort(fromPort, toPort);
      const context = {
        port: servicePort
      };

      return backendServer.run(context);
    }));
  }

  /**
   * register a backend server.
   */
  registerBackendServer(backends: BackendServer[]) {
    this.backendSlot.register(backends);
    return this;
  }

  /**
   * list backends.
   */
  listBackendServers() {
    return this.backendSlot.flatValues();
  }

  static defaultConfig: ${configId} = {
    gatewayPort: [5000, 5010],
    servicePortRange: [5100, 5200],
  }

  static dependencies = [];

  static async provider(
    deps: [],
    config: ${configId},
    [backendSlot]: [BackendSlot]
  ) {
    const ${context.nameCamelCase} = new ${nodeId}(
      backendSlot,
      config
    );

    return ${context.nameCamelCase};
  }
}

export default ${nodeId};
`
  };
}
