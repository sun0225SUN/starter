# Tests

- Unit tests use Vitest. Run them with `bun run test`.
- Put a test next to the module it covers, named `*.test.ts` or `*.test.tsx`.
- When you add or change behavior in a `model`, `lib`, `api`, or hook module, add or update that module's unit test in the same change.
- Styles, message catalogs, and thin Next.js route files that only re-export a page do not need a unit test.
- A push runs the unit tests first. If a test fails, the push stops. Do not skip `pre-push` with `--no-verify`.
