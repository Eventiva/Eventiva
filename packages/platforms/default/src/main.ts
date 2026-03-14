/**
 * Default platform run entry: starts the two-phase runtime using defaultPlatformTemplateTwoPhase.
 * @see packages/platforms/default/src/index.ts
 */
import { runMainTwoPhase } from '@eventiva/core';
import { defaultPlatformTemplateTwoPhase } from './index.js';

runMainTwoPhase(defaultPlatformTemplateTwoPhase);
