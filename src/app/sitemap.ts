import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/locales";

export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dominus.app";

const ROUTES = ["", "agendar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ROUTES.map((route) => {
      const path = route ? `/${locale}/${route}/` : `/${locale}/`;
      return {
        url: `${SITE_URL.replace(/\/$/, "")}${path}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.6,
      };
    }),
  );
}
