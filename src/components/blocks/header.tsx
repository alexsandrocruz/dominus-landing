"use client";

import * as React from "react";
import { MenuIcon } from "lucide-react";

import { Cta } from "@/components/cta";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getLandingMessages } from "@/content/messages";
import type { SupportedLocale } from "@/lib/locales";

type HeaderBlockProps = {
  locale: SupportedLocale;
};

export function HeaderBlock({ locale }: HeaderBlockProps) {
  const t = getLandingMessages(locale).header;
  const navItems = [
    { id: "modulos", label: t.nav.modulos, href: "#modulos" },
    {
      id: "como-funciona",
      label: t.nav.comoFunciona,
      href: "#como-funciona",
    },
    { id: "faq", label: t.nav.faq, href: "#faq" },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header
      data-block="header"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
        >
          <span
            aria-hidden
            className="inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
          >
            D
          </span>
          {t.brand}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Cta
            ctaLabel="login"
            ctaPosition="header"
            ctaVariant="secondary"
            ctaSize="sm"
            href="https://app.dominusapp.com.br"
            external
            destination="app.dominusapp.com.br"
          >
            {t.ctas.login}
          </Cta>
          <Cta
            ctaLabel="agendar-demo-header"
            ctaPosition="header"
            ctaVariant="primary"
            ctaSize="sm"
          >
            {t.ctas.demo}
          </Cta>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Abrir menu"
                className="md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 p-6">
            <nav
              aria-label="Navegação móvel"
              className="flex flex-col gap-4 pt-6"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
              <Cta
                ctaLabel="login"
                ctaPosition="header"
                ctaVariant="secondary"
                ctaSize="md"
                href="https://app.dominusapp.com.br"
                external
                destination="app.dominusapp.com.br"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                {t.ctas.login}
              </Cta>
              <Cta
                ctaLabel="agendar-demo-header"
                ctaPosition="header"
                ctaVariant="primary"
                ctaSize="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                {t.ctas.demo}
              </Cta>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
