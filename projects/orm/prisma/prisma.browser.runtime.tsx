import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import type { PrismaConfig } from './prisma-config.js';
import { Em, EmSlot } from './em.js';

export class PrismaBrowser {
  constructor(
    private config: PrismaConfig,
    private emSlot: EmSlot,
  ) {}
  
  /**
   * register a list of em.
   */
  registerEm(ems: Em[]) {
    this.emSlot.register(ems);
    return this;
  }

  /**
   * list all em.
   */
  listEms() {
    return this.emSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: PrismaConfig = {};

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformBrowser],
    config: PrismaConfig,
    [emSlot]: [EmSlot]
  ) {
    const prisma = new PrismaBrowser(config, emSlot);
    
    symphonyPlatform.registerRoute([
      {
        path: '/prisma',
        component: () => {
          return <>render your route here</>;
        }
      }
    ])

    return prisma;
  }
}

export default PrismaBrowser;
