import { useEffect, useState } from "react";
import { AlertTriangle, Award, Check, Copy, ShieldCheck, X } from "lucide-react";
import badgeListedSvg from "@repo/assets/badge-listed.svg";
import badgeCompactSvg from "@repo/assets/badge.svg";
import type { Lang } from "@/data/catalog";
import { COPY } from "@/i18n/copy";

const LISTED_MD =
  "[![Listed in Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)";
const COMPACT_MD =
  "[![Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge.svg)](https://github.com/zzstar101/awesome-nte)";

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
              <pre className="overflow-x-auto rounded-lg bg-[#171824] p-2.5 font-mono-code text-[11px] text-[#3CF0DE]">
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
