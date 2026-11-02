HOW TO USE
1. Put PDFs like this:   pdfs/Math/book1.pdf   pdfs/Science/notes.pdf
2. Run:                  node build.js        (creates manifest.json)
3. Upload everything to GitHub, then connect the repo to Netlify
   (no build command, publish directory = /)  -- or drag the folder to Netlify Drop.
Every time you add PDFs: run node build.js again, then push/upload.
Sorting uses each file's "date modified" on your computer.
