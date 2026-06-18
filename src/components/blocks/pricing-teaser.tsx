import { MessageCircleIcon } from "lucide-react";

import { Cta } from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import { featureFlags } from "@/lib/feature-flags";
import type { SupportedLocale } from "@/lib/locales";

type PricingTeaserBlockProps = {
  locale: SupportedLocale;
};

export function PricingTeaserBlock({ locale }: PricingTeaserBlockProps) {
  const t = getLandingMessages(locale).pricing;
  const showWhatsApp = featureFlags.whatsapp;

  return (
    <section
      id="pricing"
      data-block="pricing"
      aria-labelledby="pricing-headline"
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
          {t.eyebrow}
        </Badge>
        <h2
          id="pricing-headline"
          className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
        >
          {t.headline}
        </h2>
        <p className="text-pretty text-base text-muted-foreground">
          {t.subhead}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Cta
            ctaLabel="agendar-demo-pricing"
            ctaPosition="pricing"
            ctaVariant="primary"
            ctaSize="lg"
          >
            {t.ctaPrimary}
          </Cta>
          {showWhatsApp ? (
            <Cta
              ctaLabel="whatsapp-pricing"
              ctaPosition="pricing"
              ctaVariant="secondary"
              ctaSize="lg"
              destination="whatsapp"
            >
              <MessageCircleIcon aria-hidden className="size-4" />
              {t.whatsappLabel}
            </Cta>
          ) : null}
        </div>
      </div>
    </section>
  );
}
