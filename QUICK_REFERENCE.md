# 低代码搭建平台 - 快速参考

## 快速启动（3 步）

```bash
# 1. 安装依赖
npm install

# 2. 初始化数据库
npm run migrate

# 3. 启动开发服务器
npm run dev
```

访问 `http://localhost:3000/builder`

## 核心概念

### 页面 (Page)
- 唯一 ID：自动生成的 CUID
- 标题：页面名称
- Slug：URL 路径（必须唯一）
- 组件数组：页面包含的所有组件

### 组件 (Component)
- ID：唯一标识符
- Type：组件类型（10 种）
- Props：组件特定属性
- Style：通用样式（padding、margin、背景色等）

### 组件类型

```
hero      → 英雄区域（大标题 + 背景）
avatar    → 头像（圆形/方形/圆角）
text      → 文本（支持多种大小和粗细）
button    → 按钮（多种样式）
gallery   → 图片库（网格布局）
contact   → 联系方式（邮箱、电话、地址）
social    → 社交链接（多平台）
divider   → 分割线（实线/虚线/点线）
card      → 卡片（标题、描述、图片）
section   → 区域（容器，支持背景色）
```

## 文件位置速查

| 功能 | 文件位置 |
|------|--------|
| 页面列表 | `src/app/builder/page.tsx` |
| 页面编辑 | `src/app/builder/[pageId]/page.tsx` |
| API - 列表 | `src/app/api/builder/pages/route.ts` |
| API - 单个 | `src/app/api/builder/pages/[id]/route.ts` |
| 类型定义 | `src/types/builder.ts` |
| 验证 Schema | `src/lib/builder/schemas.ts` |
| 默认配置 | `src/lib/builder/defaults.ts` |
| 工具函数 | `src/lib/builder/utils.ts` |
| 状态管理 | `src/hooks/useBuilder.ts` |
| 拖拽逻辑 | `src/hooks/useDragDrop.ts` |
| 编辑器组件 | `src/components/Builder/` |
| 可搭建组件 | `src/components/BuilderComponents/` |
| 数据库 Schema | `prisma/schema.prisma` |

## 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run lint             # 运行 ESLint

# 数据库
npm run migrate          # 运行迁移
npm run studio           # 打开 Prisma Studio

# 生产
npm run build            # 构建项目
npm run start            # 启动生产服务器
npm run prod             # 完整生产流程
```

## 数据库 Schema

```prisma
model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  components  Json[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@index([slug])
}
```

## 组件 JSON 示例

```json
{
  "id": "uuid-1234",
  "type": "hero",
  "props": {
    "title": "欢迎来到我的页面",
    "subtitle": "这是一个副标题",
    "backgroundImage": "https://...",
    "ctaText": "了解更多",
    "ctaLink": "https://..."
  },
  "style": {
    "padding": "py-20",
    "backgroundColor": "bg-gradient-to-r from-blue-500 to-purple-600",
    "textAlign": "center"
  }
}
```

## 编辑器界面

```
┌─────────────────────────────────────────────────────────────┐
│ 工具栏：标题 | 撤销 | 重做 | 保存                            │
├──────────────┬──────────────────────┬──────────────────────┤
│              │                      │                      │
│ 组件库       │   实时预览画布       │   属性编辑面板       │
│              │                      │                      │
│ • 英雄区域   │  ┌────────────────┐ │ 组件类型             │
│ • 头像       │  │                │ │ 属性表单             │
│ • 文本       │  │   拖拽排序     │ │ 样式编辑             │
│ • 按钮       │  │   实时预览     │ │ 删除按钮             │
│ • 图片库     │  │                │ │                      │
│ • 联系方式   │  │                │ │                      │
│ • 社交链接   │  │                │ │                      │
│ • 分割线     │  │                │ │                      │
│ • 卡片       │  │                │ │                      │
│ • 区域       │  │                │ │                      │
│              │  └────────────────┘ │                      │
│              │                      │                      │
└──────────────┴──────────────────────┴──────────────────────┘
```

## 工作流程

1. **访问列表页** → `/builder`
2. **创建新页面** → 输入标题和 slug
3. **进入编辑页** → `/builder/[pageId]`
4. **添加组件** → 从左侧组件库点击
5. **编辑属性** → 右侧面板编辑
6. **拖拽排序** → 在画布中拖拽
7. **保存页面** → 点击保存按钮
8. **返回列表** → 查看所有页面

## 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: SQLite + Prisma ORM
- **样式**: Tailwind CSS 4
- **验证**: Zod
- **状态**: React Context + useReducer
- **类型**: TypeScript 5.9

## 关键特性

✅ 实时预览 - 编辑即时看到效果
✅ 拖拽排序 - 直观的组件排序
✅ 属性编辑 - 动态表单编辑
✅ 撤销/重做 - 完整的操作历史
✅ JSON 存储 - 灵活的数据格式
✅ 响应式 - 支持各种屏幕
✅ 类型安全 - 完整的 TypeScript 支持
✅ 验证 - Zod 数据验证

## 扩展指南

### 添加新组件

1. **定义类型** (`src/types/builder.ts`)
   ```typescript
   export interface NewComponentProps {
     // 属性定义
   }
   ```

2. **添加 Schema** (`src/lib/builder/schemas.ts`)
   ```typescript
   export const newComponentSchema = baseComponentSchema.extend({
     type: z.literal("newComponent"),
     props: z.object({
       // 验证规则
     }),
   });
   ```

3. **添加默认配置** (`src/lib/builder/defaults.ts`)
   ```typescript
   newComponent: {
     type: "newComponent",
     props: { /* 默认值 */ },
   }
   ```

4. **创建组件** (`src/components/BuilderComponents/NewComponent.tsx`)
   ```typescript
   export function NewComponent({ component }: Props) {
     // 组件实现
   }
   ```

5. **注册组件** (`src/components/BuilderComponents/ComponentRenderer.tsx`)
   ```typescript
   {component.type === "newComponent" && <NewComponent {...commonProps} />}
   ```

## 性能优化建议

- 使用虚拟滚动处理 50+ 组件
- 使用 React.memo 优化组件
- 使用 useCallback 优化事件
- 压缩图片资源
- 使用 CDN 加速

## 安全建议

- 验证所有用户输入（已使用 Zod）
- 使用 HTTPS 传输数据
- 定期备份数据库
- 限制 API 请求频率
- 实施用户认证和授权

## 许可证

MIT
