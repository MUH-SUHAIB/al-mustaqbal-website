/**
 * One-time icon generator.
 *
 * The existing android-chrome and apple-touch icons were an older logo
 * version on an opaque square background. This script rebuilds every
 * icon size from the current logo (public/Al_mustaqbal/logo.png), which
 * has a transparent background. The source logo is only read, never changed.
 *
 * Run once with: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import path from "path";

const SOURCE = path.resolve("public/Al_mustaqbal/logo.png");
const PUBLIC_DIR = path.resolve("public");

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
// Brand cream. Apple touch icons cannot be transparent (iOS fills
// transparency with black), so that one icon gets a cream background.
const CREAM = { r: 246, g: 243, b: 234, alpha: 1 };

const TARGETS = [
  { file: "favicon-16x16.png", size: 16, background: TRANSPARENT },
  { file: "favicon-32x32.png", size: 32, background: TRANSPARENT },
  { file: "android-chrome-192x192.png", size: 192, background: TRANSPARENT },
  { file: "android-chrome-512x512.png", size: 512, background: TRANSPARENT },
  { file: "apple-touch-icon.png", size: 180, background: CREAM },
];

async function run() {
  for (const { file, size, background } of TARGETS) {
    const output = path.join(PUBLIC_DIR, file);

    let image = sharp(SOURCE).resize(size, size, {
      fit: "contain",
      background,
    });

    // Apple icon: remove transparency by flattening onto cream.
    if (background.alpha === 1) {
      image = image.flatten({ background });
    }

    await image.png({ compressionLevel: 9 }).toFile(output);
    console.log("Created:", file, `(${size}x${size})`);
  }
  console.log("Done. All icons regenerated.");
}

run().catch((err) => {
  console.error("Icon generation failed:", err);
  process.exit(1);
});