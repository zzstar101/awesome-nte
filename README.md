<div align="center">
  <img src="assets/icon.png" width="140" height="140" alt="Neverness to Everness">
  <p style="font-size: 40px; font-weight: 800; letter-spacing: 1px; margin: 12px 0 4px;">Awesome 异环</p>
  <p style="color:#59636e; margin: 0 0 16px;">社区开源项目索引 · Community Open-Source Index</p>
</div>

<p align="center">
  <a href="https://github.com/sindresorhus/awesome"><img src="https://awesome.re/badge.svg" alt="Awesome"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"></a>
  <!-- PROJECTS_COUNT_START -->
  <img src="https://img.shields.io/badge/projects-26-blue?label=Projects" alt="Projects">
  <!-- PROJECTS_COUNT_END -->
</p>

<p align="center">
  简体中文 ·
  <a href="./README.en.md">English</a>
</p>

> 《异环》（Neverness to Everness，NTE）社区第三方开源项目索引。收录 **GitHub 开源仓库**，涵盖自动化、数值计算、数据分析、资源挖掘、Mod、性能优化与工具集成。

完整列表见 **[LIST.md](./LIST.md)** · 英文版见 **[LIST.en.md](./LIST.en.md)**。

## Contents

- [列表](#列表)
- [收录标准](#收录标准)
- [贡献](#贡献)
- [开发与维护](#开发与维护)
- [未来计划](#未来计划)
- [免责声明](#免责声明)

## 列表

见 **[LIST.md](./LIST.md)**。

> 列表由 `data/projects.json` 生成，请勿直接编辑 LIST 文件。

## 收录标准

本项目收录与《异环》相关的、**有价值**的开源项目。判断一个项目是否值得收录，遵循以下硬性规则：

- **开源**：有公开可读源码；纯二进制分发、无源码的不收。
- **相关**：直接面向 NTE，或明确声明支持 NTE 的多游戏工具。
- **可用**：有 README，能说清用途与用法；空壳/占位仓库不收。
- **合规**：不修改游戏进程、内存或网络。**判定标准 = 是否注入。** 读屏 + 模拟输入（如 MaaNTE、ok-nte）在收列范围；作弊、内存修改、ESP、传送、加速、私服模拟器一律不收。

同时对同一功能域**去重**：同类只保留一个代表项目，除非被淘汰者有明显差异化。

**去重与排序原则**：功能覆盖面 > 维护活跃度与文档完整度 > 跨平台/跨游戏支持 > star 数。

## 贡献

欢迎通过 Issue 或 PR 收录新项目、修正描述、提出建议。详细步骤见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 开发与维护

```bash
bun install        # 安装依赖
bun run check      # 校验 data/projects.json
bun run generate   # 由 data/projects.json 生成 LIST.md / LIST.en.md
bun run stars      # 抓取 star 快照到 data/stars.json
bun run add        # 交互式新增项目
```

CI 会在每次 PR 里校验数据并确保生成物最新；`stars` 每日自动更新；`links` 每周检查死链。

## 未来计划

- [ ] 补充项目元数据（star 排序、维护状态筛选、语言/平台维度）。
- [ ] 打造检索更友好的数据展示（网站/可交互视图）。
- [ ] 完善国际化，持续对齐中英描述。

## 免责声明

- 本项目是**社区维护的第三方开源项目索引**，与《异环》（Neverness to Everness）的开发商、发行商及其关联公司（Hotta Studio / 完美世界等）没有任何隶属或合作关系。
- 本列表不对所收录项目的功能、安全性、稳定性、合法性作任何保证。收录不代表推荐或背书。
- 部分项目（尤其是自动化、挂机、Mod 类）可能违反游戏服务条款（ToS）或最终用户许可协议（EULA），使用可能导致账号受限或封禁。请自行评估风险，后果自负。
- 《异环》及相关的名称、商标、美术素材、游戏数据版权归其各自权利人所有。本项目为非商业性的社区索引。
- 若权利人认为某项收录不当，请通过 [Issue](https://github.com/zzstar101/awesome-nte/issues) 联系我们，我们会在核实后移除。
