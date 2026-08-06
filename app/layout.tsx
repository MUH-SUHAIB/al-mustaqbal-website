import type { ReactNode } from "react";

// Next.js REQUIRES a root layout at app/layout.tsx.
// This must stay minimal: no fonts, no providers, no metadata logic.
// Locale is unknown at this level, so <html lang>/<dir> can't be set
// correctly here — that happens in app/[locale]/layout.tsx instead.
// This file only exists to satisfy the App Router requirement.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
