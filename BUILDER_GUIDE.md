# 低代码页面搭建平台 - 使用指南

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 初始化数据库
```bash
npm run migrate
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问搭建平台
打开浏览器访问 `http://localhost:3000/builder`

## 功能说明

### 页面列表 (`/builder`)
- 查看所有已创建的页面
- 创建新页面（输入标题和 slug）
- 编辑现有页面
- 删除页面

### 页面编辑器 (`/builder/[pageId]`)

#### 左侧：组件库
- 10 个可用组件：
  - 🎯 **英雄区域** - 大标题和背景
  - 👤 **头像** - 用户头像展示
  - 📝 **文本** - 文本内容
  - 🔘 **按钮** - 可点击按钮
  - 🖼️ **图片库** - 图片网格
  - 📧 **联系方式** - 邮箱、电话、地址
  - 🔗 **社交链接** - 社交媒体链接
  - ➖ **分割线** - 分割线
  - 📇 **卡片** - 内容卡片
  - 📦 **区域** - 内容容器

#### 中间：实时预览画布
- 点击组件可选中
- 选中的组件会高亮显示
- 实时预览组件效果

#### 右侧：属性编辑面板
- 编辑选中组件的属性
- 支持删除组件
- 不同组件有不同的编辑选项

#### 顶部：工具栏
- 撤销/重做功能
- 保存按钮
- 显示当前组件数量

## 数据存储

### 数据库结构
```prisma
model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  components  Json[]   // 组件数组
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 组件 JSON 格式
```json
{
  "id": "uuid",
  "type": "hero|avatar|text|button|gallery|contact|social|divider|card|section",
  "props": {
    // 组件特定的属性
  },
  "style": {
    "padding": "py-20",
    "margin": "my-4",
    "backgroundColor": "bg-blue-500",
    "textAlign": "center"
  }
}
```

## API 端点

### 页面管理
- `GET /api/builder/pages` - 获取页面列表
- `POST /api/builder/pages` - 创建页面
- `GET /api/builder/pages/[id]` - 获取单个页面
- `PUT /api/builder/pages/[id]` - 更新页面
- `DELETE /api/builder/pages/[id]` - 删除页面

## 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: SQLite + Prisma ORM
- **样式**: Tailwind CSS
- **验证**: Zod
- **状态管理**: React Context + useReducer
- **类型**: TypeScript

## 项目结构

```
src/
├── app/
│   ├── builder/
│   │   ├── page.tsx              # 列表页
│   │   └── [pageId]/page.tsx     # 编辑页
│   └── api/builder/
│       └── pages/                # API 路由
├── components/
│   ├── Builder/                  # 搭建编辑器组件
│   └── BuilderComponents/        # 可搭建的组件
├── hooks/
│   └── useBuilder.ts             # 状态管理 hook
├── lib/builder/
│   ├── schemas.ts                # Zod 验证
│   └── defaults.ts               # 默认配置
└── types/
    └── builder.ts                # 类型定义
```

## 使用示例

### 创建一个自媒体个人页面

1. **访问列表页** → 点击"新建页面"
2. **输入页面信息**
   - 标题: "我的个人页面"
   - Slug: "my-profile"
3. **添加组件**
   - 添加英雄区域（标题和背景）
   - 添加头像
   - 添加文本介绍
   - 添加作品卡片
   - 添加社交链接
   - 添加联系方式
4. **编辑属性** → 右侧面板编辑每个组件
5. **保存** → 点击保存按钮

## 功能特性

✅ 实时预览 - 编辑即时看到效果
✅ 拖拽添加 - 从组件库拖拽添加
✅ 属性编辑 - 动态表单编辑
✅ 撤销/重做 - 完整的操作历史
✅ JSON 存储 - 灵活的数据格式
✅ 响应式 - 支持各种屏幕尺寸

## 后续扩展

- [ ] 拖拽排序组件
- [ ] 更多组件类型
- [ ] 自定义样式编辑
- [ ] 组件预设库
- [ ] 页面模板
- [ ] 协作编辑
- [ ] 版本控制
- [ ] 页面发布和预览

## 常见问题

**Q: 如何修改组件的样式？**
A: 在右侧属性面板中编辑组件属性，实时预览会立即更新。

**Q: 如何删除组件？**
A: 选中组件后，在右侧面板点击"删除组件"按钮。

**Q: 数据会自动保存吗？**
A: 不会，需要手动点击顶部的"保存"按钮保存。

**Q: 可以导出页面吗？**
A: 目前只支持 JSON 格式存储在数据库中，可以通过 API 获取。

## 许可证

MIT
