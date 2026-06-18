import { buildCtaDataAttributes } from "@/lib/tracking";
import { getLandingMessages } from "@/content/messages";
import { slugifyLabel } from "@/lib/utils";
import type { SupportedLocale } from "@/lib/locales";

type FooterBlockProps = {
  locale: SupportedLocale;
};

export function FooterBlock({ locale }: FooterBlockProps) {
  const t = getLandingMessages(locale).footer;

  return (
    <footer
      data-block="footer"
      className="border-t border-border/60 bg-background"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
              <span
                aria-hidden
                className="inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
              >
                D
              </span>
              Dominus
            </span>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>
          {t.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">
                {col.title}
              </span>
              <ul role="list" className="flex flex-col gap-2">
                {col.links.map((link) => {
                  const isExternal = "external" in link && link.external === true;
                  const dataAttrs = buildCtaDataAttributes({
                    label: `footer-${slugifyLabel(link.label)}`,
                    position: "footer",
                    variant: "tertiary",
                    destination: link.href,
                  });
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        {...dataAttrs}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t.copyright}</p>
          <p className="text-xs text-muted-foreground">
            <a
              href="https://sapienzaae.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
              {...buildCtaDataAttributes({
                label: "footer-cross-sapienzaae",
                position: "footer",
                variant: "tertiary",
                destination: "sapienzaae.com.br",
              })}
            >
              sapienzaae.com.br
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
