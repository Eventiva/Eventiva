import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { LoggingNode } from './logging.node.runtime.js';
import { LoggingAspect } from './logging.aspect.js';

it('should retrieve the aspect', async () => {
  const logging = await loadAspect<LoggingNode>(LoggingAspect, {
    runtime: 'node',
  });

  expect(logging).toBeTruthy();
});    
