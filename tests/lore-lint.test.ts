import { describe, it } from 'vitest';
import { execSync } from 'node:child_process';

describe('lore-lint', () => {
  it('passes all assertions in canon/sst.yaml', () => {
    execSync('node scripts/lore-lint.js', { stdio: 'pipe' });
  });
});
