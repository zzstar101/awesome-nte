import { useEffect, useState } from "react";
import { Award, Github, Moon, Plus, ShieldCheck, Sun } from "lucide-react";
import logoSvg from "@repo/assets/logo.svg";
import type { Lang } from "@/data/catalog";
import { COPY, REPO_URL, SUBMIT_ISSUE_URL, type ThemeMode } from "@/i18n/copy";
import { NteWordmark } from "./NteGraphics";

interface TopNavProps {
  lang: Lang;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onOpenRules: () => void;
  onOpenBadges: () => void;
  onResetHome: () => void;
}

export function TopNav({
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  onOpenRules,
  onOpenBadges,
  onResetHome,
}: TopNavProps) {
  const t = COPY[lang];
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b-2 border-[var(--nte-border)] backdrop-blur-md"
      style={{ backgroundColor: "var(--nte-nav-bg)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand Lockup — Mint Ghost-Cat Logo */}
        <button
          type="button"
          onClick={onResetHome}
          className="group flex cursor-pointer items-center gap-2.5 text-left focus:outline-none"
          aria-label="Awesome NTE Home"
        >
          <img
            src={logoSvg}
            alt="Awesome NTE Ghost-Cat Logo"
            className="h-10 w-10 shrink-0 transition-transform duration-200 ease-out group-hover:-rotate-8 group-hover:scale-105"
          />
          <span className="flex items-center gap-1.5">
            <span className="font-display text-lg font-bold tracking-tight text-[var(--nte-ink)]">
              AWESOME
            </span>
            <span className="inline-flex items-center rounded-md border-2 border-[#171824] bg-[#17E2CE] px-1.5 py-0.5 shadow-[2px_2px_0_0_#171824] transition-transform duration-150 group-hover:translate-x-0.5">
              <NteWordmark className="h-3.5 w-auto" fill="#171824" />
            </span>
          </span>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenRules}
            className="hidden cursor-pointer items-center gap-1.5 rounded-lg border-2 border-transparent px-2.5 py-1.5 text-xs font-bold text-[var(--nte-ink-soft)] transition-colors hover:border-[var(--nte-border)] hover:bg-[var(--nte-surface)] hover:text-[var(--nte-ink)] md:inline-flex"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#17E2CE]" />
            {t.navRules}
          </button>

          <button
            type="button"
            onClick={onOpenBadges}
            className="hidden cursor-pointer items-center gap-1.5 rounded-lg border-2 border-transparent px-2.5 py-1.5 text-xs font-bold text-[var(--nte-ink-soft)] transition-colors hover:border-[var(--nte-border)] hover:bg-[var(--nte-surface)] hover:text-[var(--nte-ink)] md:inline-flex"
          >
            <Award className="h-3.5 w-3.5 text-[#FF2E7E]" />
            {t.navBadges}
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="nte-btn inline-flex h-8 cursor-pointer items-center rounded-lg bg-[var(--nte-surface)] px-2.5 font-mono-code text-xs font-bold text-[var(--nte-ink)]"
            title={lang === "zh-CN" ? "Switch to English" : "切换至简体中文"}
          >
            <span className={lang === "zh-CN" ? "text-[#FF2E7E]" : "opacity-45"}>中</span>
            <span className="mx-1 opacity-35">/</span>
            <span className={lang === "en-US" ? "text-[#17E2CE]" : "opacity-45"}>EN</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="nte-btn inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--nte-surface)] px-2.5 text-xs font-bold text-[var(--nte-ink)]"
            title={theme === "day" ? t.themeNight : t.themeDay}
          >
            {theme === "day" ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#FF6B2B]" />
                <span className="hidden sm:inline">{t.themeDay}</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#FFD92E]" />
                <span className="hidden sm:inline">{t.themeNight}</span>
              </>
            )}
          </button>

          {/* GitHub Icon Link */}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nte-btn hidden h-8 w-8 items-center justify-center rounded-lg bg-[var(--nte-surface)] text-[var(--nte-ink)] sm:inline-flex"
            aria-label="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Primary Submit CTA */}
          <a
            href={SUBMIT_ISSUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nte-btn inline-flex h-8 items-center gap-1 rounded-lg bg-[#FFD92E] px-3 text-xs font-extrabold text-[#171824] hover:bg-[#ffe159]"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.75]" />
            <span>{t.navSubmit}</span>
          </a>
        </div>
      </div>

      {/* Tri-Color NTE Scroll Progress Rail */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[3px] overflow-hidden">
        <div
          className="h-full origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${scrollProgress})`,
            background: "linear-gradient(90deg, #FFD92E 0%, #17E2CE 52%, #FF2E7E 100%)",
          }}
        />
      </div>
    </header>
  );
}
