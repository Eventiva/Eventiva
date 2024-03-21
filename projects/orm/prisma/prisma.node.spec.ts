import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { PrismaNode } from './prisma.node.runtime.js';
import { PrismaAspect } from './prisma.aspect.js';

it('should retrieve the aspect', async () => {
  const prisma = await loadAspect<PrismaNode>(PrismaAspect, {
    runtime: 'node',
  });

  expect(prisma).toBeTruthy();
});    
