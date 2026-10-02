/**
 * One-time Open Graph image generator.
 *
 * Builds public/og-image.jpg at 1200x630 (the size WhatsApp, Facebook
 * and X expect) from the existing entrance photo, compressed well under
 * WhatsApp's ~300KB limit. The source photo is only read, never changed.
 *
 * Run once with: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const SOURCE = path.resolve(
  "public/Al_mustaqbal/al-mustaqbal-medical-fitness-entrance.jpg"
);
const OUTPUT = path.resolve("public/og-image.jpg");

async function run() {
  await sharp(SOURCE)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(OUTPUT);

  const kb = Math.round(fs.statSync(OUTPUT).size / 1024);
  console.log(`Created public/og-image.jpg (1200x630, ${kb} KB)`);
}

run().catch((err) => {
  console.error("OG image generation failed:", err);
  process.exit(1);
});