# SQLite JSON 处理指南

## 问题

SQLite 不支持 `Json[]` 类型（JSON 数组列表）。Prisma 7 中只有 PostgreSQL 和 MySQL 支持 JSON 数组。

## 错误信息

```
Error: Field `components` in model `Page` can't be of type Json[].
The current connector does not support the Json List type.
```

## 解决方案

### 1. 修改 Prisma Schema

**之前（❌ 不支持）**：
```prisma
components  Json[]
```

**之后（✅ 支持）**：
```prisma
components  Json     @default("[]")
```

### 2. 在 API 中序列化/反序列化

**创建页面时**：
```typescript
const page = await prisma.page.create({
  data: {
    components: JSON.stringify(validatedData.components),
  },
});
```

**更新页面时**：
```typescript
components: JSON.stringify(validatedData.components)
```

**获取页面时**：
```typescript
const parsedData = {
  ...data,
  components: typeof data.components === "string"
    ? JSON.parse(data.components)
    : data.components,
};
```

## 已修复的文件

- [x] `prisma/schema.prisma` - 改为 `Json` 单字段
- [x] `src/app/api/builder/pages/route.ts` - 添加 JSON.stringify
- [x] `src/app/api/builder/pages/[id]/route.ts` - 添加 JSON.stringify
- [x] `src/app/builder/[pageId]/page.tsx` - 添加 JSON.parse

## 数据存储格式

### 数据库中的存储
```json
"[{\"id\":\"uuid\",\"type\":\"hero\",\"props\":{...}}]"
```

### 应用中的使用
```typescript
[
  {
    id: "uuid",
    type: "hero",
    props: { ... }
  }
]
```

## 工作流程

1. **前端编辑** → 组件数组
2. **发送到 API** → JSON.stringify
3. **存储到数据库** → JSON 字符串
4. **从数据库读取** → JSON 字符串
5. **返回到前端** → JSON.parse
6. **前端使用** → 组件数组

## 性能考虑

- JSON 字符串存储在 SQLite TEXT 字段中
- 每次读写都需要序列化/反序列化
- 对于小到中等数据量（< 1MB）性能良好
- 如果需要更好的性能，考虑迁移到 PostgreSQL

## 替代方案

### 选项 1：使用 PostgreSQL（推荐用于大型项目）
```prisma
datasource db {
  provider = "postgresql"
}

model Page {
  components  Json[]  // ✅ PostgreSQL 支持
}
```

### 选项 2：规范化数据库设计（推荐用于复杂查询）
```prisma
model Page {
  id          String   @id @default(cuid())
  title       String
  components  Component[]
}

model Component {
  id        String   @id @default(cuid())
  pageId    String
  page      Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type      String
  props     Json
  style     Json?
  order     Int
}
```

### 选项 3：保持当前方案（简单快速）
- 适合小到中等项目
- 实现简单
- 无需复杂的关系管理

## 验证修复

```bash
# 验证 schema
npx prisma validate

# 生成客户端
npx prisma generate

# 运行迁移
npm run migrate
```

## 常见问题

**Q: 为什么 SQLite 不支持 Json[]？**
A: SQLite 的 JSON 支持有限，只能存储单个 JSON 对象，不能存储 JSON 数组列表。

**Q: 性能会受影响吗？**
A: 对于小到中等数据量，性能影响很小。如果有大量数据，考虑迁移到 PostgreSQL。

**Q: 如何迁移到 PostgreSQL？**
A: 修改 datasource provider 为 "postgresql"，然后运行迁移。

**Q: 可以查询 JSON 内容吗？**
A: SQLite 的 JSON 查询功能有限。如果需要复杂查询，考虑规范化设计。

## 总结

✅ 已修复 SQLite JSON 存储问题
✅ 使用 JSON.stringify/parse 处理序列化
✅ 保持简单快速的实现
✅ 可以正常使用搭建平台
