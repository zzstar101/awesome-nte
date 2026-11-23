import { X } from "lucide-react";
import { CATEGORY_META, type CategoryKey, type Lang } from "@/data/catalog";

interface CategoryBannerProps {
  category: CategoryKey;
  lang: Lang;
  count: number;
  onClear: () => void;
}

export function CategoryBanner({
  category,
  lang,
  count,
  onClear,
}: CategoryBannerProps) {
  const meta = CATEGORY_META[category];

  return (
    <div
      key={category}
      className="nte-banner-slide mb-4 flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] shadow-[4px_4px_0_0_var(--nte-shadow)]"
    >
      <div className="flex min-w-0 flex-1 items-stretch">
        {/* Slanted Category Accent Block */}
        <div
          className="flex shrink-0 items-center justify-center border-r-2 border-[#171824] px-4 py-3 font-mono-code text-xs font-extrabold"
          style={{ backgroundColor: meta.accent, color: meta.accentText }}
        >
          {meta.code}
        </div>

        <div className="flex min-w-0 flex-col justify-center px-4 py-2.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-base font-bold text-[var(--nte-ink)]">
              {meta.label[lang]}
            </h2>
            <span className="rounded-md bg-[var(--nte-surface-alt)] px-1.5 py-0.5 font-mono-code text-[11px] font-bold text-[var(--nte-ink-muted)]">
              {count}
            </span>
          </div>
          <p className="truncate text-xs text-[var(--nte-ink-soft)]">
            {meta.shortDesc[lang]}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mr-3 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--nte-border-subtle)] text-[var(--nte-ink-muted)] transition-colors hover:border-[#FF2E7E] hover:bg-[#FF2E7E] hover:text-white"
        aria-label="Clear category filter"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
