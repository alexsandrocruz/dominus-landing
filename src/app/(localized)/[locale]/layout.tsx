import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { isSupportedLocale, SUPPORTED_LOCALES } from "@/lib/locales";

import "../../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shouldIndex = process.env.NEXT_PUBLIC_SEARCH_INDEX === "true";

export const metadata: Metadata = {
  title: {
    default: "Dominus OS",
    template: "%s — Dominus OS",
  },
  description:
    "Dominus OS — plataforma de operação para escritórios e estúdios.",
  robots: shouldIndex
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
