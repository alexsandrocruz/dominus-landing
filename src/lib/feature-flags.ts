/**
 * Build-time feature flags. Toggled via `NEXT_PUBLIC_FF_*` env vars on the
 * SWA workflow. Defaults are conservative (off) so accidental builds don't
 * surface unprovisioned integrations.
 */

function readBoolFlag(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

export const featureFlags = {
  /**
   * WhatsApp CTAs (microcopy + wa.me links). Stays off until SAP-157 (or equiv)
   * provisions the official number.
   */
  whatsapp: readBoolFlag(process.env.NEXT_PUBLIC_FF_WHATSAPP),
  /**
   * Hero A/B variant override. `a` (default) ships the headline-first variant;
   * `b` ships the value-prop-first variant. See SAP-159 for copy decisions.
   */
  heroVariant: (process.env.NEXT_PUBLIC_FF_HERO_VARIANT === "b" ? "b" : "a") as
    | "a"
    | "b",
} as const;

export type FeatureFlags = typeof featureFlags;
