# Prisma 7 配置修复指南

## 问题描述

在 Prisma 7 中，数据库连接 URL 的配置方式发生了变化。之前在 `schema.prisma` 中配置的 `url` 属性不再支持，需要移到 `prisma.config.ts` 中。

## 错误信息

```
Error: The datasource property `url` is no longer supported in schema files.
Move connection URLs for Migrate to `prisma.config.ts` and pass either `adapter`
for a direct database connection or `accelerateUrl` for Accelerate to the
`PrismaClient` constructor.
```

## 解决方案

### 1. 更新 schema.prisma

**移除** `url` 属性：

```prisma
datasource db {
  provider = "sqlite"
  # ❌ 删除这一行
  # url      = env("DATABASE_URL")
}
```

**正确的配置**：

```prisma
datasource db {
  provider = "sqlite"
}
```

### 2. 确保 prisma.config.ts 正确配置

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),  // ✅ 在这里配置 URL
  },
});
```

### 3. 确保 dbClient.ts 使用适配器

```typescript
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../../../generated/prisma/client";
import { serverEnv } from "../env/serverEnv";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaLibSql({
  url: serverEnv.DATABASE_URL,
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

### 4. 环境变量配置

确保 `.env` 文件中有正确的数据库 URL：

```
DATABASE_URL="file:./prisma/dev.db"
```

## 验证修复

运行以下命令验证配置是否正确：

```bash
# 生成 Prisma 客户端
npm run migrate

# 或者单独生成
npx prisma generate
```

如果没有错误，说明配置已正确修复。

## 关键变化总结

| 项目 | Prisma 6 | Prisma 7 |
|------|---------|---------|
| URL 配置位置 | schema.prisma | prisma.config.ts |
| 适配器配置 | 可选 | 必需（用于 LibSQL） |
| 客户端初始化 | `new PrismaClient()` | `new PrismaClient({ adapter })` |

## 相关文档

- [Prisma 7 迁移指南](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections)
- [Prisma Config 文档](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datasource)
- [LibSQL 适配器](https://www.prisma.io/docs/orm/overview/databases/libsql)

## 常见问题

**Q: 为什么要改变配置方式？**
A: Prisma 7 改进了配置管理，使得不同环境的配置更灵活。

**Q: 我需要修改 schema.prisma 吗？**
A: 是的，需要移除 `url` 属性。

**Q: 现有的迁移会受影响吗？**
A: 不会，迁移文件不需要修改。

**Q: 如何在生产环境中配置？**
A: 在生产环境中设置 `DATABASE_URL` 环境变量即可。

## 修复完成

✅ schema.prisma 已修复
✅ prisma.config.ts 已配置
✅ dbClient.ts 已配置
✅ 可以正常使用
