import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { SegmentNode } from './segment.node.runtime.js';
import { SegmentAspect } from './segment.aspect.js';

it('should retrieve the aspect', async () => {
  const segment = await loadAspect<SegmentNode>(SegmentAspect, {
    runtime: 'node',
  });

  expect(segment).toBeTruthy();
});    
