import ptBR, { type LandingCopy } from "@/content/pt-BR/copy";
import {
  isSupportedLocale,
  type SupportedLocale,
} from "@/lib/locales";

export type { LandingCopy };

export class UnsupportedLocaleError extends Error {
  readonly locale: string;

  constructor(locale: string) {
    super(`Locale "${locale}" is not supported.`);
    this.name = "UnsupportedLocaleError";
    this.locale = locale;
  }
}

const COPY: Record<SupportedLocale, LandingCopy> = {
  "pt-BR": ptBR,
};

export function getCopy(locale: SupportedLocale | string): LandingCopy {
  if (!isSupportedLocale(locale)) {
    throw new UnsupportedLocaleError(locale);
  }
  return COPY[locale];
}
