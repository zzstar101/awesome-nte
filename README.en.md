<div align="center">
  <a href="https://zzstar101.github.io/awesome-nte/?lang=en">
    <img src="assets/logo.svg" width="132" height="132" alt="Awesome NTE">
  </a>
  <p style="font-size: 38px; font-weight: 800; letter-spacing: 1px; margin: 12px 0 4px;">Awesome NTE</p>
  <p style="color:#59636e; margin: 0 0 16px;">Hethereau Community Open-Source Archive · Neverness to Everness</p>
</div>

<p align="center">
  <a href="https://github.com/sindresorhus/awesome"><img src="assets/badge.svg" alt="Awesome NTE"></a>
</p>

<p align="center">
  <a href="https://zzstar101.github.io/awesome-nte/?lang=en"><img src="https://img.shields.io/badge/Website-zzstar101.github.io/awesome--nte-FF2E7E?labelColor=171824" alt="Online Website"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-3CF0DE?labelColor=171824" alt="License"></a>
  <!-- PROJECTS_COUNT_START -->
  <img src="https://img.shields.io/badge/projects-35-FFD92E?label=Projects&labelColor=171824" alt="Projects">
  <!-- PROJECTS_COUNT_END -->
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <strong>English</strong>
  &nbsp;|&nbsp;
  <a href="https://zzstar101.github.io/awesome-nte/?lang=en">Website</a> ·
  <a href="./LIST.en.md">Full List</a> ·
  <a href="#inclusion-criteria">Inclusion Criteria</a> ·
  <a href="./CONTRIBUTING.en.md">Contributing</a>
</p>

> A curated index of third-party **open-source** GitHub projects for *Neverness to Everness* (NTE) — covering vision-based automation, calculators & build planners, analytics, asset tools, mods, graphics tweaks, and utilities. Strictly open-source with zero memory injection or private servers.

---

## Online Web Archive

Browse, search, and filter every listed tool on the interactive NTE-themed website:

