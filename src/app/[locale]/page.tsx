import { notFound } from "next/navigation";

import { HeaderBlock } from "@/components/blocks/header";
import { HeroBlock } from "@/components/blocks/hero";
import { LogoBarBlock } from "@/components/blocks/logo-bar";
import { ProblemBlock } from "@/components/blocks/problem";
import { ModulesBlock } from "@/components/blocks/modules";
import { FlowsBlock } from "@/components/blocks/flows";
import { IntegrationsBlock } from "@/components/blocks/integrations";
import { SocialProofBlock } from "@/components/blocks/social-proof";
import { PricingTeaserBlock } from "@/components/blocks/pricing-teaser";
import { FaqBlock } from "@/components/blocks/faq";
import { FinalCtaBlock } from "@/components/blocks/final-cta";
import { FooterBlock } from "@/components/blocks/footer";
import { getLandingMessages } from "@/content/messages";
import { isSupportedLocale } from "@/lib/locales";

type LandingHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function LandingHome({ params }: LandingHomeProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const skipLink = getLandingMessages(locale).skipLink;

  return (
    <div className="flex flex-1 flex-col">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {skipLink}
      </a>
      <HeaderBlock locale={locale} />
      <main className="flex flex-1 flex-col">
        <HeroBlock locale={locale} />
        <LogoBarBlock locale={locale} />
        <ProblemBlock locale={locale} />
        <ModulesBlock locale={locale} />
        <FlowsBlock locale={locale} />
        <IntegrationsBlock locale={locale} />
        <SocialProofBlock locale={locale} />
        <PricingTeaserBlock locale={locale} />
        <FaqBlock locale={locale} />
        <FinalCtaBlock locale={locale} />
      </main>
      <FooterBlock locale={locale} />
    </div>
  );
}
