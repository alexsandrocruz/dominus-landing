import {
  MessageCircleIcon,
  MessageSquareIcon,
  PhoneIcon,
  ScaleIcon,
  SparklesIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getLandingMessages } from "@/content/messages";
import { buildCtaDataAttributes } from "@/lib/tracking";
import type { SupportedLocale } from "@/lib/locales";

type ModulesBlockProps = {
  locale: SupportedLocale;
};

const ICON_MAP: Record<string, LucideIcon> = {
  Users: UsersIcon,
  Scale: ScaleIcon,
  Sparkles: SparklesIcon,
  MessageSquare: MessageSquareIcon,
  MessageCircle: MessageCircleIcon,
  Phone: PhoneIcon,
};

export function ModulesBlock({ locale }: ModulesBlockProps) {
  const t = getLandingMessages(locale).modulos;

  return (
    <section
      id="modulos"
      data-block="modulos"
      aria-labelledby="modulos-headline"
      className="border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wider">
            {t.eyebrow}
          </Badge>
          <h2
            id="modulos-headline"
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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.cards.map((card) => {
            const Icon = ICON_MAP[card.icon] ?? UsersIcon;
            const dataAttrs = buildCtaDataAttributes({
              label: `modulo-${card.slug}`,
              position: "modulos",
              variant: "tertiary",
            });
            return (
              <li
                key={card.slug}
                {...dataAttrs}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <Badge variant={card.status === "estavel" ? "secondary" : "outline"}>
                    {card.status === "estavel"
                      ? t.badges.estavel
                      : t.badges.rollout}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
