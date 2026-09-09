# Contribution Guidelines

Thank you for your interest in **awesome-nte**! This document explains how to add or fix projects and the rules to follow.

Please read [Inclusion criteria](#inclusion-criteria) and [Format](#format) before submitting.

## Inclusion criteria

A project is accepted only if it meets **all** of the following:

- **Open source**: public, readable source. Binary-only distributions are **not** accepted.
- **Relevant**: NTE-specific, or a multi-game tool that explicitly supports Neverness to Everness.
- **Usable**: the repo has a README explaining purpose and usage; placeholder repos are **rejected**.
- **Compliant**: must **not** modify the game process, memory or network. The test is **injection**. Screen-reading + simulated input is allowed; injection, memory editing, ESP, teleport, speed hacks and private servers are **rejected**.

Not gated by: star count (0★ new projects are fine if useful), activity (archived projects are accepted with a `status` note), language, platform, or docs locale.

**De-duplication**: only one representative project per functional area, unless an alternative offers clear differentiation (cross-platform, offline, more permissive license, better performance). Priority: feature coverage > activity & documentation > cross-platform / cross-game support > stars.

**Multi-game tools**: accepted, but the description must state that it supports NTE.

## Adding a project

### Option 1 (recommended): interactive command

```bash
bun run add
```

Enter the repo (`owner/repo`), bilingual description, category and tags. The script fetches metadata and appends to `data/projects.json`.

### Option 2: edit `data/projects.json`

Append an entry:

```jsonc
{
  "id": 27,
  "name": "owner/repo",
  "description": {
    "zh-CN": "一句话说明它解决什么问题。",
    "en-US": "One sentence on what it does."
  },
  "repository": "https://github.com/owner/repo",
  "category": "Automation",
  "tags": ["Automation", "CV"],
  "license": "MIT",
  "platform": ["Windows"],
  "status": "active",
  "addedAt": "2026-09-10"
}
```

Do **not** edit `LIST.md` / `LIST.en.md` directly — they are generated.

### Categories (`category`)

`Automation` / `Calculators` / `Data` / `Assets` / `Mods` / `Performance` / `Tools`

### Format

- English entry: `- [owner/repo](https://github.com/owner/repo) - One sentence.`
- Descriptions start with a capital letter and end with a period, state what it does, not a marketing tagline.

## Pre-submit checklist

1. `bun install`
2. `bun run check` — data is valid
3. `bun run generate` — regenerate the lists
4. Confirm `LIST.md` / `LIST.en.md` are included in the same PR

## Submitting a PR

- One PR, one change (add / fix / remove).
- Describe the problem the project solves and which criteria it meets.
- Respect reviewer decisions; you may add context and resubmit.

## Removal or fixes

Open an Issue explaining the reason (broken link, unmaintained, ToS/legal concern, etc.) and we will act promptly.
