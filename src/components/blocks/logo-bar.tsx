import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type LogoBarBlockProps = {
  locale: SupportedLocale;
};

const PLACEHOLDER_SLOTS = Array.from({ length: 8 }, (_, i) => i);

export function LogoBarBlock({ locale }: LogoBarBlockProps) {
  const t = getLandingMessages(locale).logoBar;

  return (
    <section
      id="logo-bar"
      data-block="logo-bar"
      aria-labelledby="logo-bar-headline"
      className="border-y border-border/60 bg-muted/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <p
          id="logo-bar-headline"
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          {t.headline}
        </p>
        <p className="sr-only">{t.subhead}</p>
        <ul
          role="list"
          className="grid w-full grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-8"
        >
          {PLACEHOLDER_SLOTS.map((slot) => (
            <li
              key={slot}
              aria-hidden
              className="flex h-10 items-center justify-center rounded-md bg-zinc-200/70 dark:bg-zinc-800/60"
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
