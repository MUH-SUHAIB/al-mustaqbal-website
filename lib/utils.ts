// Shared utility functions used across the clinic website system.
// Keep this dependency-free where possible.

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
