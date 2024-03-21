import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { PrismaBrowser } from './prisma.browser.runtime.js';
import { PrismaAspect } from './prisma.aspect.js';

it('should retrieve the aspect', async () => {
  const prisma = await loadAspect<PrismaBrowser>(PrismaAspect, {
    runtime: 'browser',
  });

  expect(prisma).toBeTruthy();
});    
