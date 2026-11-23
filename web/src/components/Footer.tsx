import { useState } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { CATALOG_STATS, type Lang } from "@/data/catalog";
import { CONTRIBUTING_URL, COPY, REPO_URL } from "@/i18n/copy";
import { GhostCatIcon, NteWordmark } from "./NteGraphics";

interface FooterProps {
  lang: Lang;
  onOpenRules: () => void;
  onOpenBadges: () => void;
}

export function Footer({ lang, onOpenRules, onOpenBadges }: FooterProps) {
  const t = COPY[lang];
  const [quipIndex, setQuipIndex] = useState(0);
  const [bouncing, setBouncing] = useState(false);

  const handleCatClick = () => {
    setQuipIndex((i) => (i + 1) % t.catQuips.length);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
  };

  return (
    <footer className="mt-14 border-t-2 border-[var(--nte-border)] bg-[var(--nte-surface)]">
      {/* Thin NTE Racing Stripe Divider */}
      <div className="nte-stripe-bar h-2 w-full" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          {/* Interactive Ghost-Cat Easter Egg */}
          <div className="flex items-start gap-3.5">
            <button
              type="button"
              onClick={handleCatClick}
              className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#171824] bg-[#FFD92E] shadow-[3px_3px_0_0_#171824] transition-transform hover:-rotate-6 ${
                bouncing ? "nte-cat-bounce" : ""
              }`}
              title="Click Mint's Ghost-Cat!"
              aria-label="Mint's Ghost-Cat Easter Egg"
            >
              <GhostCatIcon blink className="h-8 w-8" bodyFill="#171824" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-[var(--nte-ink)]">
                  AWESOME
                </span>
                <NteWordmark className="h-3.5 w-auto" fill="var(--nte-ink)" />
                <span className="font-mono-code text-[10px] font-bold text-[var(--nte-ink-muted)]">
                  // SYNC {CATALOG_STATS.starsUpdatedAt}
                </span>
              </div>
              <p className="font-mono-code text-xs font-semibold text-[#FF2E7E]">
                “{t.catQuips[quipIndex]}”
              </p>
              <p className="text-xs text-[var(--nte-ink-muted)]">{t.footerTagline}</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[var(--nte-ink-soft)]">
            <button
              type="button"
              onClick={onOpenRules}
              className="inline-flex cursor-pointer items-center gap-1 hover:text-[#17E2CE]"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.navRules}
            </button>
            <button
              type="button"
              onClick={onOpenBadges}
              className="inline-flex cursor-pointer items-center gap-1 hover:text-[#FF2E7E]"
            >
              <Award className="h-3.5 w-3.5" />
              {t.navBadges}
            </button>
            <span className="opacity-30">·</span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--nte-ink)]"
            >
              {t.footerLinks.repo}
            </a>
            <a
              href={`${REPO_URL}/blob/main/${lang === "zh-CN" ? "LIST.md" : "LIST.en.md"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--nte-ink)]"
            >
              {t.footerLinks.list}
            </a>
            <a
              href={CONTRIBUTING_URL[lang]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--nte-ink)]"
            >
              {t.footerLinks.contributing}
            </a>
            <a
              href={`${REPO_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--nte-ink)]"
            >
              {t.footerLinks.license}
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--nte-border-subtle)] pt-4 text-[11px] leading-relaxed text-[var(--nte-ink-muted)]">
          {t.footerDisclaimer}
        </div>
      </div>
    </footer>
  );
}
