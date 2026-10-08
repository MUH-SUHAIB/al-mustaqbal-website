import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Type errors and lint errors now stop the build instead of being ignored.
  // This means a real mistake can no longer be deployed to the live site
  // without a warning. (Verified first: `tsc` reports no errors and
  // `next lint` reports only one harmless warning.)
};

export default withNextIntl(nextConfig);