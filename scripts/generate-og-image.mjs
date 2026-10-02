/**
 * One-time Open Graph image generator (v2).
 *
 * Builds public/og-image.jpg at 1200x630 from the entrance photo.
 * v1 used automatic cropping, which picked the floor instead of the
 * sign. This version crops from a fixed vertical position near the top
 * of the photo, where the center's sign is.
 *
 * If the sign is still cut off, change TOP_OFFSET_PERCENT:
 *   - lower number (e.g. 0)  = crop higher up the photo
 *   - higher number (e.g. 15) = crop lower down the photo
 *
 * Run with: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const SOURCE = path.resolve(
  "public/Al_mustaqbal/al-mustaqbal-medical-fitness-entrance.jpg"
);
const OUTPUT = path.resolve("public/og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;
const TOP_OFFSET_PERCENT = 8;

async function run() {
  // Step 1: scale the photo to 1200px wide, keeping its proportions.
  const scaled = await sharp(SOURCE)
    .resize({ width: WIDTH })
    .toBuffer({ resolveWithObject: true });

  const scaledHeight = scaled.info.height;
  const maxTop = Math.max(0, scaledHeight - HEIGHT);
  const top = Math.min(
    maxTop,
    Math.round((scaledHeight * TOP_OFFSET_PERCENT) / 100)
  );

  // Step 2: cut a 1200x630 window starting at that vertical position.
  await sharp(scaled.data)
    .extract({ left: 0, top, width: WIDTH, height: HEIGHT })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(OUTPUT);

  const kb = Math.round(fs.statSync(OUTPUT).size / 1024);
  console.log(`Created public/og-image.jpg (1200x630, ${kb} KB, top offset ${top}px)`);
}

run().catch((err) => {
  console.error("OG image generation failed:", err);
  process.exit(1);
});