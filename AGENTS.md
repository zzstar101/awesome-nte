# AGENTS.md

This repo is `awesome-nte` — a curated index of third-party **open-source** projects for the game *Neverness to Everness* (异环 / NTE).

## What this repo contains

- `data/projects.json` — **single source of truth**. One entry per project, with bilingual (`zh-CN`, `en-US`) descriptions, category, tags, license, platform, status.
- `data/stars.json` — daily snapshot of star counts (auto-updated by CI; not shown in the lists).
- `scripts/` — `check` (validate data), `generate` (produce LIST.md / LIST.en.md), `stars`, `add`.
- `LIST.md` / `LIST.en.md` — generated; **do not edit by hand**.
- `README.md` / `README.en.md`, `CONTRIBUTING.*`, `CODE_OF_CONDUCT.md`, `LICENSE`.

## How to contribute (agents)

1. To add a project, edit `data/projects.json` (or run `bun run add`), **not** `LIST.md`.
2. Every entry needs a **bilingual** one-sentence description, a valid `category`, and `id = max(id) + 1`.
3. Run `bun install`, then `bun run check && bun run generate`, and commit the regenerated `LIST.md`/`LIST.en.md` too.
4. **Exclusion policy is strict**: open-source + NTE-related + usable + compliant. **Injection-based cheats and private servers are always excluded.** Screen-reading automation (MaaNTE, ok-nte) is included. De-duplicate per functional area — keep only the representative project unless others are clearly differentiated.

## Conventions

- Categories: `Automation` / `Calculators` / `Data` / `Assets` / `Mods` / `Performance` / `Tools`.
- Descriptions start with a capital letter and end with `。` (zh) or `.` (en).
- Do not include the star count in `LIST.md` (it lives only in `stars.json`).
- License is MIT; the docs/rights statement is in the README disclaimer.

## Quick commands

```bash
bun install
bun run check
bun run generate
bun run stars
```
