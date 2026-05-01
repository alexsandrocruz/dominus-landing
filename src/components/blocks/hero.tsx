import { Cta } from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import { featureFlags } from "@/lib/feature-flags";
import type { SupportedLocale } from "@/lib/locales";

type HeroBlockProps = {
  locale: SupportedLocale;
};

export function HeroBlock({ locale }: HeroBlockProps) {
  const t = getLandingMessages(locale).hero;
  const variant = featureFlags.heroVariant;

  return (
    <section
      id="hero"
      data-block="hero"
      data-hero-variant={variant}
      className="relative overflow-hidden border-b border-border/60 bg-background"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.headline}
          </h1>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            {t.subhead}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Cta
              ctaLabel="agendar-demo-hero"
              ctaPosition="hero"
              ctaVariant="primary"
              ctaSize="lg"
            >
              {t.ctaPrimary}
            </Cta>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            role="img"
            aria-label={t.screenshotAlt}
            className="aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl border border-dashed border-border bg-muted/40"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                screenshot placeholder
              </span>
              <span className="text-sm text-muted-foreground">
                Visual real entra em SAP-168
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
