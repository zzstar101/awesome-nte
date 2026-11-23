import rawProjects from "@repo/data/projects.json";
import rawStars from "@repo/data/stars.json";
import { CATEGORIES, type CategoryKey, type Lang, type Project } from "@repo/scripts/types.ts";

export { CATEGORIES, type CategoryKey, type Lang, type Project };

export interface StarsSnapshot {
  updatedAt: string;
  repos: Record<string, { stars: number; fetchedAt: string }>;
}

export interface CategoryMeta {
  key: CategoryKey;
  code: string;
  accent: string;
  accentText: string;
  label: Record<Lang, string>;
  shortDesc: Record<Lang, string>;
}

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  Automation: {
    key: "Automation",
    code: "01 // AUTO",
    accent: "#17E2CE",
    accentText: "#171824",
    label: { "zh-CN": "自动化与挂机", "en-US": "Automation & Bots" },
    shortDesc: {
      "zh-CN": "读屏识别、日常签到、采集与钓鱼辅助",
      "en-US": "Screen-reading, daily check-ins, farming & fishing",
    },
  },
  Calculators: {
    key: "Calculators",
    code: "02 // CALC",
    accent: "#FFD92E",
    accentText: "#171824",
    label: { "zh-CN": "数值计算与规划", "en-US": "Calculators & Planners" },
    shortDesc: {
      "zh-CN": "伤害配装、驱动养成、抽卡模拟与咖舍优化",
      "en-US": "Damage math, gear optimization, gacha & cafe planners",
    },
  },
  Data: {
    key: "Data",
    code: "03 // DATA",
    accent: "#FF2E7E",
    accentText: "#FFFFFF",
    label: { "zh-CN": "数据与统计", "en-US": "Data & Analytics" },
    shortDesc: {
      "zh-CN": "DPS 统计、抽卡导出、活动收益与流量研究",
      "en-US": "DPS meters, gacha export, event stats & traffic research",
    },
  },
  Assets: {
    key: "Assets",
    code: "04 // ASST",
    accent: "#8B5CF6",
    accentText: "#FFFFFF",
    label: { "zh-CN": "资源与数据挖掘", "en-US": "Assets & Datamining" },
    shortDesc: {
      "zh-CN": "解包素材、模型导入器与 Spine 动画转码",
      "en-US": "Extracted assets, model importers & Spine converters",
    },
  },
  Mods: {
    key: "Mods",
    code: "05 // MODS",
    accent: "#FF6B2B",
    accentText: "#171824",
    label: { "zh-CN": "Mod 与外观", "en-US": "Mods & Customization" },
    shortDesc: {
      "zh-CN": "Mod 管理、BAGEL 照片自定义与车载电台换歌",
      "en-US": "Mod managers, custom BAGEL photos & radio tracks",
    },
  },
  Performance: {
    key: "Performance",
    code: "06 // PERF",
    accent: "#A6F72E",
    accentText: "#171824",
    label: { "zh-CN": "性能与画面", "en-US": "Performance & Graphics" },
    shortDesc: {
      "zh-CN": "画质配置文件、UE 原生 HDR 与帧率调优",
      "en-US": "Config presets, native UE HDR & visual tuning",
    },
  },
  Tools: {
    key: "Tools",
    code: "07 // TOOL",
    accent: "#38BDF8",
    accentText: "#171824",
    label: { "zh-CN": "工具与集成", "en-US": "Tools & Integrations" },
    shortDesc: {
      "zh-CN": "互动地图、启动器、机器人、音乐与插件框架",
      "en-US": "Interactive maps, launchers, bots, music & plugin APIs",
    },
  },
};

export interface EnrichedProject extends Project {
  owner: string;
  repoName: string;
  stars: number | null;
  isNew: boolean;
  caseCode: string;
  searchBlob: string;
  curationIndex: number;
}

const starsSnapshot = rawStars as StarsSnapshot;
const projectsList = rawProjects as Project[];

// Compute latest batch date so freshly curated projects get a NEW sticker.
const latestAddedDate = projectsList.reduce(
  (max, p) => (p.addedAt > max ? p.addedAt : max),
  "1970-01-01",
);

const latestTimestamp = Date.parse(`${latestAddedDate}T00:00:00Z`);
const NEW_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

// Case-insensitive star lookup in case GitHub repo casing differs slightly.
const starLookup = new Map<string, number>();
for (const [repoKey, entry] of Object.entries(starsSnapshot.repos)) {
  starLookup.set(repoKey.toLowerCase(), entry.stars);
}

export const PROJECTS: EnrichedProject[] = projectsList.map((p, index) => {
  const slash = p.name.indexOf("/");
  const owner = slash > 0 ? p.name.slice(0, slash) : (p.author?.name ?? "");
  const repoName = slash > 0 ? p.name.slice(slash + 1) : p.name;
  const stars = starLookup.get(p.name.toLowerCase()) ?? null;
  const addedTs = Date.parse(`${p.addedAt}T00:00:00Z`);
  const isNew =
    Number.isFinite(addedTs) &&
    Number.isFinite(latestTimestamp) &&
    latestTimestamp - addedTs <= NEW_WINDOW_MS &&
    p.addedAt === latestAddedDate;

  const searchBlob = [
    p.name,
    owner,
    repoName,
    p.author?.name ?? "",
    p.description["zh-CN"],
    p.description["en-US"],
    p.category,
    CATEGORY_META[p.category].label["zh-CN"],
    CATEGORY_META[p.category].label["en-US"],
    ...p.tags,
    ...(p.platform ?? []),
    p.license ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return {
    ...p,
    owner,
    repoName,
    stars,
    isNew,
    caseCode: `NO.${String(p.id).padStart(3, "0")}`,
    searchBlob,
    curationIndex: index,
  };
});

export const CATALOG_STATS = {
  totalProjects: PROJECTS.length,
  totalCategories: CATEGORIES.length,
  totalStars: PROJECTS.reduce((sum, p) => sum + (p.stars ?? 0), 0),
  recentCount: PROJECTS.filter((p) => p.isNew).length,
  latestAddedDate,
  starsUpdatedAt: starsSnapshot.updatedAt,
  websiteCount: PROJECTS.filter((p) => (p.website?.length ?? 0) > 0).length,
};

// Platforms actually present in data/projects.json in clean canonical order.
const PLATFORM_ORDER = ["Windows", "Linux", "Web", "macOS", "Android", "iOS"];
const platformSet = new Set<string>();
for (const p of PROJECTS) {
  for (const plat of p.platform ?? []) platformSet.add(plat);
}
export const AVAILABLE_PLATFORMS = PLATFORM_ORDER.filter((pl) => platformSet.has(pl));

// Top recurring tags (excluding exact category names so tags stay informative).
const categoryLower = new Set(CATEGORIES.map((c) => c.key.toLowerCase()));
const tagFreq = new Map<string, number>();
for (const p of PROJECTS) {
  for (const t of p.tags) {
    if (categoryLower.has(t.toLowerCase())) continue;
    tagFreq.set(t, (tagFreq.get(t) ?? 0) + 1);
  }
}
export const POPULAR_TAGS = Array.from(tagFreq.entries())
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 12)
  .map(([tag, count]) => ({ tag, count }));

export function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`;
  }
  return stars.toLocaleString("en-US");
}
