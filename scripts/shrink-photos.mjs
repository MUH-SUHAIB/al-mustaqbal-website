/**
 * One-time photo shrinker.
 *
 * Your clinic photos are straight from a phone/AI editor (2-6 MB each).
 * Next.js already serves small versions to visitors, but the originals
 * still weigh down your repo, deploys and the server. This script:
 *   - finds every .jpg/.jpeg inside public/Al_mustaqbal (including services/)
 *   - scales anything wider than 1920px down to 1920px
 *   - re-compresses at quality 80 (visually the same on screen)
 *   - replaces the file ONLY if the new version is smaller
 *
 * File names stay the same, so no code changes are needed.
 * To undo before committing:  git checkout -- public/Al_mustaqbal
 *
 * Run once with: node scripts/shrink-photos.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = path.resolve("public/Al_mustaqbal");
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Walk a folder and return every .jpg/.jpeg file inside it.
function findJpgs(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJpgs(fullPath));
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const kb = (bytes) => Math.round(bytes / 1024);

async function run() {
  const files = findJpgs(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const before = fs.statSync(file).size;

    // rotate() applies the phone's orientation info so photos never flip.
    const output = await sharp(file)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    const name = path.relative(ROOT, file);

    if (output.length < before) {
      fs.writeFileSync(file, output);
      totalBefore += before;
      totalAfter += output.length;
      console.log(`${name}: ${kb(before)} KB -> ${kb(output.length)} KB`);
    } else {
      totalBefore += before;
      totalAfter += before;
      console.log(`${name}: ${kb(before)} KB (already small, skipped)`);
    }
  }

  console.log("-----");
  console.log(
    `Total: ${kb(totalBefore)} KB -> ${kb(totalAfter)} KB ` +
      `(saved ${kb(totalBefore - totalAfter)} KB)`
  );
}

run().catch((err) => {
  console.error("Photo shrinking failed:", err);
  process.exit(1);
});