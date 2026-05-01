import ptBR from "./pt-BR/landing.json";
import type { SupportedLocale } from "@/lib/locales";

export type LandingMessages = typeof ptBR;

const MESSAGES: Record<SupportedLocale, LandingMessages> = {
  "pt-BR": ptBR,
};

export function getLandingMessages(locale: SupportedLocale): LandingMessages {
  return MESSAGES[locale];
}
