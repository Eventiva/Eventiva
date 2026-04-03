/**
 * SQLite demo platform entry: imports `./platform.js` and calls `runPlatform`.
 * @see docs/learnings/architecture.md
 */
import { runPlatform } from '@eventiva/core';
import { platform } from './platform.js';

runPlatform(platform);
