import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AlertTriangle, Award, Check, Copy, ShieldCheck, X } from "lucide-react";
import badgeListedSvg from "@repo/assets/badge-listed.svg";
import badgeCompactSvg from "@repo/assets/badge.svg";
import type { Lang } from "@/data/catalog";
import { COPY } from "@/i18n/copy";

const LISTED_MD =
  "[![Listed in Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)";
const COMPACT_MD =
  "[![Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge.svg)](https://github.com/zzstar101/awesome-nte)";

/**
 * Code block with a custom draggable "Long Mint Ghost-Cat" horizontal scrollbar.
 * Keeps the cat head & tail razor-sharp while the middle torso stretches cleanly.
 */
function LongCatCodeBox({ code }: { code: string }) {
  const scrollRef = useRef<HTMLPreElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbWidthPct, setThumbWidthPct] = useState(42);
  const [thumbLeftPct, setThumbLeftPct] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(true);
  const [dragging, setDragging] = useState(false);

  const dragStateRef = useRef<{
    startX: number;
    startScrollLeft: number;
    trackPx: number;
    maxScroll: number;
    thumbPx: number;
  } | null>(null);

  const syncFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    if (maxScroll <= 1) {
      setIsOverflowing(false);
      setThumbWidthPct(100);
      setThumbLeftPct(0);
      return;
    }
    setIsOverflowing(true);
    const ratio = clientWidth / scrollWidth;
    // Keep long-cat body comfortably proportioned between 32% and 78% of track width
    const widthPct = Math.min(78, Math.max(32, ratio * 100));
    const progress = scrollLeft / maxScroll;
    setThumbWidthPct(widthPct);
    setThumbLeftPct(progress * (100 - widthPct));
  }, []);

  useEffect(() => {
    syncFromScroll();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(syncFromScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncFromScroll, code]);

  const handleThumbPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 0) return;

    const trackRect = track.getBoundingClientRect();
    const thumbPx = (thumbWidthPct / 100) * trackRect.width;
    dragStateRef.current = {
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      trackPx: trackRect.width,
      maxScroll,
      thumbPx,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleThumbPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    const el = scrollRef.current;
    if (!state || !el) return;

    const usableTrack = Math.max(1, state.trackPx - state.thumbPx);
    const deltaX = e.clientX - state.startX;
    const nextScroll = state.startScrollLeft + (deltaX / usableTrack) * state.maxScroll;
    el.scrollLeft = Math.max(0, Math.min(state.maxScroll, nextScroll));
  };

  const handleThumbPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current) {
      dragStateRef.current = null;
      setDragging(false);
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
  };

  const handleTrackClick = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 0) return;

    const rect = track.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.scrollTo({ left: clickRatio * maxScroll, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#171824] bg-[#171824] shadow-[2.5px_2.5px_0_0_#171824]">
      <pre
        ref={scrollRef}
        onScroll={syncFromScroll}
        className="no-scrollbar overflow-x-auto px-3 pt-2.5 pb-2 font-mono-code text-[11px] leading-relaxed text-[#3CF0DE]"
      >
        <code>{code}</code>
      </pre>

      {/* Custom Long Mint Ghost-Cat Horizontal Scrollbar */}
      {isOverflowing && (
        <div className="border-t-2 border-[#171824] bg-[#FFD92E] px-2 py-1.5 nte-halftone-light select-none">
          <div
            ref={trackRef}
            onPointerDown={handleTrackClick}
            className="relative h-6 w-full cursor-pointer rounded-full border-[1.5px] border-[#171824]/30 bg-white/45"
            role="scrollbar"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              thumbWidthPct < 100 ? (thumbLeftPct / (100 - thumbWidthPct)) * 100 : 0,
            )}
          >
            {/* Long Ghost-Cat Thumb */}
            <div
              onPointerDown={handleThumbPointerDown}
              onPointerMove={handleThumbPointerMove}
              onPointerUp={handleThumbPointerUp}
              onPointerCancel={handleThumbPointerUp}
              style={{
                width: `${thumbWidthPct}%`,
                left: `${thumbLeftPct}%`,
              }}
              className={`group/longcat absolute top-1/2 flex h-6 -translate-y-1/2 items-center transition-[filter] duration-150 ${
                dragging
                  ? "cursor-grabbing drop-shadow-[0_0_6px_#FF2E7E]"
                  : "cursor-grab hover:drop-shadow-[0_0_5px_#17E2CE]"
              }`}
              title="拖动长条薄荷猫查看完整代码"
            >
              {/* Cat Head (left, non-distorted crisp SVG) */}
              <svg
                viewBox="0 0 26 24"
                className="h-6 w-[26px] shrink-0 overflow-visible"
                fill="none"
                aria-hidden="true"
              >
                {/* Head + ears merging seamlessly into right torso */}
                <path
                  d="M 26 6.2 L 17.8 6.2 L 16.4 2.8 C 15.8 1.4 14.3 1.4 13.5 2.7 L 11.7 5.5 C 10.3 5.2 8.7 5.3 7.4 5.8 L 5.6 2.9 C 4.8 1.6 3.3 1.7 2.8 3.1 C 1.8 5.6 1.5 8.5 2.2 11.2 C 1.1 12.6 1.2 14.8 2.4 16.3 C 3.6 17.7 5.4 18.2 7.2 17.8 C 8.8 18.8 10.8 19.2 13.0 19.2 L 26 19.2 Z"
                  fill="#171824"
                />
                {/* Cute front paw */}
                <ellipse cx="18.5" cy="19.6" rx="2.6" ry="1.8" fill="#171824" />
                <ellipse cx="18.5" cy="19.8" rx="1.1" ry="0.7" fill="#FF2E7E" opacity="0.85" />
                {/* Ringed eyes (with gentle blink!) */}
                <circle
                  cx="7.0"
                  cy="11.0"
                  r="2.15"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  className="nte-cat-eye"
                />
                <circle
                  cx="13.5"
                  cy="11.0"
                  r="2.15"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  className="nte-cat-eye"
                />
                {/* Iconic pink triangle mouth */}
                <path d="M 8.8 14.9 L 10.25 12.7 L 11.7 14.9 Z" fill="#FF2E7E" />
                <path d="M 9.7 13.5 L 10.25 14.3 L 10.8 13.5 Z" fill="#FFFFFF" />
                {/* Mint collar accent */}
                <rect x="21.5" y="6.2" width="2.8" height="13.0" rx="1" fill="#17E2CE" />
                <circle cx="22.9" cy="18.2" r="1.6" fill="#FFD92E" stroke="#171824" strokeWidth="0.8" />
              </svg>

              {/* Stretchable Long-Cat Torso (middle) */}
              <div className="relative -mx-[1px] h-[13px] flex-1 bg-[#171824] translate-y-[0.7px]">
                {/* Crisp subtle back highlight */}
                <div className="absolute top-[2.5px] right-2 left-2 h-[2px] rounded-full bg-white/20" />
                {/* Center mint-pink racing dots along the long torso */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#17E2CE]" />
                  <span className="h-1 w-3 rounded-full bg-[#FF2E7E]" />
                  <span className="h-1 w-1 rounded-full bg-[#17E2CE]" />
                </div>
              </div>

              {/* Cat Rear + Wiggling Tail (right, non-distorted crisp SVG) */}
              <svg
                viewBox="0 0 22 24"
                className="h-6 w-[22px] shrink-0 overflow-visible"
                fill="none"
                aria-hidden="true"
              >
                {/* Rounded rump connecting seamlessly to torso */}
                <path
                  d="M 0 6.2 L 7.5 6.2 C 11.8 6.2 14.5 9.0 14.5 12.7 C 14.5 16.4 11.8 19.2 7.5 19.2 L 0 19.2 Z"
                  fill="#171824"
                />
                {/* Cute hind paw */}
                <ellipse cx="6.2" cy="19.6" rx="2.6" ry="1.8" fill="#171824" />
                <ellipse cx="6.2" cy="19.8" rx="1.1" ry="0.7" fill="#FF2E7E" opacity="0.85" />
                {/* Perky curved tail */}
                <path
                  d="M 13.0 10.5 C 16.5 9.5 19.2 7.0 18.6 4.2 C 18.3 2.8 16.8 2.4 16.1 3.4"
                  stroke="#171824"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Tiny sparkle tip on tail when dragging */}
                <circle
                  cx="16.2"
                  cy="3.4"
                  r={dragging ? "2.1" : "1.3"}
                  fill={dragging ? "#FF2E7E" : "#17E2CE"}
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function RulesModal({
  open,
  lang,
  onClose,
}: {
  open: boolean;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const t = COPY[lang];

  return (
    <div
      className="nte-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e17]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="nte-modal-pop max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] shadow-[8px_8px_0_0_#FFD92E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-[#171824] bg-[#171824] px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#17E2CE]" />
            <div>
              <h3 className="font-display text-lg font-bold">{t.rulesTitle}</h3>
              <p className="text-xs text-white/70">{t.rulesSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-white/25 bg-white/10 text-white hover:bg-[#FF2E7E]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.rulesList.map((rule) => (
              <div
                key={rule.code}
                className="rounded-xl border-2 border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-3.5"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-[#171824] bg-[#FFD92E] px-1.5 py-0.5 font-mono-code text-[11px] font-extrabold text-[#171824]">
                    {rule.code}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[var(--nte-ink)]">
                    {rule.title}
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--nte-ink-soft)]">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-[#17E2CE]/60 bg-[#17E2CE]/10 p-4">
            <div className="font-display text-xs font-extrabold text-[var(--nte-ink)]">
              {t.rulesDedupTitle}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--nte-ink-soft)]">
              {t.rulesDedupBody}
            </p>
          </div>

          <div className="rounded-xl border-2 border-[#FF2E7E]/60 bg-[#FF2E7E]/10 p-4">
            <div className="flex items-center gap-1.5 font-display text-xs font-extrabold text-[#FF2E7E]">
              <AlertTriangle className="h-4 w-4" />
              <span>{t.rulesDisclaimerTitle}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--nte-ink-soft)]">
              {t.rulesDisclaimerBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BadgesModal({
  open,
  lang,
  onClose,
}: {
  open: boolean;
  lang: Lang;
  onClose: () => void;
}) {
  const [copiedKey, setCopiedKey] = useState<"listed" | "compact" | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const t = COPY[lang];

  const copySnippet = async (key: "listed" | "compact", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // ignore
    }
  };

  const items = [
    { key: "listed" as const, title: t.badgeListedName, img: badgeListedSvg, code: LISTED_MD },
    { key: "compact" as const, title: t.badgeCompactName, img: badgeCompactSvg, code: COMPACT_MD },
  ];

  return (
    <div
      className="nte-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e17]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="nte-modal-pop max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] shadow-[8px_8px_0_0_#FF2E7E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-[#171824] bg-[#FFD92E] px-5 py-4 text-[#171824]">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <h3 className="font-display text-lg font-extrabold">{t.badgesTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-[#171824] bg-white text-[#171824]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <p className="text-sm text-[var(--nte-ink-soft)]">{t.badgesSubtitle}</p>

          {items.map((item) => (
            <div
              key={item.key}
              className="space-y-3 rounded-xl border-2 border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--nte-ink)]">{item.title}</span>
                <button
                  type="button"
                  onClick={() => copySnippet(item.key, item.code)}
                  className="nte-btn inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#17E2CE] px-3 py-1 text-xs font-extrabold text-[#171824]"
                >
                  {copiedKey === item.key ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {t.modalCopied}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      {t.copyMarkdown}
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-center rounded-lg border border-dashed border-[var(--nte-border-subtle)] bg-[var(--nte-surface)] py-4">
                <img src={item.img} alt={item.title} className="h-8 w-auto" />
              </div>
              <LongCatCodeBox code={item.code} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
