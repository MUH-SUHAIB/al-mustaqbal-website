import type { ReactNode } from "react";

// Minimal pass-through required by Next.js App Router
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}