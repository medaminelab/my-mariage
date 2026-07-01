# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 22 application (standalone components, no NgModules), scaffolded via Angular CLI. It's a bilingual (French/Arabic) wedding announcement site: `App` composes section components (`src/app/sections/`) into a single page; `app.routes.ts` has no routes defined yet.

## Commands

- `npm start` / `ng serve` — run dev server at http://localhost:4200 with live reload
- `ng build` — production build, output to `dist/` (dev build: `ng build --configuration development`)
- `npm run watch` — build in watch mode with development configuration
- `npm test` / `ng test` — run unit tests via the Vitest-based Angular unit-test builder
- `ng test --watch=false` — single run without watch mode
- To run a single test file, pass a path filter, e.g. `ng test -- src/app/app.spec.ts`
- `ng generate component <name>` — scaffold a new component (defaults to SCSS styles per `angular.json` schematics config)

There is no configured lint script and no e2e test framework set up.

## Architecture

- Bootstrap entry point is [src/main.ts](src/main.ts), which bootstraps the standalone `App` component using `appConfig`.
- [src/app/app.config.ts](src/app/app.config.ts) is the central place for application-wide providers (router, error listeners, etc.) via `ApplicationConfig` — add new global providers (HTTP client, i18n, etc.) here.
- Routing is defined in [src/app/app.routes.ts](src/app/app.routes.ts) as a standalone `Routes` array, wired into `appConfig` via `provideRouter(routes)`.
- Components are standalone (`imports: [...]` directly on the `@Component` decorator) — do not introduce NgModules.
- Component styling uses SCSS; each component pairs a `.ts`, `.html`, and `.scss` file.
- Make all static data to display for the user in a json to easily modify it
- Page content is bilingual: [src/app/i18n/wedding-data.fr.json](src/app/i18n/wedding-data.fr.json) and [wedding-data.ar.json](src/app/i18n/wedding-data.ar.json) hold the French/Arabic copy, typed by [wedding-data.model.ts](src/app/i18n/wedding-data.model.ts). To add a field, update the model and both JSON files.
- [LanguageService](src/app/shared/language.service.ts) is a signal-based service holding the current `Lang` ('fr' | 'ar'), a `data` computed signal selecting the active JSON, and a `dir` computed signal ('ltr' | 'rtl') — it also syncs `<html lang>`/`<html dir>` and persists the choice to `localStorage`. Section components inject it and read `data()` in templates (never import the JSON files directly). [LanguageSwitcher](src/app/shared/language-switcher/language-switcher.ts) is the FR/AR toggle UI.
- RTL support relies on CSS logical properties (`inset-inline-start`, not `left`/`right`) plus an `Amiri`/`Cairo` font pair applied via `:root[dir='rtl']` in [styles.scss](src/styles.scss) — follow the same pattern for new layout/typography rules.

## Conventions

- TypeScript strictness: `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and Angular's `strictInjectionParameters` / `strictInputAccessModifiers` are enabled — respect these when adding code.
- Prettier config ([.prettierrc](.prettierrc)): single quotes, 100 print width, and the `angular` parser for `.html` files.
- Test files use Vitest globals (configured via `tsconfig.spec.json`) with Angular's `TestBed`, following the `*.spec.ts` naming convention alongside the file under test.
