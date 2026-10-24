<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commit workflow

- Stage only the intended changes and review them with `git diff --cached` before committing.
- Agents must create commits non-interactively; do not start the Commitizen/cz-git prompt.
- Follow the cz-git configuration when composing the message: use `:emoji: type(scope): subject`, with an optional scope and optional `!` before the colon for breaking changes.
- Keep the emoji at the left of the header. Use cz-git's default mapping: `feat` → `:sparkles:`, `fix` → `:bug:`, `docs` → `:memo:`, `style` → `:lipstick:`, `refactor` → `:recycle:`, `perf` → `:zap:`, `test` → `:white_check_mark:`, `build` → `:package:`, `ci` → `:ferris_wheel:`, `chore` → `:hammer:`, and `revert` → `:rewind:`.
- Write a short, imperative, lower-case subject without a trailing period. Example: `:sparkles: feat(map): add activity heatmap`.
- Let Lefthook run normally: `pre-commit` formats supported staged files with Biome and re-stages the fixes, while `commit-msg` uses Commitlint and `@commitlint/config-conventional` to validate the final message.
- Never bypass hooks with `--no-verify`. Run the checks relevant to the changed files before committing.

## Architecture

Follow [Feature-Sliced Design](https://feature-sliced.design) v2.1 and the [Usage with Next.js](https://fsd.how/docs/guides/tech/with-nextjs/) guide. The Next.js App Router stays at the repository-root `app/`. Rename both FSD layers: `src/_app` and `src/_pages`.

Layers, from highest to lowest. Add one only when it has code to hold. Do not add layers, and do not add the deprecated `processes` layer.

| Layer          | Path                   | What belongs there                                                                                                                                                                                |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js routes | `app/`                 | Thin route files only: `layout.tsx`, `page.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, metadata, and `generateStaticParams`. A page file re-exports or renders the matching `src/_pages` slice. |
| Next.js proxy  | `proxy.ts`             | The framework proxy, beside the root `app/` directory.                                                                                                                                            |
| App            | `src/_app`             | Providers, global styles, app-wide routing and i18n setup. Segments only, no slices.                                                                                                              |
| Pages          | `src/_pages/<slice>`   | The UI of one route.                                                                                                                                                                              |
| Widgets        | `src/widgets/<slice>`  | A large block reused by more than one page, or a block large enough that the page only composes it.                                                                                               |
| Features       | `src/features/<slice>` | A user action that brings product value and is reused. A one-off interaction stays in its page.                                                                                                   |
| Entities       | `src/entities/<slice>` | A business noun: its model, request functions, and reusable appearance.                                                                                                                           |
| Shared         | `src/shared`           | Code with no product behavior: UI kit, clients, focused libraries, config. Segments only, no slices.                                                                                              |

`messages/` stays at the repo root. `getRequestConfig` loads those catalogs. Do not add a second catalog path.

### Imports

- A file may import its own slice and any layer strictly below it.
- Slices on the same layer do not import each other. `_app` and `shared` are the exceptions: their segments may import each other.
- The root `app/` directory may import FSD layers. It stays free of feature logic.
- Code outside a slice imports that slice only through its public API, `index.ts`. Inside a slice, import the other file by its relative path. Do not import the slice's own `index.ts` from inside it.
- When a client import of `index.ts` would pull in a server-only module, put the server exports in `index.server.ts` and keep the client public API free of them.
- On `entities` only, a cross-import is `entities/<A>/@x/<B>.ts`, exported from there and imported as `@/entities/<A>/@x/<B>`. Keep these rare.
- A slice group is a folder of related slices. It has no segments, no `index.ts`, and no shared code of its own.

### Segments

Use `ui`, `model`, `api`, `lib`, and `config`. Name any other segment by its purpose. `components`, `hooks`, `utils`, `helpers`, and `types` are not segment names.

`shared/ui` and `shared/lib` do not use one barrel. Each piece has its own public API, for example `@/shared/ui/button`.

`src/shared/i18n/index.ts` exports `routing` only. Import navigation helpers from `@/shared/i18n/navigation`. `src/shared/i18n/request.ts` is loaded by `next.config.ts`. Do not re-export `navigation` or `request` from the i18n index; the proxy bundle will otherwise include `next/root-params`.

Put a Zustand store in the `model` segment of the slice that owns the interaction. Put shadcn primitives in `shared/ui/<name>`. Put `cn` and other project-agnostic helpers in `shared/lib/<topic>`, one topic per folder.

The old `src/components`, `src/hooks`, `src/stores`, `src/i18n`, `src/lib`, `src/styles`, and `src/types` paths are retired. Do not add files there.
