<div align="center">
  <a href="https://zzstar101.github.io/awesome-nte/">
    <img src="assets/logo.svg" width="132" height="132" alt="Awesome NTE">
  </a>
  <p style="font-size: 38px; font-weight: 800; letter-spacing: 1px; margin: 12px 0 4px;">Awesome 异环</p>
  <p style="color:#59636e; margin: 0 0 16px;">海特洛市社区第三方开源项目档案库 · Neverness to Everness Open-Source Index</p>
</div>

<p align="center">
  <a href="https://github.com/sindresorhus/awesome"><img src="assets/badge.svg" alt="Awesome NTE"></a>
</p>

<p align="center">
  <a href="https://zzstar101.github.io/awesome-nte/"><img src="https://img.shields.io/badge/Website-zzstar101.github.io/awesome--nte-FF2E7E?labelColor=171824" alt="Online Website"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-3CF0DE?labelColor=171824" alt="License"></a>
  <!-- PROJECTS_COUNT_START -->
  <img src="https://img.shields.io/badge/projects-35-FFD92E?label=Projects&labelColor=171824" alt="Projects">
  <!-- PROJECTS_COUNT_END -->
</p>

<p align="center">
  <strong>简体中文</strong> ·
  <a href="./README.en.md">English</a>
  &nbsp;|&nbsp;
  <a href="https://zzstar101.github.io/awesome-nte/">在线网站</a> ·
  <a href="./LIST.md">完整列表</a> ·
  <a href="#收录标准">收录标准</a> ·
  <a href="./CONTRIBUTING.md">贡献指南</a>
</p>

> 《异环》（*Neverness to Everness*，NTE）社区第三方开源项目索引。精选 **GitHub 开源仓库**，覆盖读屏自动化、数值计算与配装、数据分析、资源挖掘、Mod 与外观、性能优化及周边实用工具；严格遵守零注入、无私服红线。

---

## 在线档案站

推荐直接访问在线交互网站浏览与检索全部收录项目：

