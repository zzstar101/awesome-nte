<!-- Please read CONTRIBUTING.md / CONTRIBUTING.en.md before submitting. -->

## 改动类型 / Change Type

- [ ] 新增项目 / Add a project
- [ ] 修正或补充元数据（描述、Logo、官网、状态等）/ Update metadata (description, logo, website, status)
- [ ] 移除项目 / Remove a project
- [ ] 网站或脚本改进 / Website or scripts improvement

## 项目信息 / Project Info

- **仓库 / Repo**: `owner/repo`
- **分类 / Category**:
- **一句话说明（中/英）/ One-sentence summary**:
- **Logo / 官网（可选）/ Logo or Website (optional)**:

## 收录标准确认 / Inclusion Criteria (for project additions)

- [ ] 开源、有公开可读源码（非纯二进制分发）/ Open source with public readable code
- [ ] 与《异环》(NTE) 相关，或明确支持 NTE 的多游戏工具 / Relevant to NTE
- [ ] 有 README、实际可用，非空壳/占位 / Has a clear README and is usable
- [ ] 不修改游戏进程、内存或网络，无注入、无私服 / Zero injection & not a private server
- [ ] 与该功能域现有项目不重复；若重复已说明差异化理由 / Not a duplicate (or differentiation explained)

## 提交前自检 / Pre-submit Checks

```bash
bun install
bun run check
bun run generate   # 重新生成 LIST.md / LIST.en.md 并一并提交
```

- [ ] 已运行 `bun run check` 且通过
- [ ] 已运行 `bun run generate` 并提交更新后的 `LIST.md` / `LIST.en.md`
