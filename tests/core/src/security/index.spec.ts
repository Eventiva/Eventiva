import { describe, it } from 'vitest';
import { runIntegrityChecks, PiiEncryption, PiiEncryptionLive, EncryptionError } from '@eventiva/core';
import type { PiiEncryptionService } from '@eventiva/core';

describe('security/index', () => {
    it('exports runIntegrityChecks', () => {
        expect(runIntegrityChecks).toBeDefined();
    });

    it('exports PiiEncryption tag', () => {
        expect(PiiEncryption).toBeDefined();
    });

    it('exports PiiEncryptionLive layer', () => {
        expect(PiiEncryptionLive).toBeDefined();
    });

    it('exports EncryptionError class', () => {
        expect(EncryptionError).toBeDefined();
        expect(EncryptionError.prototype).toBeInstanceOf(Error);
    });

    it('exports PiiEncryptionService type', () => {
        // Type-only export, just verify it's importable
        type _Test = PiiEncryptionService;
        expect(true).toBe(true);
    });
});
