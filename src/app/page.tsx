import type { Metadata } from "next";
import Link from "next/link";
import { RedirectClient } from "@/components/redirect-client";

const DEFAULT_LOCALE = "pt-BR";
const TARGET = `/${DEFAULT_LOCALE}/`;

export const metadata: Metadata = {
  title: "Dominus OS",
};

export default function RootRedirectPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
      <RedirectClient target={TARGET} />
      <noscript>
        <p>
          Vá para{" "}
          <Link href={TARGET} className="underline">
            {TARGET}
          </Link>
          .
        </p>
      </noscript>
    </main>
  );
}
