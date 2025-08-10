import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';

describe('labels.yml', () => {
  it('each label color is a 6-character hex string', () => {
    const file = readFileSync(resolve(__dirname, '..', 'labels.yml'), 'utf8');
    const doc = YAML.parseDocument(file);

    for (const item of doc.contents?.items ?? []) {
      const color = item.get('color', true);
      expect(color?.source).toMatch(/^[0-9a-fA-F]{6}$/);
    }
  });
});
