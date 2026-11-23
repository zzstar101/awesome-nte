import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Dices, ShieldCheck, Sparkles, Star } from "lucide-react";
import { CATALOG_STATS, CATEGORIES, CATEGORY_META, formatStars, type Lang } from "@/data/catalog";
import { COPY, SUBMIT_ISSUE_URL } from "@/i18n/copy";
import { AnimatedCatLogo, CrossSparkle, GhostCatIcon, NteWordmark } from "./NteGraphics";

function useCountUp(target: number, durationMs = 760): number {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || target <= 0) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    setValue(0);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return value;
}

interface HeroBannerProps {
  lang: Lang;
  onExploreClick: () => void;
  onRandomPick: () => void;
  onOpenRules: () => void;
  onQuickFilterRecent: () => void;
  onQuickSortStars: () => void;
  onResetAll: () => void;
}

export function HeroBanner({
  lang,
  onExploreClick,
  onRandomPick,
  onOpenRules,
  onQuickFilterRecent,
  onQuickSortStars,
  onResetAll,
}: HeroBannerProps) {
  const t = COPY[lang];

  const projectsCount = useCountUp(CATALOG_STATS.totalProjects, 680);
  const categoriesCount = useCountUp(CATALOG_STATS.totalCategories, 540);
  const starsCount = useCountUp(CATALOG_STATS.totalStars, 860);
  const recentCount = useCountUp(CATALOG_STATS.recentCount, 680);

  const [catPingKey, setCatPingKey] = useState(0);
  const [catBouncing, setCatBouncing] = useState(false);
  const [quipIndex, setQuipIndex] = useState<number | null>(null);
  const hideBubbleTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hideBubbleTimer.current !== null) window.clearTimeout(hideBubbleTimer.current);
    };
  }, []);

  const handleCatTap = () => {
    setCatPingKey((k) => k + 1);
    setCatBouncing(true);
    setQuipIndex((prev) => (prev === null ? 0 : (prev + 1) % t.catQuips.length));
    window.setTimeout(() => setCatBouncing(false), 430);
    if (hideBubbleTimer.current !== null) window.clearTimeout(hideBubbleTimer.current);
    hideBubbleTimer.current = window.setTimeout(() => setQuipIndex(null), 3400);
  };

  return (
    <section className="nte-hero-enter mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 sm:pt-8 lg:px-8">
      <div className="overflow-hidden rounded-2xl border-2 border-[var(--nte-border)] shadow-[6px_6px_0_0_var(--nte-shadow)]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Main Editorial Billboard (Deep Midnight Ink) */}
          <div className="relative overflow-hidden bg-[#171824] p-6 text-white sm:p-8 lg:col-span-8 lg:p-10">
            {/* Ambient Halftone Corner */}
            <div
              className="nte-halftone-mint pointer-events-none absolute -top-6 -right-6 h-52 w-52 opacity-75"
              aria-hidden="true"
            />
            {/* Decorative Diagonal Racing Slashes */}
            <div
              className="pointer-events-none absolute top-0 right-10 hidden h-full w-4 -skew-x-18 bg-[#FF2E7E]/25 sm:block"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 right-16 hidden h-full w-2 -skew-x-18 bg-[#17E2CE]/35 sm:block"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-6">
              {/* Kicker Badge + Live Cat Scan Toast */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#17E2CE]/50 bg-[#17E2CE]/15 px-3 py-1 font-mono-code text-[11px] font-bold tracking-wider text-[#3CF0DE]">
                  <span className="nte-pulse-dot h-2 w-2 rounded-full bg-[#17E2CE]" />
                  {t.heroKicker}
                </span>
                {quipIndex !== null ? (
                  <span
                    key={catPingKey}
                    className="nte-bubble-in inline-flex items-center gap-1.5 rounded-full border-2 border-[#171824] bg-[#FFD92E] px-3 py-0.5 font-mono-code text-[11px] font-extrabold text-[#171824] shadow-[2.5px_2.5px_0_0_#FF2E7E]"
                  >
                    <GhostCatIcon className="h-3.5 w-3.5 shrink-0" bodyFill="#171824" />
                    <span>{t.catQuips[quipIndex]}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono-code text-[11px] font-semibold text-white/75">
                    <GhostCatIcon className="h-3.5 w-3.5" bodyFill="#FFD92E" />
                    NEVERNESS TO EVERNESS
                  </span>
                )}
              </div>

              {/* Title + Interactive Mint Ghost-Cat Logo Sticker */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative w-fit shrink-0">
                  {/* Radar scan ping ring when clicked */}
                  {catPingKey > 0 && (
                    <span
                      key={catPingKey}
                      className="nte-radar-ping pointer-events-none absolute -inset-1 rounded-3xl border-[3px] border-[#17E2CE]"
                      aria-hidden="true"
                    />
                  )}

                  <button
                    type="button"
                    onClick={handleCatTap}
                    title={t.catHeroHint}
                    aria-label={t.catHeroHint}
                    className={`group/cat relative block cursor-pointer rounded-[26px] border-[3px] border-white bg-[#171824] p-0.5 shadow-[5px_5px_0_0_#FF2E7E] transition-shadow duration-200 hover:shadow-[7px_7px_0_0_#17E2CE] focus:outline-none ${
                      catBouncing ? "nte-cat-bounce" : "nte-cat-float"
                    }`}
                  >
                    <AnimatedCatLogo className="h-[86px] w-[86px] sm:h-[98px] sm:w-[98px]" />
                  </button>

                  <CrossSparkle
                    twinkle
                    className="pointer-events-none absolute -top-3.5 -right-3.5 h-7 w-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    outerFill="#FF2E7E"
                    innerFill="#FFFFFF"
                  />
                  <CrossSparkle
                    twinkle
                    className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-5 w-5"
                    outerFill="#17E2CE"
                    innerFill="#FFFFFF"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h1 className="font-display text-4xl leading-none font-bold tracking-tight text-white italic sm:text-5xl">
                      AWESOME
                    </h1>
                    <span className="group/wordmark relative inline-flex items-center">
                      <span
                        className="pointer-events-none absolute translate-x-[3px] translate-y-[3px] opacity-90 transition-transform duration-200 group-hover/wordmark:translate-x-[5px] group-hover/wordmark:translate-y-[4px]"
                        aria-hidden="true"
                      >
                        <NteWordmark className="h-9 w-auto sm:h-11" fill="#FF2E7E" />
                      </span>
                      <NteWordmark className="relative h-9 w-auto sm:h-11" fill="#17E2CE" />
                    </span>
                  </div>
                  <p className="font-display text-base font-bold tracking-wide text-[#FFD92E] sm:text-lg">
                    {t.siteSubtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="max-w-2xl text-sm leading-relaxed text-[#cfd5e8] sm:text-[15px]">
                {t.heroDesc}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="nte-btn inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#171824] bg-[#17E2CE] px-4 py-2.5 text-sm font-extrabold text-[#171824] shadow-[3px_3px_0_0_#FFD92E] hover:bg-[#3cf0de]"
                >
                  <span>{t.heroCtaExplore}</span>
                  <ArrowDown className="h-4 w-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={onRandomPick}
                  className="nte-btn group/dice inline-flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-[#171824] bg-[#FFD92E] px-4 py-2.5 text-sm font-extrabold text-[#171824] shadow-[3px_3px_0_0_#FF2E7E] hover:bg-[#ffe159]"
                >
                  <Dices className="h-4 w-4 transition-transform duration-200 group-hover/dice:rotate-18" />
                  <span>{t.heroCtaRandom}</span>
                </button>

                <a
                  href={SUBMIT_ISSUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nte-btn inline-flex items-center gap-1.5 rounded-xl border-2 border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#000000] hover:border-[#FFD92E] hover:bg-white/15"
                >
                  <span>{t.heroCtaSubmit}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenRules}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/20 px-3.5 py-2.5 text-xs font-bold text-white/80 transition-colors hover:border-[#FF2E7E] hover:text-white"
                >
                  <ShieldCheck className="h-4 w-4 text-[#FF2E7E]" />
                  <span>{t.heroCtaRules}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Pop-Yellow Terminal Telemetry Panel */}
          <div className="relative flex flex-col justify-between border-t-4 border-[#FF2E7E] bg-[#FFD92E] p-6 text-[#171824] lg:col-span-4 lg:border-t-0 lg:border-l-[6px]">
            <div className="nte-halftone-light pointer-events-none absolute inset-0 opacity-85" aria-hidden="true" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#171824] pb-2.5">
                <span className="font-mono-code text-xs font-extrabold tracking-widest uppercase">
                  EIBON // TELEMETRY
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#171824] bg-[#171824] px-2 py-0.5 font-mono-code text-[10px] font-bold text-[#17E2CE]">
                  <span className="nte-pulse-dot h-1.5 w-1.5 rounded-full bg-[#17E2CE]" />
                  LIVE DATA
                </span>
              </div>

              {/* 2x2 Interactive Stat Stickers with Count-Up */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onResetAll}
                  className="group cursor-pointer rounded-xl border-2 border-[#171824] bg-white p-3 text-left shadow-[3px_3px_0_0_#171824] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#171824]"
                >
                  <div className="font-mono-code text-[11px] font-bold text-[#5a5f75]">
                    {t.statProjects}
                  </div>
                  <div className="mt-1 font-display text-3xl leading-none font-bold text-[#171824] tabular-nums">
                    {projectsCount}
                  </div>
                </button>

                <div className="rounded-xl border-2 border-[#171824] bg-white p-3 shadow-[3px_3px_0_0_#171824]">
                  <div className="font-mono-code text-[11px] font-bold text-[#5a5f75]">
                    {t.statCategories}
                  </div>
                  <div className="mt-1 flex items-end justify-between">
                    <span className="font-display text-3xl leading-none font-bold text-[#171824] tabular-nums">
                      {categoriesCount}
                    </span>
                    <span className="flex gap-1 pb-0.5" aria-hidden="true">
                      {CATEGORIES.map((c) => (
                        <span
                          key={c.key}
                          className="h-3 w-1.5 rounded-full border border-[#171824]"
                          style={{ backgroundColor: CATEGORY_META[c.key].accent }}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onQuickSortStars}
                  className="group cursor-pointer rounded-xl border-2 border-[#171824] bg-white p-3 text-left shadow-[3px_3px_0_0_#171824] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#171824]"
                >
                  <div className="flex items-center justify-between font-mono-code text-[11px] font-bold text-[#5a5f75]">
                    <span>{t.statStars}</span>
                    <Star className="h-3.5 w-3.5 fill-[#FFD92E] text-[#171824] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <div className="mt-1 font-display text-3xl leading-none font-bold text-[#171824] tabular-nums">
                    {formatStars(starsCount)}+
                  </div>
                </button>

                <button
                  type="button"
                  onClick={onQuickFilterRecent}
                  className="group relative cursor-pointer rounded-xl border-2 border-[#171824] bg-[#171824] p-3 text-left text-white shadow-[3px_3px_0_0_#FF2E7E] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#17E2CE]"
                >
                  <div className="flex items-center justify-between font-mono-code text-[11px] font-bold text-[#3CF0DE]">
                    <span>{t.statRecent}</span>
                    <Sparkles className="h-3.5 w-3.5 text-[#FF2E7E] transition-transform duration-200 group-hover:scale-125" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl leading-none font-bold text-[#FFD92E] tabular-nums">
                      +{recentCount}
                    </span>
                    <span className="font-mono-code text-[10px] text-white/70">
                      {CATALOG_STATS.latestAddedDate.slice(5)}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Sync Footnote */}
            <div className="relative z-10 mt-5 flex items-center justify-between border-t-2 border-[#171824]/25 pt-3 font-mono-code text-[11px] font-bold text-[#171824]">
              <span>
                {t.statSynced}: {CATALOG_STATS.starsUpdatedAt}
              </span>
              <span className="rounded bg-[#171824] px-1.5 py-0.5 text-[10px] text-[#FFD92E]">
                ZERO INJECTION
              </span>
            </div>
          </div>
        </div>

        {/* Sleek Racing Ticker Strip */}
        <div className="nte-marquee-wrap relative overflow-hidden border-t-2 border-[var(--nte-border)] bg-[#171824] py-1.5 text-white">
          <div className="nte-marquee-track items-center gap-8 font-mono-code text-[11px] font-bold tracking-wider uppercase">
            {[...t.tickerItems, ...t.tickerItems].map((item, idx) => (
              <span key={idx} className="inline-flex shrink-0 items-center gap-3">
                <span className={idx % 2 === 0 ? "text-[#17E2CE]" : "text-[#FFD92E]"}>{item}</span>
                <span className="text-[#FF2E7E]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
