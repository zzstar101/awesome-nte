import { readFileSync, writeFileSync } from "node:fs";
import type { Project } from "./types.ts";

const DATA_PATH = new URL("../data/projects.json", import.meta.url);
const STARS_PATH = new URL("../data/stars.json", import.meta.url);
const GITHUB_API = "https://api.github.com/repos";

interface StarEntry {
  stars: number;
  fetchedAt: string;
}

async function main() {
  const projects: Project[] = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const today = new Date().toISOString().slice(0, 10);
  const repos = Array.from(new Set(projects.map((p) => p.name)));
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "awesome-nte",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const entries: Record<string, StarEntry> = {};
  let failed = 0;

  for (const repo of repos) {
    try {
      const res = await fetch(`${GITHUB_API}/${repo}`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { stargazers_count: number; full_name: string };
      entries[data.full_name] = { stars: data.stargazers_count, fetchedAt: today };
      await new Promise((r) => setTimeout(r, 120)); // stay under rate limits
    } catch (err) {
      failed++;
      console.warn(`⚠ 抓取失败 ${repo}: ${(err as Error).message}`);
    }
  }

  writeFileSync(STARS_PATH, JSON.stringify({ updatedAt: today, repos: entries }, null, 2) + "\n");
  console.log(`✓ 已更新 data/stars.json（${Object.keys(entries).length} 条，失败 ${failed}）`);
}

main();
