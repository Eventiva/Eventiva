import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { PingDiscord } from './ping.discord.runtime.js';
import { PingAspect } from './ping.aspect.js';

it('should retrieve the aspect', async () => {
  const ping = await loadAspect<PingDiscord>(PingAspect, {
    runtime: 'discord',
  });

  expect(ping).toBeTruthy();
});    
