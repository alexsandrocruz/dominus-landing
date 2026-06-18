import { Cta } from "@/components/cta";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type FinalCtaBlockProps = {
  locale: SupportedLocale;
};

export function FinalCtaBlock({ locale }: FinalCtaBlockProps) {
  const t = getLandingMessages(locale).ctaFinal;

  return (
    <section
      id="cta-final"
      data-block="cta-final"
      aria-labelledby="cta-final-headline"
      className="bg-zinc-950 text-zinc-50 dark:bg-zinc-900"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <h2
          id="cta-final-headline"
          className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          {t.headline}
        </h2>
        <p className="text-pretty text-base text-zinc-300">{t.subhead}</p>
        <Cta
          ctaLabel="agendar-demo-cta-final"
          ctaPosition="cta-final"
          ctaVariant="primary"
          ctaSize="lg"
          className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200"
        >
          {t.cta}
        </Cta>
      </div>
    </section>
  );
}
