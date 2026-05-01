import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type SocialProofBlockProps = {
  locale: SupportedLocale;
};

/**
 * Conditional render contract (CEO-approved on SAP-159, 2026-05-01):
 *   0 quotes  → return null (no DOM placeholder, no `[PLACEHOLDER]` text)
 *   1 quote   → single card
 *   2 quotes  → dual card grid
 * Never publish placeholder testimonial text.
 */
export function SocialProofBlock({ locale }: SocialProofBlockProps) {
  const t = getLandingMessages(locale).provaSocial;
  const quotes = t.quotes as Array<{
    body: string;
    author: string;
    role?: string;
    metric?: string;
  }>;

  if (quotes.length === 0) {
    return null;
  }

  return (
    <section
      id="prova-social"
      data-block="prova-social"
      aria-labelledby="prova-social-headline"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="prova-social-headline"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t.headline}
          </h2>
        </div>

        <ul
          role="list"
          className={
            quotes.length === 1
              ? "mx-auto max-w-2xl"
              : "grid gap-6 sm:grid-cols-2"
          }
        >
          {quotes.map((quote, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              <blockquote className="text-base text-foreground">
                “{quote.body}”
              </blockquote>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-10 shrink-0 rounded-full bg-muted"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {quote.author}
                  </span>
                  {quote.role ? (
                    <span className="text-xs text-muted-foreground">
                      {quote.role}
                    </span>
                  ) : null}
                </div>
                {quote.metric ? (
                  <Badge variant="secondary" className="ml-auto">
                    {quote.metric}
                  </Badge>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
