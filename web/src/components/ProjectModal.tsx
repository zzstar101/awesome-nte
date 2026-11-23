import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Github,
  Globe,
  Languages,
  Scale,
  Star,
  User,
  X,
} from "lucide-react";
import {
  CATEGORY_META,
  PROJECTS,
  formatStars,
  type EnrichedProject,
  type Lang,
} from "@/data/catalog";
import { COPY } from "@/i18n/copy";
import { ProjectLogo } from "./ProjectLogo";

interface ProjectModalProps {
  project: EnrichedProject | null;
  lang: Lang;
  positionLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;
  onSelectProject: (p: EnrichedProject) => void;
  onSelectTag: (tag: string) => void;
}

export function ProjectModal({
  project,
  lang,
  positionLabel,
  onPrev,
  onNext,
  onClose,
  onSelectProject,
  onSelectTag,
}: ProjectModalProps) {
  const [copied, setCopied] = useState(false);
  const [showOtherLang, setShowOtherLang] = useState(false);

  useEffect(() => {
    setCopied(false);
    setShowOtherLang(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const t = COPY[lang];
  const otherLang: Lang = lang === "zh-CN" ? "en-US" : "zh-CN";
  const catMeta = CATEGORY_META[project.category];

  const related = PROJECTS.filter(
    (p) => p.category === project.category && p.id !== project.id,
  )
    .sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1))
    .slice(0, 3);

  const statusText =
    project.status === "archived"
      ? t.modalStatusArchived
      : project.status === "stale"
        ? t.modalStatusStale
        : t.modalStatusActive;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.repository);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
  };

  return (
    <div
      className="nte-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e17]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-file-title"
    >
      <div
        key={project.id}
        className="nte-modal-pop relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface)] shadow-[8px_8px_0_0_#17E2CE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Banner */}
        <div
          className="relative flex items-center justify-between border-b-2 border-[#171824] px-5 py-3.5"
          style={{ backgroundColor: catMeta.accent, color: catMeta.accentText }}
        >
          <div className="flex items-center gap-2.5 font-mono-code text-xs font-extrabold">
            <span className="rounded bg-[#171824] px-2 py-0.5 text-[#FFD92E]">
              {project.caseCode}
            </span>
            <span>{t.modalCaseFile}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onPrev && onNext && (
              <div className="mr-1 inline-flex items-center gap-1 rounded-lg border-2 border-[#171824] bg-white/90 px-1 py-0.5 font-mono-code text-[11px] font-bold text-[#171824]">
                <button
                  type="button"
                  onClick={onPrev}
                  title={t.modalPrev}
                  aria-label={t.modalPrev}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded hover:bg-[#FFD92E]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                {positionLabel && <span className="px-1">{positionLabel}</span>}
                <button
                  type="button"
                  onClick={onNext}
                  title={t.modalNext}
                  aria-label={t.modalNext}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded hover:bg-[#FFD92E]"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-[#171824] bg-white text-[#171824] transition-transform hover:scale-105"
              aria-label="Close"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <ProjectLogo project={project} size="lg" />
              <div className="min-w-0">
                <div className="truncate font-mono-code text-xs font-bold text-[var(--nte-ink-muted)]">
                  {project.owner} /
                </div>
                <h3
                  id="case-file-title"
                  className="mt-0.5 truncate font-display text-2xl font-bold tracking-tight text-[var(--nte-ink)] sm:text-3xl"
                >
                  {project.repoName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.stars !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#171824] bg-[#FFD92E] px-3 py-1 font-mono-code text-sm font-extrabold text-[#171824] shadow-[2.5px_2.5px_0_0_#171824]">
                  <Star className="h-4 w-4 fill-[#171824]" />
                  {formatStars(project.stars)}
                </span>
              )}
              <span className="rounded-xl border-2 border-[var(--nte-border)] bg-[var(--nte-surface-muted)] px-2.5 py-1 font-mono-code text-xs font-bold text-[#17E2CE]">
                ● {statusText}
              </span>
            </div>
          </div>

          {/* Description + Bilingual Preview */}
          <div className="rounded-xl border-2 border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-4">
            <p className="text-sm leading-relaxed text-[var(--nte-ink)] sm:text-[15px]">
              {project.description[lang]}
            </p>
            {showOtherLang && (
              <p className="mt-3 border-t border-dashed border-[var(--nte-border-subtle)] pt-3 text-xs leading-relaxed text-[var(--nte-ink-soft)]">
                {project.description[otherLang]}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowOtherLang((v) => !v)}
              className="mt-3 inline-flex cursor-pointer items-center gap-1.5 font-mono-code text-[11px] font-bold text-[var(--nte-ink-muted)] hover:text-[#FF2E7E]"
            >
              <Languages className="h-3.5 w-3.5" />
              {t.modalBilingualSwitch}
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-3">
              <div className="flex items-center gap-1 font-mono-code text-[10px] font-bold text-[var(--nte-ink-muted)] uppercase">
                <User className="h-3 w-3" />
                {t.modalAuthor}
              </div>
              <div className="mt-1 truncate text-xs font-bold text-[var(--nte-ink)]">
                {project.author?.url ? (
                  <a
                    href={project.author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[#17E2CE] underline-offset-2 hover:text-[#FF2E7E]"
                  >
                    @{project.author.name}
                  </a>
                ) : (
                  project.author?.name ?? t.modalUnknown
                )}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-3">
              <div className="flex items-center gap-1 font-mono-code text-[10px] font-bold text-[var(--nte-ink-muted)] uppercase">
                <Scale className="h-3 w-3" />
                {t.modalLicense}
              </div>
              <div className="mt-1 truncate font-mono-code text-xs font-bold text-[var(--nte-ink)]">
                {project.license ?? t.modalUnknown}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-3">
              <div className="flex items-center gap-1 font-mono-code text-[10px] font-bold text-[var(--nte-ink-muted)] uppercase">
                <Calendar className="h-3 w-3" />
                {t.modalAddedAt}
              </div>
              <div className="mt-1 font-mono-code text-xs font-bold text-[var(--nte-ink)]">
                {project.addedAt}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-3">
              <div className="flex items-center gap-1 font-mono-code text-[10px] font-bold text-[var(--nte-ink-muted)] uppercase">
                <Globe className="h-3 w-3" />
                {t.modalPlatforms}
              </div>
              <div className="mt-1 truncate font-mono-code text-xs font-bold text-[var(--nte-ink)]">
                {project.platform?.join(" / ") ?? t.modalUnknown}
              </div>
            </div>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 font-mono-code text-[11px] font-bold text-[var(--nte-ink-muted)]">
                {t.modalTags}:
              </span>
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onSelectTag(tag);
                    onClose();
                  }}
                  className="cursor-pointer rounded-lg border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-alt)] px-2.5 py-1 font-mono-code text-xs font-bold text-[var(--nte-ink-soft)] hover:border-[#171824] hover:bg-[#FFD92E] hover:text-[#171824]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="nte-btn inline-flex items-center gap-2 rounded-xl bg-[#171824] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#26293d]"
            >
              <Github className="h-4 w-4" />
              <span>{t.openRepo}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {(project.website ?? []).map((site, idx) => (
              <a
                key={idx}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nte-btn inline-flex items-center gap-1.5 rounded-xl bg-[#17E2CE] px-4 py-2.5 text-xs font-extrabold text-[#171824]"
              >
                <Globe className="h-4 w-4" />
                <span>{t.openWebsite}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}

            <button
              type="button"
              onClick={handleCopy}
              className="nte-btn inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--nte-surface)] px-3.5 py-2.5 text-xs font-bold text-[var(--nte-ink)]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#17E2CE]" />
                  <span>{t.modalCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t.modalCopyUrl}</span>
                </>
              )}
            </button>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="border-t-2 border-dashed border-[var(--nte-border-subtle)] pt-4">
              <div className="mb-2.5 font-mono-code text-[11px] font-bold tracking-wider text-[var(--nte-ink-muted)] uppercase">
                {t.modalRelated}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectProject(rel)}
                    className="cursor-pointer rounded-xl border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] p-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--nte-border)]"
                  >
                    <div className="truncate font-display text-xs font-bold text-[var(--nte-ink)]">
                      {rel.repoName}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-[var(--nte-ink-muted)]">
                      {rel.description[lang]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
