import { describe, it } from 'vitest';
import { defaultPlatformTemplate, defaultPlatformTemplateTwoPhase, type PlatformTemplate, type DefaultRunnerProfile } from '@eventiva/platforms.default';

describe('platforms/default/index', () => {
    it('exports defaultPlatformTemplate', () => {
        expect(defaultPlatformTemplate).toBeDefined();
    });

    it('exports defaultPlatformTemplateTwoPhase', () => {
        expect(defaultPlatformTemplateTwoPhase).toBeDefined();
    });

    it('exports PlatformTemplate type', () => {
        // Type-only export
        type _Test = PlatformTemplate;
        expect(true).toBe(true);
    });

    it('exports DefaultRunnerProfile type', () => {
        // Type-only export
        type _Test = DefaultRunnerProfile;
        expect(true).toBe(true);
    });
});
