# Circleus

Circleus is the reusable Circles extension for independent group Spaces,
linked-Space workflows, and Circle-specific presentation across family, team,
and community contexts. This active implementation workspace is still partly
scaffold-derived; the Circleus feature is currently in Draft, with its public
contract published from
[`sneat-ext-contracts`](https://github.com/sneat-co/sneat-ext-contracts)
(`libs/circleus`).

## Repository model

- `circleus` owns the implementation app and runtime.
- [`sneat-ext-contracts`](https://github.com/sneat-co/sneat-ext-contracts)
  (`libs/circleus`) owns the public Circleus contract package, published as
  `@sneat/extension-circleus-contract`. The former `ext-circleus` repository
  is archived.

The implementation never copies contract source. It consumes the published
contract package just as another extension would.

## Current scaffold layout

The repository has not yet completed its template-to-Circleus rename, so some
paths and package names below still use `template`:

```text
apps/
  template-app/        # Ionic composition root
  template-app-e2e/    # Playwright harness
libs/extensions/template/
  runtime/             # @sneat/extension-circleus
landings/               # Astro marketing site (see landings/README.md)
backend/                # Go domain module (see backend/README.md)
```

The public Circleus contract package —
`@sneat/extension-circleus-contract` — now publishes from
[`sneat-ext-contracts`](https://github.com/sneat-co/sneat-ext-contracts)
(`libs/circleus`); the former `ext-circleus` repository is archived.

## Backend

`backend/` is a Go domain module (`github.com/sneat-co/template/backend`) built
to the org's
[ports-and-adapters standard](https://github.com/sneat-co/sneat-specs/blob/main/standards/extension-backend-architecture.md):
it depends on `dal-go/dalgo` only — never `sneat-go-core`, `sneat-core-modules`,
or another extension's backend — and expresses platform/cross-extension needs
as ports, satisfied by adapters in the host composition root (`sneat-go`). See
[`backend/README.md`](backend/README.md).

CI (`.github/workflows/backend-ci.yml`) runs lint/test/build on every push and
PR touching `backend/**`, and auto-tags the next `backend/vX.Y.Z` release on
push to `main`.

This is distinct from `ext-<id>`'s own `backend/` (the **contract** module —
`dto4<id>` types, briefs, facade interfaces). This one is the
**implementation** — DBOs, storage, facade bodies.

## Runtime API

The runtime package is deliberately an application-integration surface. Its
root entry point exports provider functions and route arrays only. It does not
export concrete services, pages, or components for other extension libraries to
consume.

```ts
import { provideTemplate, templateSpaceRoutes } from '@sneat/extension-circleus';

bootstrapApplication(App, {
  providers: [...provideTemplate(), provideRouter(templateSpaceRoutes)],
});
```

Extension libraries use contract tokens; only the app composition root imports a
different extension's runtime package. Reusable components deserve a separate
`@sneat/extension-<id>-ui` package only when another extension needs them.

## Develop

This is a product implementation repository, not a template to clone. Use the
existing workspace scripts and the [extension standards](https://github.com/sneat-co/sneat-libs/tree/main/docs/extension-standards)
for dependency rules and release sequencing.
