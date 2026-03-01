/**
 * Usage: node scripts/import-cohort.mjs [path/to/cohort-export.json]
 *
 * Updates src/data/cohort.ts COHORT_DATA with data from a cohort-export.json
 * produced by the app's "Export All" button.
 *
 * Before running:
 *   1. Move any downloaded image files (001.jpg, 002.jpg, etc.) into public/images/
 *   2. Run this script to bake the member data into cohort.ts
 *   3. git add . && git commit -m "update cohort data" && git push
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const COHORT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'cohort.ts');

const exportFile = process.argv[2] || path.join(PROJECT_ROOT, 'cohort-export.json');

if (!fs.existsSync(exportFile)) {
  console.error(`Export file not found: ${exportFile}`);
  console.error('Run the app, enter edit mode, and click "Export All" first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(exportFile, 'utf8'));

// Read existing cohort.ts and preserve everything before COHORT_DATA
const existing = fs.readFileSync(COHORT_FILE, 'utf8');
const dataStart = existing.indexOf('export const COHORT_DATA');

if (dataStart === -1) {
  console.error('Could not find COHORT_DATA export in cohort.ts');
  process.exit(1);
}

const header = existing.substring(0, dataStart);
const dataStr = `export const COHORT_DATA: CohortMember[] = ${JSON.stringify(data, null, 2)};\n`;

fs.writeFileSync(COHORT_FILE, header + dataStr);
console.log(`✅ cohort.ts updated with ${data.length} members from ${path.basename(exportFile)}`);

// Remind about images
const imageRefs = data.flatMap(m => [
  m.imageUrl,
  ...(m.galleryImages || [])
]).filter(url => url?.startsWith('/images/'));

if (imageRefs.length > 0) {
  const destDir = path.join(PROJECT_ROOT, 'public', 'images');
  const existing = fs.existsSync(destDir) ? fs.readdirSync(destDir) : [];
  const missing = imageRefs
    .map(u => path.basename(u))
    .filter(f => !existing.includes(f));

  if (missing.length > 0) {
    console.log(`\n⚠️  These images are referenced but not in public/images/ yet:`);
    missing.forEach(f => console.log(`   ${f}`));
    console.log(`\n   Move the downloaded image files there before pushing.`);
  } else {
    console.log(`✅ All ${imageRefs.length} referenced image(s) found in public/images/`);
  }
}
