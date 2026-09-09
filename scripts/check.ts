import { readFileSync } from "node:fs";
import { z } from "zod";
import { CATEGORIES } from "./types.ts";

const lang = z.object({ "zh-CN": z.string().min(1), "en-US": z.string().min(1) });

const projectSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    description: lang,
    repository: z.string().url(),
    website: z
      .array(z.object({ provider: z.string().min(1), url: z.string().url() }))
      .optional(),
    author: z.object({ name: z.string().min(1), url: z.string().url().optional() }).optional(),
    category: z.enum(CATEGORIES.map((c) => c.key) as [string, ...string[]]),
    tags: z.array(z.string().min(1)).default([]),
    license: z.string().optional(),
    platform: z.array(z.string()).optional(),
    status: z.enum(["active", "stale", "archived"]).optional(),
    addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .strict();

const DATA_PATH = new URL("../data/projects.json", import.meta.url);

function fail(msg: string): never {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

function main() {
  const raw = readFileSync(DATA_PATH, "utf-8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    fail(`data/projects.json 不是合法 JSON：${(e as Error).message}`);
  }

  if (!Array.isArray(parsed)) fail("data/projects.json 必须是数组");

  const errors: string[] = [];
  const seenIds = new Set<number>();
  const seenNames = new Set<string>();

  parsed.forEach((item, i) => {
    const res = projectSchema.safeParse(item);
    if (!res.success) {
      errors.push(`第 ${i + 1} 条：${res.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
      return;
    }
    const p = res.data;
    if (seenIds.has(p.id)) errors.push(`第 ${i + 1} 条：重复的 id ${p.id}`);
    if (seenNames.has(p.name)) errors.push(`第 ${i + 1} 条：重复的 name ${p.name}`);
    seenIds.add(p.id);
    seenNames.add(p.name);
    for (const lang of ["zh-CN", "en-US"] as const) {
      if (!/^[\p{L}\p{N}p].*[。.]$/u.test(p.description[lang].trim())) {
        errors.push(`第 ${i + 1} 条 (${p.name})：${lang} 描述应以大写字母开头、以句号结尾`);
      }
    }
    if (p.status === "active" && p.license) {
      // info only
    }
  });

  if (errors.length) {
    console.error(`✖ 校验失败（${errors.length} 处）:`);
    errors.slice(0, 30).forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  const byCat = new Map<string, number>();
  parsed.forEach((p: { category: string }) => byCat.set(p.category, (byCat.get(p.category) ?? 0) + 1));
  console.log(`✓ 校验通过，共 ${parsed.length} 条。`);
  for (const c of CATEGORIES) {
    const n = byCat.get(c.key) ?? 0;
    if (n === 0) console.warn(`  ⚠ 分类 "${c.key}" 当前没有任何条目`);
    else console.log(`  • ${c["zh-CN"]} (${c.key}): ${n}`);
  }
}

main();
