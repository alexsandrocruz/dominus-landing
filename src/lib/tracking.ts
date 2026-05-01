/**
 * Tracking helpers. The page-level pattern is `data-cta-*` attributes on
 * interactive elements, which a single delegated listener forwards to GTM
 * via `dataLayer`. Concrete listener wiring is out of scope for SAP-166 and
 * lands together with the GTM container ID (SAP-161).
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type CtaEventPayload = {
  event: "cta_click";
  cta_id: string;
  cta_label?: string;
  cta_location?: string;
  cta_destination?: string;
};

export function buildCtaDataAttributes(opts: {
  id: string;
  label?: string;
  location?: string;
  destination?: string;
}): Record<string, string> {
  const attrs: Record<string, string> = {
    "data-cta-id": opts.id,
  };
  if (opts.label) attrs["data-cta-label"] = opts.label;
  if (opts.location) attrs["data-cta-location"] = opts.location;
  if (opts.destination) attrs["data-cta-destination"] = opts.destination;
  return attrs;
}

export function pushEvent(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}

export function trackCtaClick(target: HTMLElement): void {
  const id = target.dataset.ctaId;
  if (!id) return;
  const payload: CtaEventPayload = {
    event: "cta_click",
    cta_id: id,
    cta_label: target.dataset.ctaLabel,
    cta_location: target.dataset.ctaLocation,
    cta_destination: target.dataset.ctaDestination,
  };
  pushEvent(payload);
}
