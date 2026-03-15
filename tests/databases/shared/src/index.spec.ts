import { describe, it } from 'vitest';
import { typeid } from '@eventiva/databases.shared';

describe('databases/shared/index', () => {
    it('exports typeid', () => {
        expect(typeid).toBeDefined();
    });
});
