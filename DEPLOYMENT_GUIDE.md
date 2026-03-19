# 低代码搭建平台 - 完整部署指南

## 环境要求

- Node.js >= 22.x
- npm >= 11.x
- SQLite 3

## 安装步骤

### 1. 克隆或进入项目目录
```bash
cd nextjs-starter-fullstack-node
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
创建 `.env` 文件（复制 `.env.example`）：
```bash
cp .env.example .env
```

编辑 `.env` 文件，确保数据库 URL 正确：
```
DATABASE_URL="file:./prisma/dev.db"
```

### 4. 初始化数据库
```bash
npm run migrate
```

这会：
- 创建 SQLite 数据库
- 运行 Prisma 迁移
- 生成 Prisma 客户端

### 5. 启动开发服务器
```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动

## 使用搭建平台

### 访问搭建平台
打开浏览器访问：`http://localhost:3000/builder`

### 创建第一个页面

1. **点击"新建页面"按钮**
2. **输入页面信息**
   - 标题：例如 "我的个人页面"
   - Slug：例如 "my-profile"（URL 路径）
3. **进入编辑页面**
4. **添加组件**
   - 从左侧组件库点击组件
   - 组件会添加到画布
5. **编辑组件属性**
   - 点击画布中的组件选中
   - 在右侧面板编辑属性
   - 实时预览效果
6. **保存页面**
   - 点击顶部"保存"按钮
   - 数据会保存到数据库

## 项目结构详解

```
nextjs-starter-fullstack-node/
├── prisma/
│   ├── schema.prisma          # 数据库 schema
│   └── dev.db                 # SQLite 数据库文件
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   ├── page.tsx       # 列表页面
│   │   │   └── [pageId]/
│   │   │       └── page.tsx   # 编辑页面
│   │   ├── api/
│   │   │   └── builder/
│   │   │       └── pages/     # API 路由
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/
│   │   ├── Builder/           # 搭建编辑器
│   │   │   ├── BuilderProvider.tsx
│   │   │   ├── Canvas.tsx
│   │   │   ├── ComponentPanel.tsx
│   │   │   ├── PropertyPanel.tsx
│   │   │   └── Toolbar.tsx
│   │   ├── BuilderComponents/ # 可搭建的组件
│   │   │   ├── HeroComponent.tsx
│   │   │   ├── AvatarComponent.tsx
│   │   │   ├── TextComponent.tsx
│   │   │   ├── ButtonComponent.tsx
│   │   │   ├── GalleryComponent.tsx
│   │   │   ├── ContactComponent.tsx
│   │   │   ├── SocialComponent.tsx
│   │   │   ├── DividerComponent.tsx
│   │   │   ├── CardComponent.tsx
│   │   │   └── SectionComponent.tsx
│   │   └── shadcnui/          # UI 组件库
│   ├── hooks/
│   │   ├── useBuilder.ts      # 状态管理
│   │   └── useDragDrop.ts     # 拖拽逻辑
│   ├── lib/
│   │   ├── builder/
│   │   │   ├── schemas.ts     # Zod 验证
│   │   │   ├── defaults.ts    # 默认配置
│   │   │   └── utils.ts       # 工具函数
│   │   ├── database/
│   │   │   └── dbClient.ts    # Prisma 客户端
│   │   ├── env/               # 环境变量
│   │   └── fonts.ts           # 字体配置
│   └── types/
│       └── builder.ts         # 类型定义
├── package.json
├── tsconfig.json
├── next.config.ts
└── BUILDER_GUIDE.md           # 使用指南
```

## 核心功能说明

### 1. 页面管理
- **创建页面**：输入标题和 slug，自动生成唯一 ID
- **编辑页面**：修改页面标题、描述和组件
- **删除页面**：永久删除页面及其所有组件
- **列表查看**：查看所有页面的创建时间和更新时间

### 2. 组件系统
10 个可用组件，每个都有特定的属性和样式：

