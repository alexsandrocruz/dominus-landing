import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type FlowsBlockProps = {
  locale: SupportedLocale;
};

export function FlowsBlock({ locale }: FlowsBlockProps) {
  const t = getLandingMessages(locale).comoFunciona;

  return (
    <section
      id="como-funciona"
      data-block="como-funciona"
      aria-labelledby="como-funciona-headline"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="como-funciona-headline"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t.headline}
          </h2>
        </div>

        <ol
          role="list"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {t.steps.map((step) => (
            <li
              key={step.number}
              className="flex min-w-[80%] snap-start flex-col gap-3 rounded-lg border border-border bg-card p-6 sm:min-w-0"
            >
              <span
                aria-hidden
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                {step.number}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
