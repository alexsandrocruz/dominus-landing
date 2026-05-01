/**
 * Consent state for the cookie banner. Real UI lands in a follow-up ticket;
 * this module keeps the contract stable so tracking code can be wired against
 * it from day one.
 *
 * Buckets follow GTM consent-update semantics:
 *   essential — always granted, not user-toggleable
 *   analytics — user toggle (default: denied)
 *   marketing — user toggle (default: denied)
 */
export const CONSENT_STORAGE_KEY = "dominus.consent.v1";

export type ConsentCategory = "essential" | "analytics" | "marketing";

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string | null;
};

export const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  decidedAt: null,
};

export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function readConsent(): ConsentState {
  if (!isClient()) return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      essential: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : null,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function writeConsent(
  next: Pick<ConsentState, "analytics" | "marketing">,
): ConsentState {
  const value: ConsentState = {
    essential: true,
    analytics: next.analytics,
    marketing: next.marketing,
    decidedAt: new Date().toISOString(),
  };
  if (isClient()) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  }
  return value;
}

export function hasDecided(state: ConsentState): boolean {
  return state.decidedAt !== null;
}
