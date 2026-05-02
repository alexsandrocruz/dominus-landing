import type { Metadata } from "next";
import { PlaceholderBlock } from "@/components/blocks/placeholder";

export const metadata: Metadata = {
  title: "Agendar demo",
  description: "Agende uma demonstração do Dominus OS.",
};

export default function AgendarPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <PlaceholderBlock
        blockId="agendar"
        label="Agendar demo — Cal.com embed (SAP-165)"
        heightClass="min-h-[60vh]"
      />
    </main>
  );
}
