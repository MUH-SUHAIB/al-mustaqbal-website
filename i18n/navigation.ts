import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link, redirect, usePathname, useRouter — all derived
// from the shared `routing` config so they stay in sync with middleware.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
