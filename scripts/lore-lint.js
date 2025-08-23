#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import YAML from 'yaml';

const file = resolve(process.cwd(), 'canon', 'sst.yaml');

let data;
try {
  const content = readFileSync(file, 'utf8');
  data = YAML.parse(content);
} catch (err) {
  console.error(`Failed to read or parse ${file}: ${err.message}`);
  process.exit(1);
}

const assertions = data?.assertions;
if (!Array.isArray(assertions) || assertions.length === 0) {
  console.error('No assertions found in canon/sst.yaml');
  process.exit(1);
}

let hasError = false;
for (const assertion of assertions) {
  const { id } = assertion;
  if (assertion.assert !== true) {
    console.error(`Assertion ${id ?? '(unknown)'} failed or missing`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('All assertions passed.');
}
