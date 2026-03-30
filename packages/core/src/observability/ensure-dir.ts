import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/** Ensure `filePath`'s parent directory exists before writing. */
export function ensureDirForFile(filePath: string): void {
    mkdirSync(dirname(filePath), { recursive: true });
}