**👉 [https://zzstar101.github.io/awesome-nte/?lang=en](https://zzstar101.github.io/awesome-nte/?lang=en)**

- **NTE Visual Identity**: Switch between Daybreak Street-Pop & Midnight Hethereau themes, plus instant `中 / EN` localization.
- **Fast Multi-Facet Discovery**: Press `/` or `⌘K` for instant full-text search across names, authors, tags and bilingual summaries; combine filters by category, platform, popular tags, website availability, and latest batch.
- **Flexible Views & Exploration**: Sort by curated order, GitHub stars, newest additions, or A–Z; switch between Card Grid and Compact List; roll a random tool or browse case-file modals with arrow keys; shareable URL query state.
- **Always Up to Date**: Built directly from `data/projects.json` and `data/stars.json`, auto-deployed via GitHub Pages on updates and daily star syncs.

Prefer plain Markdown? See **[LIST.en.md](./LIST.en.md)** (Chinese: **[LIST.md](./LIST.md)**).

> Both `LIST.*` and the website are generated from `data/projects.json` as the single source of truth. Do not edit `LIST.*` manually.

---

## Categories

| Category | Scope | Browse |
| :--- | :--- | :--- |
| **Automation & Bots** | Screen-reading helpers, daily check-ins, farming, fishing & hobbies (no injection) | [View List](./LIST.en.md#automation--bots) |
| **Calculators & Planners** | Progression, gear optimizers, damage math, gacha simulators, teams & cafe planners | [View List](./LIST.en.md#calculators--planners) |
| **Data & Analytics** | Gacha history exporters, event ROI charts, network & traffic research | [View List](./LIST.en.md#data--analytics) |
| **Assets & Datamining** | Extracted game assets, Blender model importers & Spine video converters | [View List](./LIST.en.md#assets--datamining) |
| **Mods & Customization** | Mod managers, custom BAGEL photo tools & in-game radio track swappers | [View List](./LIST.en.md#mods--customization) |
| **Performance & Graphics** | Visual/performance config collections & native UE HDR panels | [View List](./LIST.en.md#performance--graphics) |
| **Tools & Integrations** | Interactive maps, launchers, chatbots, music players, overlays & modding bridges | [View List](./LIST.en.md#tools--integrations) |

---

## Inclusion Criteria

This repository curates **valuable** open-source projects for *Neverness to Everness* under 4 strict rules:

1. **Open Source**: Publicly readable source code is mandatory; closed-source binaries or placeholder repos are rejected.
2. **NTE Relevant**: Purpose-built for NTE, or a mature multi-game tool that explicitly supports NTE.
3. **Usable & Documented**: Includes a clear README explaining purpose and usage; empty shells are omitted.
4. **Zero Injection**: Must not modify game process, memory, or network traffic. **Bright-line rule = injection.** Screen-reading + simulated input (e.g., MaaNTE, ok-nte) is allowed; cheats, memory editors, ESP, teleport, speed hacks, and private servers are strictly excluded.

Entries are also **de-duplicated** per functional niche: one representative project per niche unless another provides clear differentiation.

**Ranking Priority**: feature coverage > maintenance activity & documentation > cross-platform / multi-game support > stars.

---

## Contributing

Open-source your project, add a logo, spot a broken link, or suggest an addition via the [Submit Project Form](https://github.com/zzstar101/awesome-nte/issues/new?template=add-project.yml) or Pull Request. Developers can also edit `data/projects.json` directly and run the check/generate scripts — see **[CONTRIBUTING.en.md](./CONTRIBUTING.en.md)** for full details.

---

## Badges

If your open-source project is listed in **awesome-nte**, feel free to showcase an NTE sticker badge in your README (also one-click copyable from the website's **Badges** dialog):

[![Listed in Awesome NTE](assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)

```markdown
[![Listed in Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)
```

Compact version:

[![Awesome NTE](assets/badge.svg)](https://github.com/zzstar101/awesome-nte)

```markdown
[![Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge.svg)](https://github.com/zzstar101/awesome-nte)
```

---

## Development

Data scripts and the static site (`web/`) are powered by **Bun**:

```bash
bun install        # install root script dependencies
bun run check      # validate data/projects.json
bun run generate   # generate LIST.md / LIST.en.md & sync README count badge
bun run stars      # refresh GitHub star snapshot in data/stars.json
bun run add        # interactive project entry wizard

# Local website dev & production build
(cd web && bun install)
bun run web:dev    # launch local dev server (http://127.0.0.1:4173)
bun run web:build  # TypeScript check + production bundle in web/dist
```

Automation workflows:
- **CI** (`.github/workflows/ci.yml`): validates data and verifies generated `LIST.*` on PRs & pushes.
- **Stars** (`.github/workflows/stars.yml`): refreshes `data/stars.json` daily.
- **Links** (`.github/workflows/links.yml`): checks for dead links weekly.
- **Deploy Pages** (`.github/workflows/deploy.yml`): automatically builds and publishes the web archive to GitHub Pages on `main` pushes and after daily star syncs.
- **AI Triage & Auto PR** (`.github/workflows/triage-submission.yml`): automatically inspects submitted project Issues, extracts metadata & logos, runs AI compliance/dedup triage with labels, and opens a ready-to-merge PR when approved.

---

## Roadmap

- [x] Launch interactive NTE-styled web archive (bilingual toggle, Day/Night themes, multi-facet filters, star sorting & case-file modals).
- [ ] Enrich `stars.json` metadata (last pushed date, primary language, archive status) for richer activity filters.
- [ ] Keep curating new community projects while auditing compliance and bilingual descriptions.

---

## Disclaimer

- This project is a **community-maintained third-party index**. It is not affiliated with or endorsed by the developers, publisher, or any associated companies of *Neverness to Everness* (e.g., Hotta Studio / Perfect World).
- No guarantee is made regarding the functionality, security, stability, or legality of any listed project. Inclusion is not an endorsement.
- Some projects (especially automation, bots, and mods) may violate the game's ToS or EULA and lead to account restrictions or bans. Use at your own risk.
- All names, trademarks, artwork, and game data of *Neverness to Everness* belong to their respective owners. This repository is a non-commercial community index.
- If a rights holder believes any entry is inappropriate, please open an [Issue](https://github.com/zzstar101/awesome-nte/issues) and it will be removed after verification.
