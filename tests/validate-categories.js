import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const categoriesPath = join(root, 'categories.json');
const uiPath = join(root, 'ethyrea', 'index.html');

const categories = JSON.parse(readFileSync(categoriesPath, 'utf8'));
const uiContent = readFileSync(uiPath, 'utf8');

let hasError = false;

for (const [category, files] of Object.entries(categories)) {
  const dir = join(root, 'ethyrea', category);
  if (!existsSync(dir)) {
    console.error(`Missing directory for category: ${category}`);
    hasError = true;
    continue;
  }

  for (const file of files) {
    const filePath = join(dir, file);
    if (!existsSync(filePath)) {
      console.error(`Missing file for ${category}: ${file}`);
      hasError = true;
    }
  }

  const uiRegex = new RegExp(`data-category=["']${category}["']`);
  if (!uiRegex.test(uiContent)) {
    console.error(`Missing UI entry for category: ${category}`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('All categories validated successfully.');
}

