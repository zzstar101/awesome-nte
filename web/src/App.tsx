import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  CATEGORIES,
  PROJECTS,
  type CategoryKey,
  type EnrichedProject,
  type Lang,
} from "@/data/catalog";
import { COPY, type SortMode, type ThemeMode, type ViewMode } from "@/i18n/copy";
import { TopNav } from "@/components/TopNav";
import { HeroBanner } from "@/components/HeroBanner";
import { FilterDock } from "@/components/FilterDock";
import { CategoryBanner } from "@/components/CategoryBanner";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { BadgesModal, RulesModal } from "@/components/InfoModals";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { GhostCatIcon } from "@/components/NteGraphics";

const VALID_CATEGORIES = new Set<string>(CATEGORIES.map((c) => c.key));
const VALID_SORTS = new Set<SortMode>(["curated", "stars", "newest", "name"]);

function readInitialState() {
  const params = new URLSearchParams(window.location.search);

  const urlLang = params.get("lang");
  const storedLang = localStorage.getItem("nte-lang");
  const lang: Lang =
    urlLang === "en" || urlLang === "en-US"
      ? "en-US"
      : urlLang === "zh" || urlLang === "zh-CN"
        ? "zh-CN"
        : storedLang === "en-US" || storedLang === "zh-CN"
          ? storedLang
          : "zh-CN";

  const storedTheme = localStorage.getItem("nte-theme");
  const theme: ThemeMode = storedTheme === "night" ? "night" : "day";

  const rawCat = params.get("cat") ?? "ALL";
  const selectedCategory: CategoryKey | "ALL" = VALID_CATEGORIES.has(rawCat)
    ? (rawCat as CategoryKey)
    : "ALL";

  const rawSort = params.get("sort") as SortMode | null;
  const sortMode: SortMode = rawSort && VALID_SORTS.has(rawSort) ? rawSort : "curated";

  return {
    lang,
    theme,
    query: params.get("q") ?? "",
    selectedCategory,
    selectedPlatform: params.get("platform") ?? "ALL",
    selectedTag: params.get("tag"),
    webOnly: params.get("web") === "1",
    recentOnly: params.get("new") === "1",
    sortMode,
  };
}

