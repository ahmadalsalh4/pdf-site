// Scans pdfs/<category>/*.pdf and writes manifest.json
// Usage: node build.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'pdfs');
const out = [];

function add(file, category, rel) {
  const st = fs.statSync(file);
  out.push({ category, name: path.basename(file), path: rel, date: st.mtimeMs, size: st.size });
}

if (fs.existsSync(root)) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, entry.name);
    if (entry.isDirectory()) {
      for (const f of fs.readdirSync(p)) {
        if (f.toLowerCase().endsWith('.pdf')) add(path.join(p, f), entry.name, `pdfs/${entry.name}/${f}`);
      }
    } else if (entry.name.toLowerCase().endsWith('.pdf')) {
      add(p, 'Uncategorized', `pdfs/${entry.name}`);
    }
  }
}
fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify(out, null, 2));
console.log(`manifest.json created with ${out.length} PDF(s)`);
