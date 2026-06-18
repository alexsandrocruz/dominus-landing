"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import { buildCtaDataAttributes } from "@/lib/tracking";
import type { SupportedLocale } from "@/lib/locales";

type FaqBlockProps = {
  locale: SupportedLocale;
};

export function FaqBlock({ locale }: FaqBlockProps) {
  const t = getLandingMessages(locale).faq;

  return (
    <section
      id="faq"
      data-block="faq"
      aria-labelledby="faq-headline"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="faq-headline"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t.headline}
          </h2>
        </div>

        <Accordion>
          {t.items.map((item) => {
            const dataAttrs = buildCtaDataAttributes({
              label: `faq-${item.id}`,
              position: "faq",
              variant: "tertiary",
            });
            return (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger {...dataAttrs}>{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
