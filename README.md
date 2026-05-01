# dominus-landing

Public marketing site for **Dominus OS** (`www.dominusapp.com.br`).

This repo is intentionally separate from the application monorepo
[`dominus-crm`](https://github.com/alexsandrocruz/dominus-crm) — see SAP-160 / §1
of the technical plan for the rationale (different cadence, different stack,
isolated blast radius from `app.dominusapp.com.br`).

- Parent issue: [SAP-160 — Landing Dominus OS — implementação Next.js + Azure SWA](https://app.paperclip.ing/SAP/issues/SAP-160)
- Technical plan: [SAP-160#document-plan](https://app.paperclip.ing/SAP/issues/SAP-160#document-plan)
- Bootstrap issue: [SAP-166](https://app.paperclip.ing/SAP/issues/SAP-166)

## Stack

- **Next.js** (App Router) + **TypeScript strict** (`noUncheckedIndexedAccess`)
- **Tailwind 4** + **shadcn/ui** (zinc base color, lucide icons)
- `next/font`: **Inter** (sans) + **Geist Mono**
- Static export (`output: 'export'`) — no Node runtime in production
- Hosted on **Azure Static Web Apps**

The `src/app/[locale]/` segment is in place from day one; v1 only generates
`pt-BR`. The root path `/` redirects to `/pt-BR/` (server-side via
`staticwebapp.config.json`, with a JS fallback for local serving).

### Folder layout

```
src/
  app/
    [locale]/
      page.tsx            # landing — composed of placeholder blocks
      agendar/page.tsx    # /agendar — Cal.com embed lands in SAP-165
      layout.tsx          # validates locale param
    api/health/route.ts   # static-export smoke endpoint
    layout.tsx            # html/body, fonts, robots
    page.tsx              # / → redirect to /pt-BR/
  components/
    blocks/               # one file per landing block (placeholders for now)
    ui/                   # shadcn/ui — generated, edit freely
    redirect-client.tsx   # client-side redirect helper for /
  lib/
    consent.ts            # cookie-banner state (essential / analytics / marketing)
    tracking.ts           # data-cta-* helpers + GTM dataLayer wrapper
    locales.ts            # SUPPORTED_LOCALES = ["pt-BR"]
    utils.ts              # shadcn cn()
staticwebapp.config.json  # SWA route/redirect/MIME rules
.github/workflows/landing-deploy.yml  # CI + Azure SWA deploy
```

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

`pnpm dev` shows the **Hello Dominus OS** landing scaffold at
`http://localhost:3000/pt-BR/` (the root path redirects there).

### Scripts

| Script        | What it does                                               |
| ------------- | ---------------------------------------------------------- |
| `pnpm dev`    | Next dev server (HMR)                                      |
| `pnpm build`  | Static export → `out/`                                     |
| `pnpm start`  | `next start` (only useful when `output: 'export'` is off)  |
| `pnpm lint`   | ESLint                                                     |

### Local production preview

`output: 'export'` means `pnpm start` does not work for the static bundle.
Use any static server against `out/`:

```bash
pnpm build
pnpm dlx serve out -l 3000
```

## Branches & PR flow

- `main` — production. Auto-deploys on merge.
- `develop` — integration. **All PRs target `develop` by default.**
- Feature branches: PR → `develop` → (later) `develop` → `main` for releases.

```bash
gh pr create --base develop
```

## CI / Deploy

`.github/workflows/landing-deploy.yml` runs on every push to `main`, every PR,
and `workflow_dispatch`:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm build` → produces `out/`
4. Verifies static export (`out/index.html`, `out/pt-BR/`).
5. **If** `AZURE_STATIC_WEB_APPS_API_TOKEN_LANDING` is set, deploys to Azure SWA:
   - `main` → production with `NEXT_PUBLIC_SEARCH_INDEX=true` (indexable).
   - PR → preview environment (`<repo>-<pr>.<region>.azurestaticapps.net`) with
     `NEXT_PUBLIC_SEARCH_INDEX=false` (noindex).

The deploy step is gated so the pipeline goes green even before the secret
exists. CTO opens the secret PR after CEO provisions Azure (below).

## Provisioning Azure SWA (manual, one-time)

> Action owner: **CEO** (Azure subscription) + **CTO** (link repo, set secret).
> Not blocking the bootstrap PR.

1. **Create the Static Web App resource** in the same subscription/RG as
   `app.dominusapp.com.br`:
   - Plan: **Standard** (preview environments require Standard).
   - Region: nearest to current SWA (East US 2 / Brazil South).
   - Source: GitHub → `alexsandrocruz/dominus-landing`, branch `main`.
   - Build presets: **Custom**:
     - App location: `/`
     - Output location: `out`
     - Skip API.
   - When Azure offers to commit a workflow file, **decline** — we already
     committed `.github/workflows/landing-deploy.yml`.
2. **Copy the deployment token** from the SWA resource → *Manage deployment
   token*.
3. **Add it as a repo secret**:
   - Repo → Settings → Secrets and variables → Actions →
     `AZURE_STATIC_WEB_APPS_API_TOKEN_LANDING`.
4. **Verify**: trigger a re-run of the workflow on `main`. The deploy step
   should run instead of emitting the "Deploy skipped" notice.
5. **DNS**: when the preview is approved, point `www.dominusapp.com.br`
   (CNAME) at the SWA hostname. Apex (`dominusapp.com.br`) gets ALIAS/ANAME if
   the registrar supports it; otherwise SWA's own apex feature.

## Environment variables

| Variable                       | Where    | Purpose                                                                |
| ------------------------------ | -------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SEARCH_INDEX`     | build    | `'true'` makes `<meta robots>` indexable. Production-only.             |

Add new public env vars under `NEXT_PUBLIC_` so they survive the static export.

## Roadmap (downstream tickets)

- **SAP-164** — implement landing blocks (real content + design).
- **SAP-165** — Cal.com embed (`/agendar`) + WhatsApp button behind a flag.
- **SAP-167 / 168** — SEO, A11y, CWV, asset capture from `app.dominusapp.com.br`.
