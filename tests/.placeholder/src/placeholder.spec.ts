import { describe, expect, it } from 'vitest';
import { isPlaceholderEnabled } from './placeholder';

describe('tests placeholder', () => {
    it('keeps Nx test target available', () => {
        expect(isPlaceholderEnabled()).toBe(true);
    });
});
