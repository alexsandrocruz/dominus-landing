import { HeaderBlock } from "@/components/blocks/header";
import { HeroBlock } from "@/components/blocks/hero";
import { ProblemBlock } from "@/components/blocks/problem";
import { ModulesBlock } from "@/components/blocks/modules";
import { FlowsBlock } from "@/components/blocks/flows";
import { IntegrationsBlock } from "@/components/blocks/integrations";
import { SocialProofBlock } from "@/components/blocks/social-proof";
import { PricingTeaserBlock } from "@/components/blocks/pricing-teaser";
import { FaqBlock } from "@/components/blocks/faq";
import { FinalCtaBlock } from "@/components/blocks/final-cta";
import { FooterBlock } from "@/components/blocks/footer";

export default function LandingHome() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderBlock />
      <main className="flex flex-1 flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
        <p className="mx-auto w-full max-w-6xl rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          Hello Dominus OS — landing scaffold (SAP-166). Conteúdo real entra em
          SAP-164.
        </p>
        <HeroBlock />
        <ProblemBlock />
        <ModulesBlock />
        <FlowsBlock />
        <IntegrationsBlock />
        <SocialProofBlock />
        <PricingTeaserBlock />
        <FaqBlock />
        <FinalCtaBlock />
      </main>
      <FooterBlock />
    </div>
  );
}
