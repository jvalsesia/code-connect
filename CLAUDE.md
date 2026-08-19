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

## Frontend conventions (`apps/web`)

### Atomic Design

Components live under `src/components/` split by atomic level, one folder per component:

```
src/components/
  atoms/       # indivisible primitives: Button, Input, Icon, Text, Badge
  molecules/   # small groups of atoms with one job: FormField, SearchBar, Card
  organisms/   # self-contained UI sections: Header, PostList, CommentThread
  templates/   # page layouts with slots, no real data
src/pages/     # templates wired to real data/routing
```

Rules:
- A component may only import from its own level or below (an atom never imports a molecule).
- Atoms and molecules stay presentational: no data fetching, no global state, no routing — data arrives via props.
- Data fetching, state and routing belong to organisms and pages.
- One folder per component with `Component.tsx`, `Component.test.tsx`, and `index.ts` re-exporting it.

### Tailwind

- Tailwind CSS is the only styling mechanism. Do not add CSS Modules, styled-components, inline `style` objects for static styling, or new plain `.css` files.
- Write utility classes directly in JSX. Reuse means extracting a component, not `@apply`.
- Design tokens (colors, spacing, fonts) go in the Tailwind theme config and are consumed as utilities — never hardcoded hex values in components.
- Conditional classes: use a `clsx`/`cn` helper, not string concatenation.

### Component tests (mandatory)

**Every component must ship with a test covering its essential usage.** A component without a test is an incomplete change.

- Tests are colocated: `src/components/atoms/Button/Button.test.tsx`.
- Vitest + React Testing Library; query by accessible role/label, not by class name or test id when a role exists.
- "Essential usage" means at minimum: it renders with its required props, its primary interaction works (click/change/submit calls the handler), and each meaningful state variant renders (loading, error, empty, disabled) when the component has one.
- Assert on user-visible behaviour, not implementation details.

> Not yet installed: `apps/web` currently has no Tailwind and no test runner. The first task that touches components should add `tailwindcss` (+ `@tailwindcss/vite`) and `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`, plus a `test` script in `apps/web/package.json` and a matching `test:web` filter in the root `package.json`.

## Backend conventions (`apps/api`)

Endpoints must be REST-adherent. Concretely:

**Resources and URLs**
- URLs name resources with plural nouns, never actions: `/users`, `/users/:id/posts`. No `/getUser`, no `/createPost`.
- Nest only to express ownership, and no deeper than two levels.
- Filtering, sorting and pagination go in the query string (`?page=1&limit=20&sort=-createdAt`), never in the path.

**Verbs and semantics**
- `GET` read-only and safe; `POST` create (non-idempotent); `PUT` full replace (idempotent); `PATCH` partial update; `DELETE` remove (idempotent).
- `GET` must never mutate state.

**Status codes**
- `200` OK, `201` Created (with a `Location` header pointing at the new resource), `204` No Content for deletes and empty responses.
- `400` validation error, `401` unauthenticated, `403` unauthorized, `404` not found, `409` conflict, `422` semantic validation failure.
- `500` only for genuinely unexpected failures — never as a catch-all for expected errors.

**Representation**
- JSON in and out; collections return a wrapped shape with pagination metadata, not a bare array.
- Request bodies are validated DTOs (`class-validator` + a global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`).
- Responses are shaped by response DTOs / serialization — never leak entities or internal fields (password hashes, soft-delete flags) straight from the persistence layer.
- Errors use a consistent envelope, produced by Nest's `HttpException` subclasses and a global exception filter.

**Structure**
- One feature module per resource (`users/` with `users.controller.ts`, `users.service.ts`, `users.module.ts`, `dto/`, `entities/`).
- Controllers only handle HTTP (route, validate, map status); business logic belongs in services.
- Stateless: no server-side session state between requests; auth travels in the request.
- Versioning via URI prefix (`/api/v1`) once the API has an external consumer.

Every controller needs unit tests (`*.spec.ts`) for its service logic and an e2e test (`test/*.e2e-spec.ts`) asserting status codes and response shape for the happy path and the main error paths.

## Git conventions

Both apps use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scope**: the affected area — `web`, `api`, or something narrower (`web/button`, `api/users`, `deps`).
- **Description**: imperative mood, lowercase, no trailing period, max ~72 chars ("add login form", not "added login form.").
- **Breaking changes**: `!` after the scope (`feat(api)!: ...`) and a `BREAKING CHANGE:` footer explaining the migration.
- Commits are atomic — one logical change each. Don't mix a refactor with a feature.
- Branch names follow the same vocabulary: `feat/user-authentication`, `fix/api-cors-headers`.

Examples:

```
feat(web): add Button atom with variant and size props
test(web): cover PostCard empty and loading states
fix(api): return 404 instead of 500 for missing user
refactor(api): extract pagination into a shared DTO
chore(deps): bump vite to 8.2.0
```

## Notes for future work

- `apps/api` unit tests live alongside source as `*.spec.ts` (Jest root is `apps/api/src`); e2e tests live in `apps/api/test/*.e2e-spec.ts` with a separate Jest config.
- `apps/web` uses oxlint (not ESLint); config is `apps/web/.oxlintrc.json`. Type-aware lint rules are not enabled by default — see `apps/web/README.md` if that changes.
- `apps/api` uses ESLint + Prettier; config is `apps/api/eslint.config.mjs` and `apps/api/.prettierrc`.
