import { readFileSync, writeFileSync } from "node:fs";
import { CATEGORIES, type Lang, type Project } from "./types.ts";

const DATA_PATH = new URL("../data/projects.json", import.meta.url);
const today = new Date().toISOString().slice(0, 10);

function ask(tag: string, current?: string): string {
  const promptText = current ? `${tag} [${current}]: ` : `${tag}: `;
  const value = prompt(promptText)?.trim() ?? "";
  return value || current || "";
}

async function main() {
  const projects = JSON.parse(readFileSync(DATA_PATH, "utf-8")) as Project[];

  const repo = ask("仓库 full_name (如 owner/repo)");
  if (!repo) {
    console.error("✖ 未输入仓库");
    process.exit(1);
  }

  // Fetch metadata from GitHub
  let meta: { description: string | null; license?: string | null; language?: string | null } | null = null;
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "awesome-nte" };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    meta = (await res.json()) as typeof meta;
  } catch (e) {
    console.warn(`⚠ 无法抓取 ${repo}（${(e as Error).message}），将跳过自动字段`);
  }

  const zh = ask("中文描述（一句话，句号结尾）", meta?.description ?? "");
  const en = ask("英文描述（一句话，period 结尾）", meta?.description ?? "");

  console.log("可选分类：");
  CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}) ${c["zh-CN"]} (${c.key})`));
  const catIdx = parseInt(ask("分类编号", "1"), 10) - 1;
  const category = CATEGORIES[catIdx]?.key ?? CATEGORIES[0].key;

  const tags = ask("标签（英文，逗号分隔）").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const license = ask("License (SPDX，回车跳过)", meta?.license ?? "");
  const nextId = Math.max(0, ...projects.map((p) => p.id)) + 1;

  const entry: Partial<Project> = {
    id: nextId,
    name: repo,
    description: { "zh-CN": zh, "en-US": en } as Record<Lang, string>,
    repository: `https://github.com/${repo}`,
    category: category as Project["category"],
    tags,
    addedAt: today,
  };
  if (license) entry.license = license;
  entry.author = { name: repo.split("/")[0], url: `https://github.com/${repo.split("/")[0]}` };

  projects.push(entry as Project);
  writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2) + "\n");
  console.log(`✓ 已添加 ${repo}（id=${nextId}）。记得运行 \`bun run generate\` 重新生成列表。`);
}

main();
