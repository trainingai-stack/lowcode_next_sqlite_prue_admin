import type { ComponentConfig, ComponentType } from "@/types/builder";

// 组件默认配置
export const componentDefaults: Record<ComponentType, Omit<ComponentConfig, "id">> = {
  hero: {
    type: "hero",
    props: {
      title: "欢迎来到我的页面",
      subtitle: "这是一个副标题",
      backgroundImage: "",
      ctaText: "了解更多",
      ctaLink: "",
    },
    style: {
      padding: "py-20",
      backgroundColor: "bg-gradient-to-r from-blue-500 to-purple-600",
      textAlign: "center",
    },
  },
  avatar: {
    type: "avatar",
    props: {
      imageUrl: "https://via.placeholder.com/200",
      size: "lg",
      shape: "circle",
    },
    style: {
      padding: "py-8",
      textAlign: "center",
    },
  },
  text: {
    type: "text",
    props: {
      content: "这是一段文本内容",
      fontSize: "base",
      fontWeight: "normal",
      color: "text-gray-700",
    },
    style: {
      padding: "py-4",
      textAlign: "left",
    },
  },
  button: {
    type: "button",
    props: {
      text: "点击按钮",
      link: "",
      variant: "default",
      size: "md",
    },
    style: {
      padding: "py-4",
      textAlign: "center",
    },
  },
  gallery: {
    type: "gallery",
    props: {
      images: [
        { url: "https://via.placeholder.com/300", title: "图片 1" },
        { url: "https://via.placeholder.com/300", title: "图片 2" },
        { url: "https://via.placeholder.com/300", title: "图片 3" },
      ],
      columns: 3,
    },
    style: {
      padding: "py-8",
    },
  },
  contact: {
    type: "contact",
    props: {
      email: "contact@example.com",
      phone: "+86 123-4567-8900",
      address: "中国，北京",
      showForm: false,
    },
    style: {
      padding: "py-8",
      textAlign: "center",
    },
  },
  social: {
    type: "social",
    props: {
      links: [
        { platform: "twitter", url: "https://twitter.com" },
        { platform: "github", url: "https://github.com" },
        { platform: "linkedin", url: "https://linkedin.com" },
      ],
      size: "md",
    },
    style: {
      padding: "py-8",
      textAlign: "center",
    },
  },
  divider: {
    type: "divider",
    props: {
      style: "solid",
      color: "border-gray-300",
    },
    style: {
      margin: "my-8",
    },
  },
  card: {
    type: "card",
    props: {
      title: "卡片标题",
      description: "这是卡片的描述内容",
      image: "https://via.placeholder.com/300",
      link: "",
    },
    style: {
      padding: "p-4",
    },
  },
  section: {
    type: "section",
    props: {
      title: "区域标题",
      backgroundColor: "bg-gray-50",
      padding: "md",
    },
    style: {
      padding: "py-12",
    },
  },
};

// 组件显示名称
export const componentNames: Record<ComponentType, string> = {
  hero: "英雄区域",
  avatar: "头像",
  text: "文本",
  button: "按钮",
  gallery: "图片库",
  contact: "联系方式",
  social: "社交链接",
  divider: "分割线",
  card: "卡片",
  section: "区域",
};

// 组件描述
export const componentDescriptions: Record<ComponentType, string> = {
  hero: "大标题和背景的英雄区域",
  avatar: "用户头像展示",
  text: "文本内容展示",
  button: "可点击的按钮",
  gallery: "图片网格展示",
  contact: "联系信息展示",
  social: "社交媒体链接",
  divider: "分割线",
  card: "内容卡片",
  section: "内容区域容器",
};

// 组件图标（可选，用于 UI 展示）
export const componentIcons: Record<ComponentType, string> = {
  hero: "🎯",
  avatar: "👤",
  text: "📝",
  button: "🔘",
  gallery: "🖼️",
  contact: "📧",
  social: "🔗",
  divider: "➖",
  card: "📇",
  section: "📦",
};
