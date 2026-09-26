// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude api, _next, static assets, sitemap.xml, and robots.txt
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|sitemap\\.xml|robots\\.txt).*)",
  ],
};