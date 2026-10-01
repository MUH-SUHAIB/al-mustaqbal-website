/**
 * One-time logo optimization script.
 *
 * The current logo.png is 1314x1303px and 2.3MB — full photo resolution,
 * but it's only ever displayed at 42x42px in the header. This script
 * creates a properly-sized, compressed version so the browser isn't
 * downloading 2.3MB to show a tiny icon.
 */
import sharp from "sharp";
import path from "path";

const INPUT = path.resolve("public/Al_mustaqbal/logo.png");
const OUTPUT = path.resolve("public/Al_mustaqbal/logo-optimized.png");

async function run() {
  await sharp(INPUT)
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log("Done. New file created at:", OUTPUT);
}

run().catch((err) => {
  console.error("Logo optimization failed:", err);
  process.exit(1);
});