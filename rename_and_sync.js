import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, 'public', 'images');
const htmlPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');
const files = fs.readdirSync(imgDir).filter(f => !f.startsWith('.'));

let counter = 1;
const renameMap = {};

for (const oldFile of files) {
  const ext = path.extname(oldFile);
  const newName = `av_media_${counter.toString().padStart(2, '0')}${ext}`;
  
  renameMap[oldFile] = newName;
  
  // Rename physically
  fs.renameSync(path.join(imgDir, oldFile), path.join(imgDir, newName));
  counter++;
}

// Update HTML references
for (const [oldFile, newFile] of Object.entries(renameMap)) {
  const regex = new RegExp(`/images/${oldFile}`, 'g');
  html = html.replace(regex, `/images/${newFile}`);
}

fs.writeFileSync(htmlPath, html);
console.log("Renamed " + Object.keys(renameMap).length + " files and synced HTML.");
