import type { CSSProperties, MouseEvent } from "react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Monitor,
  Scale,
  Star,
  Terminal,
} from "lucide-react";
import { CATEGORY_META, formatStars, type EnrichedProject, type Lang } from "@/data/catalog";
import { COPY, type ViewMode } from "@/i18n/copy";
import { CrossSparkle } from "./NteGraphics";
import { ProjectLogo } from "./ProjectLogo";

interface ProjectCardProps {
  project: EnrichedProject;
  index: number;
  lang: Lang;
  viewMode: ViewMode;
  activeTag: string | null;
  onTagClick: (tag: string) => void;
  onCategoryClick: (cat: EnrichedProject["category"]) => void;
  onOpenDetail: (project: EnrichedProject) => void;
}

function PlatformIcon({ name }: { name: string }) {
  if (name === "Web") return <Globe className="h-3 w-3" />;
  if (name === "Linux") return <Terminal className="h-3 w-3" />;
  return <Monitor className="h-3 w-3" />;
}

export function ProjectCard({
  project,
  index,
  lang,
  viewMode,
  activeTag,
  onTagClick,
  onCategoryClick,
  onOpenDetail,
}: ProjectCardProps) {
  const t = COPY[lang];
  const catMeta = CATEGORY_META[project.category];
  const primaryWebsite = project.website?.[0];
  const staggerMs = Math.min(index * 24, 280);

  const slotStyle = {
    animationDelay: `${staggerMs}ms`,
    "--card-accent": catMeta.accent,
  } as CSSProperties;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  if (viewMode === "list") {
    return (
      <div
        onMouseMove={handleMouseMove}
        style={slotStyle}
        className="nte-card-slot nte-card-enter group rounded-xl"
      >
        <div className="nte-card-aura" aria-hidden="true" />
        <article
          onClick={() => onOpenDetail(project)}
          className="nte-card-body flex cursor-pointer flex-col justify-between gap-3 overflow-hidden rounded-xl p-4 sm:flex-row sm:items-center"
        >
          <div className="nte-card-spotlight" aria-hidden="true" />
          <div className="relative z-10 flex min-w-0 flex-1 items-start gap-3">
            <div className="pt-0.5">
              <ProjectLogo project={project} size="sm" interactive />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono-code text-[11px] font-bold text-[var(--nte-ink-muted)]">
                <span
                  className="nte-lock-dot h-2 w-2 rounded-full border border-[#171824] transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: catMeta.accent }}
                />
                {project.caseCode}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryClick(project.category);
                }}
                style={{ backgroundColor: catMeta.accent, color: catMeta.accentText }}
                className="cursor-pointer rounded-md border border-[#171824] px-2 py-0.5 text-[10px] font-extrabold"
              >
                {catMeta.label[lang]}
              </button>
              {project.isNew && (
                <span className="inline-flex items-center gap-0.5 rounded-md border border-[#171824] bg-[#FF2E7E] px-1.5 py-0.5 font-mono-code text-[10px] font-extrabold text-white">
                  {t.badgeNew}
                </span>
              )}
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-display text-base font-bold text-[var(--nte-ink)] transition-colors hover:text-[#FF2E7E]"
              >
                <span className="font-mono-code text-xs font-medium text-[var(--nte-ink-muted)]">
                  {project.owner}/
                </span>
                {project.repoName}
              </a>
            </div>

            <p className="text-sm leading-relaxed text-[var(--nte-ink-soft)]">
              {project.description[lang]}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {(project.platform ?? []).map((plat) => (
                <span
                  key={plat}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] px-1.5 py-0.5 font-mono-code text-[10px] font-semibold text-[var(--nte-ink-soft)]"
                >
                  <PlatformIcon name={plat} />
                  {plat}
                </span>
              ))}
              {project.license && (
                <span className="inline-flex items-center gap-1 rounded-md border border-[var(--nte-border-subtle)] px-1.5 py-0.5 font-mono-code text-[10px] font-semibold text-[var(--nte-ink-muted)]">
                  <Scale className="h-2.5 w-2.5" />
                  {project.license}
                </span>
              )}
              {project.tags.slice(0, 3).map((tag) => {
                const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag);
                    }}
                    className={`cursor-pointer rounded-md px-1.5 py-0.5 font-mono-code text-[10px] font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#171824] text-[#FFD92E]"
                        : "bg-[var(--nte-surface-alt)] text-[var(--nte-ink-muted)] hover:bg-[#17E2CE]/25 hover:text-[var(--nte-ink)]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
            </div>
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-2 self-end sm:self-center">
            <div className="inline-flex items-center gap-1 rounded-lg border-2 border-[var(--nte-border)] bg-[var(--nte-surface-muted)] px-2.5 py-1.5 font-mono-code text-xs font-extrabold text-[var(--nte-ink)]">
              <Star
                className={`h-3.5 w-3.5 ${
                  project.stars !== null ? "fill-[#FFD92E] text-[#171824]" : "text-[var(--nte-ink-muted)]"
                }`}
              />
              <span>{project.stars !== null ? formatStars(project.stars) : "—"}</span>
            </div>

            {primaryWebsite && (
              <a
                href={primaryWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="nte-btn inline-flex items-center gap-1 rounded-lg bg-[#17E2CE] px-2.5 py-1.5 text-xs font-extrabold text-[#171824]"
              >
                <span>{t.openWebsite}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="nte-btn inline-flex items-center gap-1 rounded-lg bg-[var(--nte-surface)] px-2.5 py-1.5 text-xs font-bold text-[var(--nte-ink)]"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden md:inline">GitHub</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(project);
              }}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--nte-border-subtle)] px-2.5 py-1.5 text-xs font-bold text-[var(--nte-ink-muted)] transition-colors hover:border-[var(--nte-border)] hover:text-[var(--nte-ink)]"
              title={t.openDetail}
            >
              <FileText className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={slotStyle}
      className="nte-card-slot nte-card-enter group h-full rounded-2xl"
    >
      {/* Smooth Breathing Category Aura (zero transform conflict / zero edge flicker) */}
      <div className="nte-card-aura" aria-hidden="true" />

      <article
        onClick={() => onOpenDetail(project)}
        className="nte-card-body flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl"
      >
        {/* Silky Cursor-Tracking Category Spotlight */}
        <div className="nte-card-spotlight" aria-hidden="true" />

        {/* Top Category Color Strip with Hover Glint Sweep */}
        <div
          className="nte-glint-bar relative z-10 h-2 w-full"
          style={{ backgroundColor: catMeta.accent }}
        />

        {/* Dossier Header Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 px-4 pt-3.5 pb-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono-code text-[11px] font-bold tracking-tight text-[var(--nte-ink-muted)] transition-colors group-hover:text-[var(--nte-ink)]">
              <span
                className="nte-lock-dot h-2 w-2 rounded-full border border-[#171824] opacity-70 transition-all duration-200 group-hover:opacity-100"
                style={{ backgroundColor: catMeta.accent }}
              />
              {project.caseCode}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCategoryClick(project.category);
              }}
              style={{ backgroundColor: catMeta.accent, color: catMeta.accentText }}
              className="cursor-pointer truncate rounded-md border-[1.5px] border-[#171824] px-2 py-0.5 text-[11px] font-extrabold transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              {catMeta.label[lang]}
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {project.isNew && (
              <span className="inline-flex -rotate-2 items-center gap-0.5 rounded-md border-[1.5px] border-[#171824] bg-[#FF2E7E] px-1.5 py-0.5 font-mono-code text-[10px] font-extrabold text-white shadow-[1.5px_1.5px_0_0_#171824] transition-transform duration-200 group-hover:rotate-2 group-hover:scale-105">
                <CrossSparkle className="h-2.5 w-2.5" outerFill="#FFD92E" innerFill="#FFFFFF" />
                {t.badgeNew}
              </span>
            )}

            <a
              href={`${project.repository}/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 rounded-lg border-[1.5px] px-2 py-0.5 font-mono-code text-[11px] font-extrabold transition-all duration-200 ${
                project.stars !== null && project.stars >= 100
                  ? "border-[#171824] bg-[#FFD92E] text-[#171824] group-hover:-translate-y-0.5 group-hover:shadow-[2px_2px_0_0_#171824]"
                  : "border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] text-[var(--nte-ink-soft)] hover:border-[var(--nte-border)]"
              }`}
              title={project.stars !== null ? `${project.stars} GitHub stars` : t.starsPending}
            >
              <Star
                className={`h-3 w-3 transition-transform duration-200 group-hover:rotate-12 ${
                  project.stars !== null
                    ? project.stars >= 100
                      ? "fill-[#171824] text-[#171824]"
                      : "fill-[#FFD92E] text-[#171824]"
                    : "text-[var(--nte-ink-muted)]"
                }`}
              />
              <span>{project.stars !== null ? formatStars(project.stars) : t.starsPending}</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-1 flex-col px-4 pt-1 pb-3.5">
          {/* Logo Sticker + Repo Name Lockup */}
          <div className="flex items-center gap-3">
            <ProjectLogo project={project} size="md" interactive />
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/title block min-w-0 flex-1"
            >
              <div className="truncate font-mono-code text-[11px] font-semibold text-[var(--nte-ink-muted)]">
                {project.owner} /
              </div>
              <h2 className="mt-0.5 flex items-center gap-1 font-display text-lg leading-snug font-bold tracking-tight text-[var(--nte-ink)] transition-colors duration-200 group-hover:text-[#FF2E7E]">
                <span className="truncate">{project.repoName}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </h2>
            </a>
          </div>

          {/* Description */}
          <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-[var(--nte-ink-soft)]">
            {project.description[lang]}
          </p>

          {/* Platforms & License */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {(project.platform ?? []).map((plat) => (
              <span
                key={plat}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] px-2 py-0.5 font-mono-code text-[10.5px] font-bold text-[var(--nte-ink-soft)]"
              >
                <PlatformIcon name={plat} />
                {plat}
              </span>
            ))}

            {project.license && (
              <span className="inline-flex items-center gap-1 rounded-md border border-[var(--nte-border-subtle)] px-2 py-0.5 font-mono-code text-[10.5px] font-semibold text-[var(--nte-ink-muted)]">
                <Scale className="h-2.5 w-2.5" />
                {project.license}
              </span>
            )}
          </div>

          {/* Clickable Tags */}
          {project.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => {
                const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag);
                    }}
                    className={`cursor-pointer rounded-md px-2 py-0.5 font-mono-code text-[10.5px] font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#171824] text-[#FFD92E]"
                        : "bg-[var(--nte-surface-alt)] text-[var(--nte-ink-muted)] hover:bg-[#17E2CE]/25 hover:text-[var(--nte-ink)]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-t border-[var(--nte-border-subtle)] bg-[var(--nte-surface-muted)] px-4 py-2.5">
          <div className="min-w-0 truncate">
            {project.author ? (
              project.author.url ? (
                <a
                  href={project.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono-code text-[11px] font-semibold text-[var(--nte-ink-muted)] transition-colors hover:text-[var(--nte-ink)]"
                >
                  @{project.author.name}
                </a>
              ) : (
                <span className="font-mono-code text-[11px] font-semibold text-[var(--nte-ink-muted)]">
                  @{project.author.name}
                </span>
              )
            ) : (
              <span className="font-mono-code text-[11px] text-[var(--nte-ink-muted)]">
                {project.addedAt}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {primaryWebsite && (
              <a
                href={primaryWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg border-[1.5px] border-[#171824] bg-[#17E2CE] px-2.5 py-1 text-[11px] font-extrabold text-[#171824] transition-transform hover:-translate-y-0.5"
              >
                <span>{t.openWebsite}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}

            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-lg border-[1.5px] border-[var(--nte-border)] bg-[var(--nte-surface)] px-2.5 py-1 text-[11px] font-bold text-[var(--nte-ink)] transition-colors hover:bg-[#171824] hover:text-white"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(project);
              }}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border-[1.5px] border-[var(--nte-border-subtle)] px-2 py-1 text-[11px] font-bold text-[var(--nte-ink-muted)] transition-all duration-200 group-hover:border-[#171824] group-hover:bg-[#FFD92E] group-hover:text-[#171824]"
              title={t.openDetail}
              aria-label={t.openDetail}
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden text-[10.5px] sm:inline">{t.cardInspectHint}</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
