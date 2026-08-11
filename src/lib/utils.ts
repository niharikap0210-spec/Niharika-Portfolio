/* Minimal classnames helper (shadcn's `cn` without the clsx/tailwind-merge deps —
   this project keeps the bundle lean and has no conflicting utility classes to merge). */
export function cn(...classes: Array<string | number | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
