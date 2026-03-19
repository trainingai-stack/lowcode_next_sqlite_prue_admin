import z from "zod";
import type { ComponentType } from "@/types/builder";

// 通用样式 schema
const styleSchema = z.object({
  padding: z.string().optional(),
  margin: z.string().optional(),
  backgroundColor: z.string().optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
});

// 组件配置基础 schema
const baseComponentSchema = z.object({
  id: z.string(),
  type: z.string(),
  style: styleSchema.optional(),
});

// Hero 组件 schema
export const heroSchema = baseComponentSchema.extend({
  type: z.literal("hero"),
  props: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    backgroundImage: z.string().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
  }),
});

// Avatar 组件 schema
export const avatarSchema = baseComponentSchema.extend({
  type: z.literal("avatar"),
  props: z.object({
    imageUrl: z.string().optional(),
    size: z.enum(["sm", "md", "lg", "xl"]),
    shape: z.enum(["circle", "square", "rounded"]),
  }),
});

// Text 组件 schema
export const textSchema = baseComponentSchema.extend({
  type: z.literal("text"),
  props: z.object({
    content: z.string().optional(),
    fontSize: z.enum(["sm", "base", "lg", "xl", "2xl"]),
    fontWeight: z.enum(["normal", "semibold", "bold"]),
    color: z.string().optional(),
  }),
});

// Button 组件 schema
export const buttonSchema = baseComponentSchema.extend({
  type: z.literal("button"),
  props: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
    variant: z.enum(["default", "outline", "ghost", "secondary"]),
    size: z.enum(["sm", "md", "lg"]),
  }),
});

// Gallery 组件 schema
export const gallerySchema = baseComponentSchema.extend({
  type: z.literal("gallery"),
  props: z.object({
    images: z.array(
      z.object({
        url: z.string().optional(),
        title: z.string().optional(),
      })
    ).optional(),
    columns: z.number().min(1).max(4),
  }),
});

// Contact 组件 schema
export const contactSchema = baseComponentSchema.extend({
  type: z.literal("contact"),
  props: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    showForm: z.boolean().default(false),
  }),
});

// Social 组件 schema
export const socialSchema = baseComponentSchema.extend({
  type: z.literal("social"),
  props: z.object({
    links: z.array(
      z.object({
        platform: z.enum(["twitter", "github", "linkedin", "instagram", "youtube"]),
        url: z.string().optional(),
      })
    ).optional(),
    size: z.enum(["sm", "md", "lg"]),
  }),
});

// Divider 组件 schema
export const dividerSchema = baseComponentSchema.extend({
  type: z.literal("divider"),
  props: z.object({
    style: z.enum(["solid", "dashed", "dotted"]),
    color: z.string().optional(),
  }),
});

// Card 组件 schema
export const cardSchema = baseComponentSchema.extend({
  type: z.literal("card"),
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

// Section 组件 schema
export const sectionSchema = baseComponentSchema.extend({
  type: z.literal("section"),
  props: z.object({
    title: z.string().optional(),
    backgroundColor: z.string().optional(),
    padding: z.enum(["sm", "md", "lg"]),
  }),
});

// 组件 schema 联合
export const componentSchema = z.union([
  heroSchema,
  avatarSchema,
  textSchema,
  buttonSchema,
  gallerySchema,
  contactSchema,
  socialSchema,
  dividerSchema,
  cardSchema,
  sectionSchema,
]);

// 页面 schema
export const pageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "页面标题不能为空"),
  slug: z.string().min(1, "页面 slug 不能为空"),
  description: z.string().optional(),
  components: z.array(componentSchema),
});

// 创建页面请求 schema
export const createPageSchema = z.object({
  title: z.string().min(1, "页面标题不能为空"),
  slug: z.string().min(1, "页面 slug 不能为空"),
  description: z.string().optional(),
  components: z.array(componentSchema).default([]),
});

// 更新页面请求 schema
export const updatePageSchema = z.object({
  title: z.string().min(1, "页面标题不能为空").optional(),
  slug: z.string().min(1, "页面 slug 不能为空").optional(),
  description: z.string().nullable().optional(),
  components: z.union([
    z.array(componentSchema),
    z.string()
  ]).optional(),
});
