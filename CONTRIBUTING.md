# 贡献指南

感谢你对 **awesome-nte** 感兴趣！本文档说明如何收录新项目、如何修正内容，以及需要注意的规则。

请在提交前阅读 [收录标准](#收录标准) 与 [清单格式](#清单格式)。

## 收录标准

只有同时满足以下条件的项目才会被收录：

- **开源**：公开、可读的源码。仅发布二进制（Release 而无源码）的**不收**。
- **相关**：直接面向《异环》（Neverness to Everness），或明确声明支持 NTE 的多游戏工具。
- **可用**：仓库有 README，说明用途与用法；空壳/占位仓库**不收**。
- **合规**：**不修改游戏进程、内存或网络**。判定标准是「是否注入」——读屏 + 模拟输入可以，注入/内存修改/ESP/传送/加速/私服一律**不收**。

不受门槛限制：star 数（0★ 新项目只要有用）、维护活跃度（已归档可收，需标注）、语言、平台、文档语种。

**去重**：同一功能域只保留一个代表项目，除非被淘汰者有明显差异化（跨平台、离线可用、许可更宽松、性能更优）。参考优先级：功能覆盖面 > 维护活跃度与文档完整度 > 跨平台/跨游戏支持 > star 数。

**多游戏工具**：可以收录，但描述里必须点明「支持 NTE」。

## 如何收录新项目

### 方式一（推荐）：交互式命令

```bash
bun run add
```

按提示输入仓库（`owner/repo`）、双语描述、分类、标签。脚本会抓取 GitHub 元数据并追加到 `data/projects.json`。

### 方式二：编辑 `data/projects.json`

在数组中新增一条记录：

```jsonc
{
  "id": 27,                        // 唯一正整数，取当前最大值 +1
  "name": "owner/repo",            // GitHub 仓库 full_name
  "description": {                 // 双语，各一句话
    "zh-CN": "一句话说明它解决什么问题。",
    "en-US": "One sentence on what it does."
  },
  "repository": "https://github.com/owner/repo",
  "category": "Automation",        // 7 个分类之一，见下
  "tags": ["Automation", "CV"],    // 英文，跨维度标签
  "license": "MIT",                // 可选，SPDX
  "platform": ["Windows"],         // 可选
  "status": "active",              // 可选：active / stale / archived
  "addedAt": "2026-09-10"
}
```

**不要**手动编辑 `LIST.md` / `LIST.en.md`，它们由脚本生成。

### 分类（`category`）

`Automation` / `Calculators` / `Data` / `Assets` / `Mods` / `Performance` / `Tools`

### 清单格式

- 中文条目：`- [owner/repo](https://github.com/owner/repo) - 一句话中文描述。`
- 描述以**大写字母开头、句号结尾**，用一句说清用途，不要写成宣传文案。

## 提交前自检

1. `bun install`
2. `bun run check` —— 校验数据无误
3. `bun run generate` —— 重新生成清单
4. 确认生成的 `LIST.md` / `LIST.en.md` 已随 PR 一并提交

## 提交 PR

- 一个 PR 尽量只改动一件事（新增/修正/移除）。
- PR 描述里说明该项目解决了什么问题、满足哪些收录标准。
- 若被拒或有出入，请尊重维护者的复核决定，可补充资料后再次提交。

## 移除或修正

请开 Issue 说明原因（失效链接、已停止维护、违规、版权异议等），我们会尽快处理。
