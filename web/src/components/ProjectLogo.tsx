import { useEffect, useState } from "react";
import { CATEGORY_META, type EnrichedProject } from "@/data/catalog";

interface ProjectLogoProps {
  project: EnrichedProject;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

function deriveMonogram(repoName: string): string {
  const stripped = repoName.replace(/^(?:nte|yihuan)[-_]?/i, "") || repoName;
  const parts = stripped
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return stripped.slice(0, 2).toUpperCase() || "NT";
}

const SIZE_CLASSES = {
  sm: "h-10 w-10 rounded-xl text-xs",
  md: "h-11 w-11 rounded-xl text-sm",
  lg: "h-14 w-14 rounded-2xl text-base",
} as const;

/**
 * 3-tier NTE pop-sticker project emblem:
 * 1. Explicit curated `project.logo` (square icon/SVG from repo)
 * 2. GitHub owner/organization avatar (`github.com/{owner}.png?size=96`)
 * 3. Category-colored halftone NTE monogram fallback (zero broken images)
 */
export function ProjectLogo({
  project,
  size = "md",
  interactive = false,
}: ProjectLogoProps) {
  const initialStage = project.logo ? 0 : project.owner ? 1 : 2;
  const [stage, setStage] = useState<0 | 1 | 2>(initialStage);

  useEffect(() => {
    setStage(project.logo ? 0 : project.owner ? 1 : 2);
  }, [project.id, project.logo, project.owner]);

  const catMeta = CATEGORY_META[project.category];
  const sizeCls = SIZE_CLASSES[size];
  const hoverCls = interactive
    ? "transition-transform duration-200 ease-out group-hover:-rotate-4 group-hover:scale-105"
    : "";

  const src =
    stage === 0
      ? project.logo
      : stage === 1 && project.owner
        ? `https://github.com/${encodeURIComponent(project.owner)}.png?size=96`
        : null;

  const handleError = () => {
    setStage((prev) => {
      if (prev === 0 && project.owner) return 1;
      return 2;
    });
  };

  if (src) {
    const isCustomLogo = stage === 0;
    return (
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden border-2 border-[#171824] bg-white shadow-[2.5px_2.5px_0_0_#171824] ${sizeCls} ${hoverCls}`}
      >
        <img
          src={src}
          alt={`${project.repoName} logo`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleError}
          className={
            isCustomLogo
              ? "h-full w-full object-contain p-1"
              : "h-full w-full object-cover"
          }
        />
      </span>
    );
  }

  return (
    <span
      style={{ backgroundColor: catMeta.accent, color: catMeta.accentText }}
      className={`nte-halftone-light relative flex shrink-0 items-center justify-center overflow-hidden border-2 border-[#171824] font-display font-extrabold tracking-tight shadow-[2.5px_2.5px_0_0_#171824] select-none ${sizeCls} ${hoverCls}`}
      aria-hidden="true"
    >
      {deriveMonogram(project.repoName)}
    </span>
  );
}
