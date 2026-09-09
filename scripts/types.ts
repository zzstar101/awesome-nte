// Shared types & category config for awesome-nte.

export const CATEGORIES = [
  { key: "Automation", "zh-CN": "自动化与挂机", "en-US": "Automation & Bots" },
  { key: "Calculators", "zh-CN": "数值计算与规划", "en-US": "Calculators & Planners" },
  { key: "Data", "zh-CN": "数据与统计", "en-US": "Data & Analytics" },
  { key: "Assets", "zh-CN": "资源与数据挖掘", "en-US": "Assets & Datamining" },
  { key: "Mods", "zh-CN": "Mod 与外观", "en-US": "Mods & Customization" },
  { key: "Performance", "zh-CN": "性能与画面", "en-US": "Performance & Graphics" },
  { key: "Tools", "zh-CN": "工具与集成", "en-US": "Tools & Integrations" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"] & string;
export type Lang = "zh-CN" | "en-US";

export interface Project {
  id: number;
  name: string;
  description: Record<Lang, string>;
  repository: string;
  website?: { provider: string; url: string }[];
  author?: { name: string; url?: string };
  category: CategoryKey;
  tags: string[];
  license?: string;
  platform?: string[];
  status?: "active" | "stale" | "archived";
  addedAt: string;
}

export const PLATFORMS = ["Windows", "Linux", "macOS", "Android", "iOS", "Web"] as const;

/** Resolve the localized display name for a category key. */
export function categoryLabel(key: string, lang: Lang): string {
  const c = CATEGORIES.find((c) => c.key === key);
  return c ? c[lang] : key;
}

/** Stable #anchor from a section title, GitHub-style. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
