import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { AtlassianCustomerSupportNode } from './atlassian-customer-support.node.runtime.js';
import { AtlassianCustomerSupportAspect } from './atlassian-customer-support.aspect.js';

it('should retrieve the aspect', async () => {
  const atlassianCustomerSupport = await loadAspect<AtlassianCustomerSupportNode>(AtlassianCustomerSupportAspect, {
    runtime: 'node',
  });

  expect(atlassianCustomerSupport).toBeTruthy();
});    
