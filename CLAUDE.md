# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This is a fresh pnpm monorepo scaffold (single commit: "Set up pnpm workspace with Vite React and NestJS apps"). Both apps are currently unmodified framework boilerplate — `apps/web` is the default Vite React template and `apps/api` is the default NestJS starter. There is no shared logic, no API integration between the two apps yet, and no environment config beyond framework defaults.

## Architecture

pnpm workspace (`pnpm-workspace.yaml`) with two independent apps under `apps/`:

- **`apps/web`** — React 19 + TypeScript frontend, built with Vite, linted with oxlint.
- **`apps/api`** — NestJS 11 + TypeScript backend, standard Nest module/controller/service structure (`AppModule` → `AppController` → `AppService`), built on Express.

The two apps are not yet wired together (no API base URL configured in the web app, no CORS setup in the API).

## Commands

Run from the repo root using pnpm workspace filters (defined in root `package.json`):

```bash
# Web (apps/web)
pnpm dev:web        # start Vite dev server
pnpm build:web       # tsc -b && vite build
pnpm lint:web         # oxlint
pnpm preview:web      # preview production build

# API (apps/api)
pnpm dev:api          # nest start --watch
pnpm start:api        # nest start
pnpm build:api        # nest build
pnpm lint:api          # eslint --fix
pnpm test:api          # jest unit tests
```

For commands not exposed at the root (e.g. e2e tests, running a single test), use `pnpm --filter <app>`:

```bash
pnpm --filter api test:e2e              # e2e tests (jest, config at apps/api/test/jest-e2e.json)
pnpm --filter api test:cov              # unit test coverage
pnpm --filter api test -- <pattern>     # run a single test file/pattern
pnpm --filter api test:debug            # debug unit tests with --inspect-brk
```

Install dependencies for the whole workspace with `pnpm install` from the root.

## Notes for future work

- `apps/api` unit tests live alongside source as `*.spec.ts` (Jest root is `apps/api/src`); e2e tests live in `apps/api/test/*.e2e-spec.ts` with a separate Jest config.
- `apps/web` uses oxlint (not ESLint); config is `apps/web/.oxlintrc.json`. Type-aware lint rules are not enabled by default — see `apps/web/README.md` if that changes.
- `apps/api` uses ESLint + Prettier; config is `apps/api/eslint.config.mjs` and `apps/api/.prettierrc`.