| 组件 | 用途 | 主要属性 |
|------|------|--------|
| 英雄区域 | 大标题和背景 | 标题、副标题、背景图、CTA 按钮 |
| 头像 | 用户头像 | 图片 URL、大小、形状 |
| 文本 | 文本内容 | 内容、字体大小、粗细、颜色 |
| 按钮 | 可点击按钮 | 文本、链接、样式、大小 |
| 图片库 | 图片网格 | 图片数组、列数 |
| 联系方式 | 联系信息 | 邮箱、电话、地址 |
| 社交链接 | 社交媒体 | 链接数组、大小 |
| 分割线 | 视觉分割 | 样式、颜色 |
| 卡片 | 内容卡片 | 标题、描述、图片、链接 |
| 区域 | 内容容器 | 标题、背景色、内边距 |

### 3. 实时预览
- 编辑属性时立即看到效果
- 支持响应式预览
- 使用 Tailwind CSS 样式

### 4. 状态管理
- 使用 React Context + useReducer
- 支持撤销/重做
- 自动保存到历史记录

### 5. 拖拽排序
- 在画布中拖拽组件排序
- 拖拽时显示视觉反馈
- 自动更新组件顺序

## API 文档

### 获取页面列表
```bash
GET /api/builder/pages
```

响应：
```json
[
  {
    "id": "cuid",
    "title": "页面标题",
    "slug": "page-slug",
    "description": "页面描述",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### 创建页面
```bash
POST /api/builder/pages
Content-Type: application/json

{
  "title": "页面标题",
  "slug": "page-slug",
  "description": "页面描述",
  "components": []
}
```

### 获取单个页面
```bash
GET /api/builder/pages/[id]
```

### 更新页面
```bash
PUT /api/builder/pages/[id]
Content-Type: application/json

{
  "title": "新标题",
  "components": [...]
}
```

### 删除页面
```bash
DELETE /api/builder/pages/[id]
```

## 数据库操作

### 查看数据库
```bash
npm run studio
```

打开 Prisma Studio 查看和编辑数据

### 重置数据库
```bash
# 删除所有数据并重新迁移
npm run migrate -- --skip-generate
```

## 生产部署

### 构建项目
```bash
npm run build
```

### 启动生产服务器
```bash
npm run start
```

### 完整生产流程
```bash
npm run prod
```

这会：
1. 生成 Prisma 客户端
2. 运行 ESLint 检查
3. 构建项目
4. 启动生产服务器

## 常见问题

### Q: 如何备份数据库？
A: SQLite 数据库文件位于 `prisma/dev.db`，直接复制即可备份。

### Q: 如何修改组件？
A: 编辑 `src/components/BuilderComponents/` 中的组件文件，然后重启开发服务器。

### Q: 如何添加新组件？
A:
1. 在 `src/types/builder.ts` 中添加新类型
2. 在 `src/lib/builder/schemas.ts` 中添加验证 schema
3. 在 `src/lib/builder/defaults.ts` 中添加默认配置
4. 在 `src/components/BuilderComponents/` 中创建组件
5. 在 `ComponentRenderer.tsx` 中添加渲染逻辑

### Q: 如何自定义样式？
A: 编辑 `src/app/globals.css` 修改全局样式，或在组件中使用 Tailwind 类名。

### Q: 性能如何优化？
A:
- 使用虚拟滚动处理大量组件
- 使用 React.memo 优化组件渲染
- 使用 useCallback 优化事件处理

## 故障排除

### 数据库连接错误
```
Error: SQLITE_CANTOPEN
```
解决：确保 `DATABASE_URL` 环境变量正确，数据库文件有写入权限

### 类型错误
```
Type 'X' is not assignable to type 'Y'
```
解决：运行 `npm run migrate` 重新生成 Prisma 类型

### 页面加载缓慢
解决：
- 检查浏览器开发者工具的 Network 标签
- 减少组件数量
- 优化图片大小

## 支持和反馈

如有问题或建议，请提交 Issue 或 Pull Request。

## 许可证

MIT
