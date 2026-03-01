/**
 * Usage: node scripts/copy-images.mjs /path/to/your/photos
 *
 * Copies images from a source folder into public/images/, renaming them
 * to match member IDs (001.jpg, 002.jpg, ...) based on alphabetical order.
 *
 * If your photo filenames contain member names (e.g. "alex.jpg", "jordan.png"),
 * the script will try to match them to members automatically.
 * Otherwise, images are assigned in alphabetical filename order.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEST_DIR = path.join(PROJECT_ROOT, 'public', 'images');
const COHORT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'cohort.ts');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.JPG', '.JPEG', '.PNG', '.WEBP'];

// Member names from cohort.ts for fuzzy matching
const MEMBERS = [
  { id: '001', name: 'Alex Rivera' },
  { id: '002', name: 'Jordan Smith' },
  { id: '003', name: 'Casey Chen' },
  { id: '004', name: 'Taylor Vance' },
  { id: '005', name: 'Morgan Lee' },
  { id: '006', name: 'Riley Quinn' },
  { id: '007', name: 'Sam Rivera' },
  { id: '008', name: 'Jamie Chen' },
  { id: '009', name: 'Peyton Blair' },
  { id: '010', name: 'Dakota Sky' },
  { id: '011', name: 'Skyler Reed' },
  { id: '012', name: 'Charlie Zhang' },
];

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Usage: node scripts/copy-images.mjs /path/to/your/photos');
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source folder not found: ${sourceDir}`);
  process.exit(1);
}

fs.mkdirSync(DEST_DIR, { recursive: true });

// Get all image files from source dir
const files = fs.readdirSync(sourceDir)
  .filter(f => IMAGE_EXTS.includes(path.extname(f)))
  .sort();

if (files.length === 0) {
  console.error('No image files found in that folder.');
  process.exit(1);
}

console.log(`Found ${files.length} image(s) in ${sourceDir}\n`);

// Try to match filenames to member names
const used = new Set();
const assignments = {};

// Pass 1: fuzzy name match
for (const member of MEMBERS) {
  const firstName = member.name.split(' ')[0].toLowerCase();
  const lastName = member.name.split(' ')[1].toLowerCase();
  const match = files.find(f => {
    const base = path.basename(f, path.extname(f)).toLowerCase();
    return (base.includes(firstName) || base.includes(lastName)) && !used.has(f);
  });
  if (match) {
    assignments[member.id] = match;
    used.add(match);
  }
}

// Pass 2: assign remaining files in order to unmatched members
const remaining = files.filter(f => !used.has(f));
let ri = 0;
for (const member of MEMBERS) {
  if (!assignments[member.id] && ri < remaining.length) {
    assignments[member.id] = remaining[ri++];
  }
}

// Copy files
let cohortSource = fs.readFileSync(COHORT_FILE, 'utf8');
const updatedIds = [];

for (const [id, filename] of Object.entries(assignments)) {
  const ext = path.extname(filename).toLowerCase().replace('.jpeg', '.jpg');
  const destName = `${id}${ext}`;
  const src = path.join(sourceDir, filename);
  const dest = path.join(DEST_DIR, destName);

  fs.copyFileSync(src, dest);
  console.log(`✓ Copied  ${filename}  →  public/images/${destName}`);

  // Update cohort.ts imageUrl if extension differs from .jpg
  if (ext !== '.jpg') {
    cohortSource = cohortSource.replace(`"/images/${id}.jpg"`, `"/images/${destName}"`);
  }

  updatedIds.push(id);
}

fs.writeFileSync(COHORT_FILE, cohortSource);

console.log(`\n✅ Done! ${updatedIds.length} image(s) copied to public/images/`);
if (updatedIds.length < MEMBERS.length) {
  const missing = MEMBERS.filter(m => !assignments[m.id]).map(m => `${m.id} (${m.name})`);
  console.log(`\n⚠️  No image found for: ${missing.join(', ')}`);
}
