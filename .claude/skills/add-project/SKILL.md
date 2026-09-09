---
name: add-project
description: Add a new open-source project to the awesome-nte list by editing data/projects.json, running validation and regenerating the lists.
---

# Add a project to awesome-nte

Use this skill when asked to add, suggest, or review a project against the awesome-nte list.

## Steps

1. **Confirm eligibility** (all must hold):
   - Open source (public, readable source; not binary-only).
   - NTE-related, or a multi-game tool that explicitly supports NTE.
   - Usable (has a README; not a placeholder).
   - Compliant (**no memory/process/network injection**). Screen-reading automation (MaaNTE, ok-nte) is fine.
2. **De-duplicate**: if another project already covers the same function and is comparable, prefer to keep only one representative (feature coverage > activity > cross-platform > stars). Ask the user rather than silently adding duplicates.
3. **Add to `data/projects.json`**:
   - `id: max(existing ids) + 1`
   - `name`: GitHub `owner/repo`
   - `description`: bilingual single sentence, capital-start, ends with `。` / `.`
   - `category`: one of `Automation`, `Calculators`, `Data`, `Assets`, `Mods`, `Performance`, `Tools`
   - `tags`: short English keywords
   - optional `license`, `platform`, `status` (`active`/`stale`/`archived`), `website`, `author`
   - `addedAt`: date, `YYYY-MM-DD`
4. **Validate & generate**:
   ```bash
   bun install
   bun run check
   bun run generate
   ```
5. **Commit** `data/projects.json` plus the regenerated `LIST.md` / `LIST.en.md`.

## Never

- Never edit `LIST.md` / `LIST.en.md` directly.
- Never include injection-based cheats or private servers.
- Never add a duplicate without checking with the user first.
