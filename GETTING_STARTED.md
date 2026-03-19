# 🚀 快速启动指南

## 第一步：安装依赖

```bash
npm install
```

这会安装所有必需的包，包括：
- uuid
- @types/uuid
- 所有其他依赖

## 第二步：初始化数据库

```bash
npm run migrate
```

这会：
1. 生成 Prisma 客户端
2. 创建数据库
3. 运行迁移

## 第三步：启动开发服务器

```bash
npm run dev
```

## 第四步：访问搭建平台

打开浏览器访问：
```
http://localhost:3000/builder
```

## 完整命令序列

```bash
# 1. 进入项目目录
cd nextjs-starter-fullstack-node

# 2. 安装依赖
npm install

# 3. 初始化数据库
npm run migrate

# 4. 启动开发服务器
npm run dev

# 5. 在浏览器中打开
# http://localhost:3000/builder
```

## 常见问题

### Q: npm install 失败了怎么办？
A: 尝试清除缓存后重新安装：
```bash
npm cache clean --force
npm install
```

### Q: 还是找不到 uuid 模块？
A: 确保 node_modules 目录存在，如果不存在运行：
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: 数据库迁移失败？
A: 确保 .env 文件中有 DATABASE_URL：
```
DATABASE_URL="file:./prisma/dev.db"
```

### Q: 开发服务器启动失败？
A: 检查是否有其他进程占用 3000 端口，或者指定其他端口：
```bash
npm run dev -- -p 3001
```

## 验证安装

运行以下命令验证所有依赖都已正确安装：

```bash
# 验证 uuid 已安装
npm list uuid

# 验证 Prisma 已安装
npm list prisma

# 验证 Next.js 已安装
npm list next
```

## 下一步

安装完成后，你可以：

1. **创建第一个页面** - 访问 `/builder` 创建新页面
2. **添加组件** - 从左侧组件库拖拽添加
3. **编辑属性** - 在右侧面板编辑组件属性
4. **保存页面** - 点击保存按钮保存到数据库

## 需要帮助？

查看以下文档：
- [BUILDER_GUIDE.md](./BUILDER_GUIDE.md) - 详细使用指南
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - 快速参考
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 部署指南

---

**现在运行 `npm install` 开始吧！** 🎉
