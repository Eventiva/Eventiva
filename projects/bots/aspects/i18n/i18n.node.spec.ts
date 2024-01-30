import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { I18NNode } from './i18n.node.runtime.js';
import { I18NAspect } from './i18n.aspect.js';

it('should retrieve the aspect', async () => {
  const i18N = await loadAspect<I18NNode>(I18NAspect, {
    runtime: 'node',
  });

  expect(i18N).toBeTruthy();
});    
