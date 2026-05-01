"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  buildCtaDataAttributes,
  trackCtaClick,
  type CtaPosition,
  type CtaVariant,
} from "@/lib/tracking";

/**
 * Tracked CTA. Renders as `<a>` when `href` is provided, otherwise `<button>`.
 *
 * Real Cal.com / WhatsApp / GTM integrations are deferred (SAP-161 / follow-up).
 * Until then, button CTAs without an `onClick` console.log the placeholder
 * intent so QA can spot regressions.
 */

const ctaVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      ctaVariant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary",
        secondary:
          "border-border bg-background text-foreground hover:bg-muted",
        tertiary:
          "text-foreground underline-offset-4 hover:underline",
      },
      ctaSize: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      ctaVariant: "primary",
      ctaSize: "md",
    },
  },
);

type CommonProps = VariantProps<typeof ctaVariants> & {
  ctaLabel: string;
  ctaPosition: CtaPosition;
  ctaVariantTracking?: CtaVariant;
  destination?: string;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children" | "onClick"
  >;

type ButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "className" | "children" | "onClick"
  >;

export type CtaProps = AnchorProps | ButtonProps;

function resolveTrackingVariant(
  ctaVariant: CommonProps["ctaVariant"],
  override: CtaVariant | undefined,
): CtaVariant {
  if (override) return override;
  if (ctaVariant === "secondary") return "secondary";
  if (ctaVariant === "tertiary") return "tertiary";
  return "primary";
}

export function Cta(props: CtaProps) {
  const {
    ctaLabel,
    ctaPosition,
    ctaVariantTracking,
    ctaVariant,
    ctaSize,
    destination,
    className,
    children,
    ...rest
  } = props;

  const dataAttrs = buildCtaDataAttributes({
    label: ctaLabel,
    position: ctaPosition,
    variant: resolveTrackingVariant(ctaVariant, ctaVariantTracking),
    destination,
  });

  const classes = cn(ctaVariants({ ctaVariant, ctaSize }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, onClick, ...anchorRest } =
      rest as Omit<AnchorProps, keyof CommonProps>;
    const targetProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a
        href={href}
        className={classes}
        {...dataAttrs}
        {...targetProps}
        onClick={(event) => {
          trackCtaClick(event.currentTarget);
          onClick?.(event);
        }}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = "button", ...buttonRest } =
    rest as Omit<ButtonProps, keyof CommonProps>;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    trackCtaClick(event.currentTarget);
    if (onClick) {
      onClick(event);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      // Placeholder until SAP-161 wires Cal.com / WhatsApp / GTM.
      console.log("[cta:placeholder]", {
        label: ctaLabel,
        position: ctaPosition,
      });
    }
  };

  return (
    <button
      type={type}
      className={classes}
      {...dataAttrs}
      onClick={handleClick}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
