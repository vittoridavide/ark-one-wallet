/**
 * Color helpers for the Ark One kit.
 *
 * The design system layers a single accent over neutral surfaces using low-alpha
 * tints (glow 0.20, tint-bg 0.08, badge border 0.30). `withAlpha` lets a
 * component derive those tints from any base hex at the call site.
 */

/** Returns an `rgba()` string for a `#RGB` / `#RRGGBB` hex at the given alpha (0–1). */
export function withAlpha(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