export function App() {
  const initial = useMemo(readInitialState, []);

  const [lang, setLang] = useState<Lang>(initial.lang);
  const [theme, setTheme] = useState<ThemeMode>(initial.theme);
  const [query, setQuery] = useState<string>(initial.query);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "ALL">(
    initial.selectedCategory,
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string | "ALL">(
    initial.selectedPlatform,
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(initial.selectedTag);
  const [webOnly, setWebOnly] = useState<boolean>(initial.webOnly);
  const [recentOnly, setRecentOnly] = useState<boolean>(initial.recentOnly);
  const [sortMode, setSortMode] = useState<SortMode>(initial.sortMode);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [detailProject, setDetailProject] = useState<EnrichedProject | null>(null);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = COPY[lang];

  // Apply theme & language to DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nte-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "zh-CN"
        ? "Awesome 异环 · 海特洛开源项目档案库"
        : "Awesome NTE · Neverness to Everness Open-Source Archive";
    localStorage.setItem("nte-lang", lang);
  }, [lang]);

  // Sync filters to URL query params cleanly
  useEffect(() => {
    const params = new URLSearchParams();
    if (lang === "en-US") params.set("lang", "en");
    if (query.trim()) params.set("q", query.trim());
    if (selectedCategory !== "ALL") params.set("cat", selectedCategory);
    if (selectedPlatform !== "ALL") params.set("platform", selectedPlatform);
    if (selectedTag) params.set("tag", selectedTag);
    if (webOnly) params.set("web", "1");
    if (recentOnly) params.set("new", "1");
    if (sortMode !== "curated") params.set("sort", sortMode);

    const qs = params.toString();
    const nextUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [lang, query, selectedCategory, selectedPlatform, selectedTag, webOnly, recentOnly, sortMode]);

  // Keyboard shortcuts: / or Cmd+K focuses search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === "/" && !isTyping && !detailProject && !rulesOpen && !badgesOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailProject, rulesOpen, badgesOpen]);

  // Base filtering (everything except category, so category badges display live counts)
  const baseFiltered = useMemo(() => {
    const tokens = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return PROJECTS.filter((p) => {
      if (tokens.length > 0 && !tokens.every((tok) => p.searchBlob.includes(tok))) {
        return false;
      }
      if (selectedPlatform !== "ALL") {
        if (!p.platform || !p.platform.includes(selectedPlatform)) return false;
      }
      if (selectedTag) {
        const lower = selectedTag.toLowerCase();
        if (!p.tags.some((tg) => tg.toLowerCase() === lower)) return false;
      }
      if (webOnly && !(p.website && p.website.length > 0)) {
        return false;
      }
      if (recentOnly && !p.isNew) {
        return false;
      }
      return true;
    });
  }, [query, selectedPlatform, selectedTag, webOnly, recentOnly]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: baseFiltered.length };
    for (const c of CATEGORIES) counts[c.key] = 0;
    for (const p of baseFiltered) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [baseFiltered]);

  const visibleProjects = useMemo(() => {
    const list =
      selectedCategory === "ALL"
        ? [...baseFiltered]
        : baseFiltered.filter((p) => p.category === selectedCategory);

    if (sortMode === "stars") {
      list.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1) || a.curationIndex - b.curationIndex);
    } else if (sortMode === "newest") {
      list.sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.id - a.id);
    } else if (sortMode === "name") {
      list.sort((a, b) => a.repoName.localeCompare(b.repoName));
    } else {
      list.sort((a, b) => a.curationIndex - b.curationIndex);
    }
    return list;
  }, [baseFiltered, selectedCategory, sortMode]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedCategory !== "ALL" ||
    selectedPlatform !== "ALL" ||
    selectedTag !== null ||
    webOnly ||
    recentOnly;

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("ALL");
    setSelectedPlatform("ALL");
    setSelectedTag(null);
    setWebOnly(false);
    setRecentOnly(false);
    setSortMode("curated");
  };

  const scrollToArchive = () => {
    document.getElementById("archive-controls")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRandomPick = useCallback(() => {
    const pool = visibleProjects.length > 0 ? visibleProjects : PROJECTS;
    if (pool.length === 0) return;
    const candidates =
      detailProject && pool.length > 1 ? pool.filter((p) => p.id !== detailProject.id) : pool;
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    if (picked) setDetailProject(picked);
  }, [visibleProjects, detailProject]);

  // Modal prev/next navigation across visible projects
  const detailIndex = detailProject
    ? visibleProjects.findIndex((p) => p.id === detailProject.id)
    : -1;

  const handlePrevProject =
    detailIndex >= 0 && visibleProjects.length > 1
      ? () => {
          const prevIdx = (detailIndex - 1 + visibleProjects.length) % visibleProjects.length;
          setDetailProject(visibleProjects[prevIdx]);
        }
      : undefined;

  const handleNextProject =
    detailIndex >= 0 && visibleProjects.length > 1
      ? () => {
          const nextIdx = (detailIndex + 1) % visibleProjects.length;
          setDetailProject(visibleProjects[nextIdx]);
        }
      : undefined;

  // Grid transition key so switching categories / sort plays a crisp staggered wave
  const listWaveKey = `${selectedCategory}-${selectedPlatform}-${selectedTag ?? ""}-${webOnly}-${recentOnly}-${sortMode}-${viewMode}`;

  return (
    <div className="min-h-screen">
      <TopNav
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((prev) => (prev === "zh-CN" ? "en-US" : "zh-CN"))}
        onToggleTheme={() => setTheme((prev) => (prev === "day" ? "night" : "day"))}
        onOpenRules={() => setRulesOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
        onResetHome={() => {
          resetFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <main>
        <HeroBanner
          lang={lang}
          onExploreClick={scrollToArchive}
          onRandomPick={handleRandomPick}
          onOpenRules={() => setRulesOpen(true)}
          onQuickFilterRecent={() => {
            setRecentOnly((prev) => !prev);
            setSortMode("newest");
            scrollToArchive();
          }}
          onQuickSortStars={() => {
            setSortMode("stars");
            scrollToArchive();
          }}
          onResetAll={() => {
            resetFilters();
            scrollToArchive();
          }}
        />

        <FilterDock
          lang={lang}
          searchInputRef={searchInputRef}
          query={query}
          onQueryChange={setQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          webOnly={webOnly}
          onToggleWebOnly={() => setWebOnly((v) => !v)}
          recentOnly={recentOnly}
          onToggleRecentOnly={() => setRecentOnly((v) => !v)}
          sortMode={sortMode}
          onSortChange={setSortMode}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          matchedCount={visibleProjects.length}
          totalCount={PROJECTS.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          onRandomPick={handleRandomPick}
        />

        {/* Archive Project Cards */}
        <section className="mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6 lg:px-8">
          {selectedCategory !== "ALL" && (
            <CategoryBanner
              category={selectedCategory}
              lang={lang}
              count={visibleProjects.length}
              onClear={() => setSelectedCategory("ALL")}
            />
          )}

          {visibleProjects.length > 0 ? (
            <div
              key={listWaveKey}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  lang={lang}
                  viewMode={viewMode}
                  activeTag={selectedTag}
                  onTagClick={(tag) =>
                    setSelectedTag((curr) =>
                      curr?.toLowerCase() === tag.toLowerCase() ? null : tag,
                    )
                  }
                  onCategoryClick={(cat) =>
                    setSelectedCategory((curr) => (curr === cat ? "ALL" : cat))
                  }
                  onOpenDetail={setDetailProject}
                />
              ))}
            </div>
          ) : (
            <div className="nte-modal-pop mx-auto my-8 max-w-lg rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] p-8 text-center shadow-[5px_5px_0_0_var(--nte-shadow)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#171824] bg-[#FFD92E] shadow-[3px_3px_0_0_#171824]">
                <GhostCatIcon blink className="h-10 w-10" bodyFill="#171824" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[var(--nte-ink)]">
                {t.emptyTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--nte-ink-soft)]">{t.emptyDesc}</p>
              <button
                type="button"
                onClick={resetFilters}
                className="nte-btn mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#17E2CE] px-4 py-2 text-xs font-extrabold text-[#171824]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.emptyReset}
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer
        lang={lang}
        onOpenRules={() => setRulesOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
      />

      <BackToTop lang={lang} />

      <ProjectModal
        project={detailProject}
        lang={lang}
        positionLabel={
          detailIndex >= 0 ? `${detailIndex + 1} / ${visibleProjects.length}` : undefined
        }
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        onClose={() => setDetailProject(null)}
        onSelectProject={(p) => setDetailProject(p)}
        onSelectTag={(tag) => setSelectedTag(tag)}
      />

      <RulesModal open={rulesOpen} lang={lang} onClose={() => setRulesOpen(false)} />
      <BadgesModal open={badgesOpen} lang={lang} onClose={() => setBadgesOpen(false)} />
    </div>
  );
}

export default App;
