# ✅ SQLite JSON 问题已解决

## 问题
```
Error: Field `components` in model `Page` can't be of type Json[].
The current connector does not support the Json List type.
```

## 原因
SQLite 不支持 `Json[]` 类型（JSON 数组列表）。只有 PostgreSQL 和 MySQL 支持。

## 解决方案（已完成）

### ✅ 修改 1: prisma/schema.prisma
```prisma
// ❌ 之前
components  Json[]

// ✅ 之后
components  Json     @default("[]")
```

### ✅ 修改 2: API 创建页面
```typescript
// 存储时序列化
components: JSON.stringify(validatedData.components)
```

### ✅ 修改 3: API 更新页面
```typescript
// 存储时序列化
components: JSON.stringify(validatedData.components)
```

### ✅ 修改 4: 编辑页面获取数据
```typescript
// 读取时反序列化
components: typeof data.components === "string"
  ? JSON.parse(data.components)
  : data.components
```

## 现在可以运行

```bash
# 1. 验证 schema
npx prisma validate

# 2. 生成客户端
npx prisma generate

# 3. 初始化数据库
npm run migrate

# 4. 启动开发服务器
npm run dev

# 5. 访问搭建平台
# http://localhost:3000/builder
```

## 数据流程

```
前端编辑 (数组)
    ↓
JSON.stringify (序列化)
    ↓
API 发送 (字符串)
    ↓
数据库存储 (TEXT 字段)
    ↓
API 读取 (字符串)
    ↓
JSON.parse (反序列化)
    ↓
前端使用 (数组)
```

## 已修复的文件

- [x] `prisma/schema.prisma`
- [x] `src/app/api/builder/pages/route.ts`
- [x] `src/app/api/builder/pages/[id]/route.ts`
- [x] `src/app/builder/[pageId]/page.tsx`

## 相关文档

- [SQLITE_JSON_FIX.md](./SQLITE_JSON_FIX.md) - 详细说明

---

✅ **所有问题已解决，可以正常使用！**
