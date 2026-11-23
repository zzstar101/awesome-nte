import {
  ArrowUpDown,
  Dices,
  Globe,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import type { RefObject } from "react";
import {
  AVAILABLE_PLATFORMS,
  CATEGORIES,
  CATEGORY_META,
  POPULAR_TAGS,
  type CategoryKey,
  type Lang,
} from "@/data/catalog";
import { COPY, type SortMode, type ViewMode } from "@/i18n/copy";

interface FilterDockProps {
  lang: Lang;
  searchInputRef: RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (val: string) => void;
  selectedCategory: CategoryKey | "ALL";
  onSelectCategory: (cat: CategoryKey | "ALL") => void;
  categoryCounts: Record<string, number>;
  selectedPlatform: string | "ALL";
  onSelectPlatform: (plat: string | "ALL") => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  webOnly: boolean;
  onToggleWebOnly: () => void;
  recentOnly: boolean;
  onToggleRecentOnly: () => void;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  matchedCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onRandomPick: () => void;
}

export function FilterDock({
  lang,
  searchInputRef,
  query,
  onQueryChange,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  selectedPlatform,
  onSelectPlatform,
  selectedTag,
  onSelectTag,
  webOnly,
  onToggleWebOnly,
  recentOnly,
  onToggleRecentOnly,
  sortMode,
  onSortChange,
  viewMode,
  onViewModeChange,
  matchedCount,
  totalCount,
  hasActiveFilters,
  onResetFilters,
  onRandomPick,
}: FilterDockProps) {
  const t = COPY[lang];

  return (
    <section
      id="archive-controls"
      className="mx-auto max-w-7xl px-4 pt-2 pb-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] p-4 shadow-[4px_4px_0_0_var(--nte-shadow)] sm:p-5">
        {/* Row 1: Search Input + Sort + View Mode + Random */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--nte-ink-muted)]" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-11 w-full rounded-xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface-muted)] pr-20 pl-10 text-sm font-medium text-[var(--nte-ink)] placeholder:text-[var(--nte-ink-muted)] transition-shadow focus:border-[#17E2CE] focus:shadow-[0_0_0_3px_rgba(23,226,206,0.28)] focus:outline-none"
            />
            <div className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center gap-1.5">
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-[var(--nte-surface-alt)] text-[var(--nte-ink)] transition-colors hover:bg-[#FF2E7E] hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <kbd className="hidden rounded border border-[var(--nte-border-subtle)] bg-[var(--nte-surface)] px-1.5 py-0.5 font-mono-code text-[11px] font-bold text-[var(--nte-ink-muted)] sm:inline-block">
                  /
                </kbd>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Select */}
            <div className="relative inline-flex h-11 items-center rounded-xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface-muted)] px-3">
              <ArrowUpDown className="mr-2 h-3.5 w-3.5 shrink-0 text-[#FF2E7E]" />
              <label htmlFor="nte-sort" className="sr-only">
                {t.sortLabel}
              </label>
              <select
                id="nte-sort"
                value={sortMode}
                onChange={(e) => onSortChange(e.target.value as SortMode)}
                className="cursor-pointer bg-transparent pr-1 text-xs font-bold text-[var(--nte-ink)] focus:outline-none"
              >
                <option value="curated" className="bg-[var(--nte-surface)] text-[var(--nte-ink)]">
                  {t.sortCurated}
                </option>
                <option value="stars" className="bg-[var(--nte-surface)] text-[var(--nte-ink)]">
                  {t.sortStars}
                </option>
                <option value="newest" className="bg-[var(--nte-surface)] text-[var(--nte-ink)]">
                  {t.sortNewest}
                </option>
                <option value="name" className="bg-[var(--nte-surface)] text-[var(--nte-ink)]">
                  {t.sortName}
                </option>
              </select>
            </div>

            {/* Grid / List View Switcher */}
            <div className="inline-flex h-11 items-center rounded-xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface-muted)] p-1">
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#171824] text-[#FFD92E]"
                    : "text-[var(--nte-ink-muted)] hover:text-[var(--nte-ink)]"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#171824] text-[#17E2CE]"
                    : "text-[var(--nte-ink-muted)] hover:text-[var(--nte-ink)]"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Random Discovery Dice Button */}
            <button
              type="button"
              onClick={onRandomPick}
              disabled={matchedCount === 0}
              title={t.randomTooltip}
              aria-label={t.randomTooltip}
              className="nte-btn group inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#FFD92E] text-[#171824] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Dices className="h-4 w-4 transition-transform duration-200 group-hover:rotate-18" />
            </button>
          </div>
        </div>

        {/* Row 2: 7 Category Pop Pills */}
        <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          <button
            type="button"
            onClick={() => onSelectCategory("ALL")}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
              selectedCategory === "ALL"
                ? "border-[#171824] bg-[#171824] text-[#FFD92E] shadow-[3px_3px_0_0_#17E2CE]"
                : "border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] text-[var(--nte-ink-soft)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
            }`}
          >
            <span>{t.allCategories}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 font-mono-code text-[11px] ${
                selectedCategory === "ALL"
                  ? "bg-white/15 text-white"
                  : "bg-[var(--nte-surface-alt)] text-[var(--nte-ink-muted)]"
              }`}
            >
              {categoryCounts.ALL ?? totalCount}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat.key];
            const active = selectedCategory === cat.key;
            const count = categoryCounts[cat.key] ?? 0;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onSelectCategory(active ? "ALL" : cat.key)}
                style={
                  active
                    ? {
                        backgroundColor: meta.accent,
                        color: meta.accentText,
                        borderColor: "#171824",
                        boxShadow: "3px 3px 0 0 #171824",
                      }
                    : undefined
                }
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                  active
                    ? "-translate-x-0.5 -translate-y-0.5"
                    : "border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] text-[var(--nte-ink-soft)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-[#171824]"
                  style={{ backgroundColor: active ? "#171824" : meta.accent }}
                />
                <span>{meta.label[lang]}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 font-mono-code text-[11px] ${
                    active
                      ? "bg-[#171824]/15 font-extrabold"
                      : "bg-[var(--nte-surface-alt)] text-[var(--nte-ink-muted)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Platforms + Quick Toggles + Match Summary */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--nte-border-subtle)] pt-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectPlatform("ALL")}
              className={`cursor-pointer rounded-lg border px-2.5 py-1 font-mono-code text-[11px] font-bold transition-colors ${
                selectedPlatform === "ALL"
                  ? "border-[var(--nte-border)] bg-[var(--nte-ink)] text-[var(--nte-surface)]"
                  : "border-[var(--nte-border-subtle)] text-[var(--nte-ink-muted)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
              }`}
            >
              {t.platformAll}
            </button>
            {AVAILABLE_PLATFORMS.map((plat) => {
              const active = selectedPlatform === plat;
              return (
                <button
                  key={plat}
                  type="button"
                  onClick={() => onSelectPlatform(active ? "ALL" : plat)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1 font-mono-code text-[11px] font-bold transition-colors ${
                    active
                      ? "border-[#171824] bg-[#17E2CE] text-[#171824]"
                      : "border-[var(--nte-border-subtle)] text-[var(--nte-ink-muted)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
                  }`}
                >
                  {plat}
                </button>
              );
            })}

            <span className="mx-1 hidden h-4 w-px bg-[var(--nte-border-subtle)] sm:inline-block" />

            <button
              type="button"
              onClick={onToggleWebOnly}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                webOnly
                  ? "border-[#171824] bg-[#FFD92E] text-[#171824]"
                  : "border-[var(--nte-border-subtle)] text-[var(--nte-ink-muted)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
              }`}
            >
              <Globe className="h-3 w-3" />
              {t.filterWebOnly}
            </button>

            <button
              type="button"
              onClick={onToggleRecentOnly}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                recentOnly
                  ? "border-[#171824] bg-[#FF2E7E] text-white"
                  : "border-[var(--nte-border-subtle)] text-[var(--nte-ink-muted)] hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              {t.filterRecentOnly}
            </button>

            {selectedTag && (
              <button
                type="button"
                onClick={() => onSelectTag(null)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border-2 border-[#171824] bg-[#8B5CF6] px-2.5 py-0.5 font-mono-code text-[11px] font-bold text-white"
              >
                <Tag className="h-3 w-3" />
                {t.tagFilterPrefix}: #{selectedTag}
                <X className="ml-0.5 h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 font-mono-code text-xs">
            <span className="inline-flex items-center gap-2 text-[var(--nte-ink-muted)]">
              <span
                className={`h-2 w-2 rounded-full ${
                  matchedCount > 0 ? "nte-pulse-dot bg-[#17E2CE]" : "bg-[#FF2E7E]"
                }`}
              />
              <span>
                {t.showingPrefix}{" "}
                <strong className="text-[var(--nte-ink)]">{matchedCount}</strong> / {totalCount}{" "}
                <span className="hidden sm:inline">{t.showingUnit}</span>
              </span>
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[#FF2E7E] bg-[#FF2E7E]/10 px-2.5 py-1 text-[11px] font-bold text-[#FF2E7E] transition-colors hover:bg-[#FF2E7E] hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                {t.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* Popular Tags Quick Strip */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar sm:flex-wrap sm:overflow-visible">
          <span className="shrink-0 font-mono-code text-[10px] font-bold tracking-wider text-[var(--nte-ink-muted)] uppercase">
            {t.popularTagsLabel}:
          </span>
          {POPULAR_TAGS.map(({ tag }) => {
            const active = selectedTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag(active ? null : tag)}
                className={`shrink-0 cursor-pointer rounded-md px-2 py-0.5 font-mono-code text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-[#171824] text-[#FFD92E]"
                    : "bg-[var(--nte-surface-alt)] text-[var(--nte-ink-soft)] hover:bg-[#17E2CE]/25 hover:text-[var(--nte-ink)]"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
