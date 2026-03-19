import type { ComponentConfig, ComponentType } from "@/types/builder";

/**
 * 验证组件配置是否有效
 */
export function isValidComponent(component: any): component is ComponentConfig {
  return (
    component &&
    typeof component === "object" &&
    typeof component.id === "string" &&
    typeof component.type === "string" &&
    typeof component.props === "object"
  );
}

/**
 * 克隆组件配置
 */
export function cloneComponent(component: ComponentConfig): ComponentConfig {
  return JSON.parse(JSON.stringify(component));
}

/**
 * 获取组件的显示名称
 */
export function getComponentDisplayName(type: ComponentType): string {
  const names: Record<ComponentType, string> = {
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
  return names[type];
}

/**
 * 合并组件配置
 */
export function mergeComponentConfig(
  base: ComponentConfig,
  updates: Partial<ComponentConfig>
): ComponentConfig {
  return {
    ...base,
    ...updates,
    props: {
      ...base.props,
      ...(updates.props || {}),
    },
    style: {
      ...base.style,
      ...(updates.style || {}),
    },
  };
}

/**
 * 验证组件列表
 */
export function validateComponents(components: any[]): ComponentConfig[] {
  return components.filter(isValidComponent);
}

/**
 * 获取组件的默认值
 */
export function getComponentDefaults(type: ComponentType): Record<string, any> {
  const defaults: Record<ComponentType, Record<string, any>> = {
    hero: {
      title: "欢迎",
      subtitle: "",
      backgroundImage: "",
      ctaText: "",
      ctaLink: "",
    },
    avatar: {
      imageUrl: "https://via.placeholder.com/200",
      size: "lg",
      shape: "circle",
    },
    text: {
      content: "文本内容",
      fontSize: "base",
      fontWeight: "normal",
      color: "text-gray-700",
    },
    button: {
      text: "按钮",
      link: "",
      variant: "default",
      size: "md",
    },
    gallery: {
      images: [],
      columns: 3,
    },
    contact: {
      email: "",
      phone: "",
      address: "",
      showForm: false,
    },
    social: {
      links: [],
      size: "md",
    },
    divider: {
      style: "solid",
      color: "border-gray-300",
    },
    card: {
      title: "卡片",
      description: "描述",
      image: "",
      link: "",
    },
    section: {
      title: "区域",
      backgroundColor: "bg-gray-50",
      padding: "md",
    },
  };

  return defaults[type] || {};
}
