/**
 * Tracking helpers. The page-level pattern is `data-cta-*` attributes on
 * interactive elements, which a single delegated listener forwards to GTM
 * via `dataLayer`. Concrete listener wiring is out of scope for SAP-167 and
 * lands together with the GTM container ID (SAP-161).
 *
 * SAP-167 contract with GrowthMarketer:
 *   data-cta-label    — slug curto (ex: agendar-demo-hero)
 *   data-cta-position — header | hero | problema | modulos | fluxos
 *                       | integracoes | prova-social | pricing | faq
 *                       | cta-final | footer | floating
 *   data-cta-variant  — primary | secondary | tertiary
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type CtaPosition =
  | "header"
  | "hero"
  | "problema"
  | "modulos"
  | "fluxos"
  | "integracoes"
  | "prova-social"
  | "pricing"
  | "faq"
  | "cta-final"
  | "footer"
  | "floating";

export type CtaVariant = "primary" | "secondary" | "tertiary";

export type CtaEventPayload = {
  event: "cta_click";
  cta_label: string;
  cta_position?: CtaPosition;
  cta_variant?: CtaVariant;
  cta_destination?: string;
};

export type CtaDataAttributes = {
  "data-cta-label": string;
  "data-cta-position"?: CtaPosition;
  "data-cta-variant"?: CtaVariant;
  "data-cta-destination"?: string;
};

export function buildCtaDataAttributes(opts: {
  label: string;
  position?: CtaPosition;
  variant?: CtaVariant;
  destination?: string;
}): CtaDataAttributes {
  const attrs: CtaDataAttributes = {
    "data-cta-label": opts.label,
  };
  if (opts.position) attrs["data-cta-position"] = opts.position;
  if (opts.variant) attrs["data-cta-variant"] = opts.variant;
  if (opts.destination) attrs["data-cta-destination"] = opts.destination;
  return attrs;
}

export function pushEvent(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}

export function trackCtaClick(target: HTMLElement): void {
  const label = target.dataset.ctaLabel;
  if (!label) return;
  const position = target.dataset.ctaPosition as CtaPosition | undefined;
  const variant = target.dataset.ctaVariant as CtaVariant | undefined;
  const payload: CtaEventPayload = {
    event: "cta_click",
    cta_label: label,
    cta_position: position,
    cta_variant: variant,
    cta_destination: target.dataset.ctaDestination,
  };
  pushEvent(payload);
}