**👉 [https://zzstar101.github.io/awesome-nte/](https://zzstar101.github.io/awesome-nte/)**

- **异环视觉主题**：白昼贴纸杂志 / 极夜海特洛双主题切换，中 / 英双语实时切换。
- **高效多维检索**：支持 `/` 或 `⌘K` 全字段即时搜索，按 7 大分类、平台、热门标签、含在线文档与本期上新组合筛选。
- **排序与探索**：支持策展精选 / Star 热度 / 最新收录 / 名称排序、卡片与档案列表双视图、随机逛逛与详情弹窗连续翻阅；筛选状态自动同步 URL 便于分享。
- **每日自动同步**：由 `data/projects.json` 与 `data/stars.json` 驱动，每次更新与每日 Star 同步都会通过 GitHub Pages 自动部署。

偏好纯文本阅读？完整 Markdown 列表见 **[LIST.md](./LIST.md)**（英文版 **[LIST.en.md](./LIST.en.md)**）。

> `LIST.md` 与在线网站均以 `data/projects.json` 为单一数据源自动构建，请勿手动编辑 `LIST.*`。

---

## 分类速览

| 分类 | 涵盖方向 | 快速跳转 |
| :--- | :--- | :--- |
| **自动化与挂机** | 读屏识别、日常签到、自动采集、钓鱼与生活玩法辅助（无注入） | [查看列表](./LIST.md#自动化与挂机) |
| **数值计算与规划** | 驱动养成、装备优化、伤害计算、抽卡模拟、配队与咖舍规划 | [查看列表](./LIST.md#数值计算与规划) |
| **数据与统计** | 抽卡记录分析与导出、活动收益统计、网络流量研究 | [查看列表](./LIST.md#数据与统计) |
| **资源与数据挖掘** | 解包素材、Blender 模型导入器、Spine 动画批量转码 | [查看列表](./LIST.md#资源与数据挖掘) |
| **Mod 与外观** | Mod 管理器、BAGEL 照片自定义、车载电台换歌 | [查看列表](./LIST.md#mod-与外观) |
| **性能与画面** | 画质与性能配置合集、UE 原生 HDR 一键开启面板 | [查看列表](./LIST.md#性能与画面) |
| **工具与集成** | 互动地图、启动器、聊天机器人、车载播放器、小地图覆盖与插件桥 | [查看列表](./LIST.md#工具与集成) |

---

## 收录标准

本项目只收录与《异环》相关的、**有实际价值**的开源项目，遵循以下 4 条硬性红线：

1. **开源透明**：必须有公开可读的源代码；纯二进制闭源分发、无源码壳仓库不收。
2. **直接相关**：直接面向 NTE 开发，或明确声明原生支持 NTE 的成熟多游戏工具。
3. **可用有文档**：具备能说清用途与用法的 README；空壳/占位仓库不收。
4. **合规零注入**：不修改游戏进程、内存或网络。**判定标准 = 是否注入。** 读屏 + 模拟输入（如 MaaNTE、ok-nte）允许收录；作弊、内存修改、ESP、传送、加速、私服模拟器一律不收。

同时对同一功能域做**去重**：同类只保留代表项目，除非备选方案有明确差异化。

**去重与排序优先级**：功能覆盖面 > 维护活跃度与文档完整度 > 跨平台 / 多游戏支持 > Star 数。

---

## 贡献

欢迎通过 [提交新项目表单](https://github.com/zzstar101/awesome-nte/issues/new?template=add-project.yml) 或 Pull Request 提交新项目、补充 Logo 与描述、反馈失效链接或提出建议。开发者可直接维护 `data/projects.json` 并运行校验生成命令，详细说明见 **[CONTRIBUTING.md](./CONTRIBUTING.md)**。

---

## 异环主题徽章

如果你的开源项目已被 **awesome-nte** 收录，欢迎在仓库 README 中展示异环贴纸徽章（也可在在线网站顶栏「主题徽章」中一键复制）：

[![Listed in Awesome NTE](assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)

```markdown
[![Listed in Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge-listed.svg)](https://github.com/zzstar101/awesome-nte)
```

精简版：

[![Awesome NTE](assets/badge.svg)](https://github.com/zzstar101/awesome-nte)

```markdown
[![Awesome NTE](https://raw.githubusercontent.com/zzstar101/awesome-nte/main/assets/badge.svg)](https://github.com/zzstar101/awesome-nte)
```

---

## 开发与维护

项目基于 **Bun** 管理数据脚本与静态站点（网站源码位于 `web/`）：

```bash
bun install        # 安装根脚本依赖
bun run check      # 校验 data/projects.json 结构与规范
bun run generate   # 由 data/projects.json 生成 LIST.md / LIST.en.md 并同步计数徽章
bun run stars      # 抓取 GitHub Star 快照到 data/stars.json
bun run add        # 交互式新增项目

# 在线网站本地开发与构建
(cd web && bun install)
bun run web:dev    # 启动本地预览（http://127.0.0.1:4173）
bun run web:build  # TypeScript 检查 + 生产构建到 web/dist
```

自动化工作流：
- **CI**（`.github/workflows/ci.yml`）：PR 与推送时校验数据并确保 `LIST.*` 保持最新。
- **Stars**（`.github/workflows/stars.yml`）：每日定时刷新 `data/stars.json`。
- **Links**（`.github/workflows/links.yml`）：每周自动巡检死链。
- **Deploy Pages**（`.github/workflows/deploy.yml`）：推送 `main` 或每日 Star 更新完成后自动构建并发布在线网站。
- **AI Triage & Auto PR**（`.github/workflows/triage-submission.yml`）：提交新项目 Issue 后自动抓取仓库元数据与 Logo、运行 AI 合规与去重初审并打标；初审通过或维护者贴 `approved` 标签后自动创建收录 PR。

---

## 路线图

- [x] 上线异环风格在线档案网站（双语切换、双主题、多维筛选、Star 排序与详情档案）。
- [ ] 扩展 `stars.json` 元数据（最近提交时间、主语言、归档状态），进一步增强活跃度筛选。
- [ ] 持续跟进社区新项目，定期审计合规性与中英描述对齐。

---

## 免责声明

- 本项目是**社区维护的第三方开源项目索引**，与《异环》（Neverness to Everness）的开发商、发行商及其关联公司（Hotta Studio / 完美世界等）没有任何隶属或合作关系。
- 本列表不对所收录项目的功能、安全性、稳定性、合法性作任何保证。收录不代表推荐或背书。
- 部分项目（尤其是自动化、挂机、Mod 类）可能违反游戏服务条款（ToS）或最终用户许可协议（EULA），使用可能导致账号受限或封禁。请自行评估风险，后果自负。
- 《异环》及相关的名称、商标、美术素材、游戏数据版权归其各自权利人所有。本项目为非商业性的社区索引。
- 若权利人认为某项收录不当，请通过 [Issue](https://github.com/zzstar101/awesome-nte/issues) 联系我们，我们会在核实后移除。
