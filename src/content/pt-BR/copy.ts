/**
 * Landing copy for `pt-BR`. Real content lands via SAP-167 (and successors).
 * Until then we ship a minimal shape so the typed `getCopy(locale)` contract
 * already compiles and the locale segment can render.
 */
export const copy = {
  skipLink: "Pular para o conteúdo principal",
} as const;

export type LandingCopy = typeof copy;

export default copy;
