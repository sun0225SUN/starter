# cyc

基于 Next.js App Router 的前端应用。代码按 [Feature-Sliced Design](https://feature-sliced.design) v2.1 组织，Next.js 接法见 [Usage with Next.js](https://fsd.how/docs/guides/tech/with-nextjs/)。Next.js 路由在仓库根目录的 `app/`。FSD 的 app、pages 层写成 `src/_app`、`src/_pages`。

Agent 在改代码时遵守的约束写在 [`AGENTS.md`](AGENTS.md)。

## 技术栈

- Next.js 16、React 19、TypeScript
- Bun
- next-intl（`en` 为默认语言，不带前缀；`zh` 使用 `/zh`）
- Tailwind CSS 4、shadcn/ui
- Zustand
- Biome、Lefthook、Commitizen（cz-git）

## 开发

```bash
bun install
bun dev
```

开发服务器默认在 [http://localhost:3000](http://localhost:3000)。

```bash
bun run build
bun run lint
bun run format
```

提交使用仓库里的 cz-git 配置：标题形如 `:sparkles: feat(scope): subject`。`pre-commit` 会格式化已暂存文件，`commit-msg` 会跑 Commitlint。

## 目录

```text
app/                       Next.js 路由，只做组合和框架入口
proxy.ts                   Next.js 代理
messages/                  文案目录，由 next-intl 直接加载
src/_app/                  FSD app：provider、全局样式、全应用的路由和 i18n
src/_pages/<slice>/        一个路由对应一个切片
src/widgets/<slice>/       跨页面复用的大块界面
src/features/<slice>/      复用的用户动作
src/entities/<slice>/      业务实体
src/shared/                不含产品行为的基础代码
```

层从上到下是 `_app`、`_pages`、`widgets`、`features`、`entities`、`shared`。文件只能引用自己所在的切片，以及更低的层。同一层的切片互不引用。`_app` 和 `shared` 没有切片，里面的 segment 可以互相引用。

切片对外只通过 `index.ts`。切片内部用相对路径引用具体文件。`shared/ui` 和 `shared/lib` 按组件或主题各自提供公开 API，例如 `@/shared/ui/button`。

常用 segment：

| Segment  | 内容                          |
| -------- | ----------------------------- |
| `ui`     | 界面                          |
| `model`  | 类型、schema、store、业务逻辑 |
| `api`    | 请求与数据映射                |
| `lib`    | 该切片内部使用的库代码        |
| `config` | 配置和功能开关                |

不使用 `processes` 层，也不把 `components`、`hooks`、`utils`、`types` 当作 segment 名。

新增模块直接放进对应的层。约束写在 [`AGENTS.md`](AGENTS.md)。
