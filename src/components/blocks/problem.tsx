import { CircleAlertIcon } from "lucide-react";

import { Cta } from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type ProblemBlockProps = {
  locale: SupportedLocale;
};

export function ProblemBlock({ locale }: ProblemBlockProps) {
  const t = getLandingMessages(locale).problema;

  return (
    <section
      id="problema"
      data-block="problema"
      aria-labelledby="problema-headline"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="problema-headline"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t.headline}
          </h2>
        </div>

        <ul role="list" className="grid gap-6 sm:grid-cols-3">
          {t.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6"
            >
              <CircleAlertIcon
                aria-hidden
                className="size-5 text-muted-foreground"
              />
              <h3 className="text-base font-semibold text-foreground">
                {bullet.title}
              </h3>
              <p className="text-sm text-muted-foreground">{bullet.body}</p>
            </li>
          ))}
        </ul>

        <div>
          <Cta
            ctaLabel="agendar-demo-problema"
            ctaPosition="problema"
            ctaVariant="secondary"
            ctaSize="md"
          >
            {t.cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}
