import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dominus.app";

const shouldIndex = process.env.NEXT_PUBLIC_SEARCH_INDEX === "true";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndex) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
  };
}
