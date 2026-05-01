/**
 * Smoke endpoint for the static export. With `output: 'export'`, Next renders
 * this once at build time and writes the JSON into `out/api/health/`.
 */
export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return Response.json({
    status: "ok",
    service: "dominus-landing",
    builtAt: new Date().toISOString(),
  });
}
