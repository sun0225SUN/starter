<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commit conventions

- Create every commit with the project-local cz-git workflow: stage only the intended changes, then run `bun run commit`.
- Follow the prompts instead of bypassing cz-git with a manually written `git commit -m` message.
- Keep the configured emoji in the generated Conventional Commit subject.
- Before committing, verify the staged diff and run the checks relevant to the changed files.
