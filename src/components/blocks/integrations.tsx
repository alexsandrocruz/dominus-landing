import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type IntegrationsBlockProps = {
  locale: SupportedLocale;
};

export function IntegrationsBlock({ locale }: IntegrationsBlockProps) {
  const t = getLandingMessages(locale).integracoes;

  return (
    <section
      id="integracoes"
      data-block="integracoes"
      aria-labelledby="integracoes-headline"
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="integracoes-headline"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t.headline}
          </h2>
          <p className="text-pretty text-base text-muted-foreground">
            {t.subhead}
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {t.items.map((item) => (
            <li
              key={item.label}
              className="flex h-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-background"
            >
              <span aria-hidden className="size-6 rounded bg-muted-foreground/20" />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
