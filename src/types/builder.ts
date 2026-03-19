// 组件类型
export type ComponentType =
  | "hero"
  | "avatar"
  | "text"
  | "button"
  | "gallery"
  | "contact"
  | "social"
  | "divider"
  | "card"
  | "section";

// 组件配置
export interface ComponentConfig {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  style?: {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
  };
}

// 页面布局
export interface PageLayout {
  id: string;
  title: string;
  slug: string;
  description?: string;
  components: ComponentConfig[];
}

// Hero 组件
export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Avatar 组件
export interface AvatarProps {
  imageUrl: string;
  size: "sm" | "md" | "lg" | "xl";
  shape: "circle" | "square" | "rounded";
}

// Text 组件
export interface TextProps {
  content: string;
  fontSize: "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight: "normal" | "semibold" | "bold";
  color?: string;
}

// Button 组件
export interface ButtonProps {
  text: string;
  link?: string;
  variant: "default" | "outline" | "ghost" | "secondary";
  size: "sm" | "md" | "lg";
}

// Gallery 组件
export interface GalleryProps {
  images: Array<{
    url: string;
    title?: string;
  }>;
  columns: number;
}

// Contact 组件
export interface ContactProps {
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
}

// Social 组件
export interface SocialProps {
  links: Array<{
    platform: "twitter" | "github" | "linkedin" | "instagram" | "youtube";
    url: string;
  }>;
  size: "sm" | "md" | "lg";
}

// Divider 组件
export interface DividerProps {
  style: "solid" | "dashed" | "dotted";
  color?: string;
}

// Card 组件
export interface CardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

// Section 组件
export interface SectionProps {
  title: string;
  backgroundColor?: string;
  padding: "sm" | "md" | "lg";
}

// Builder 状态
export interface BuilderState {
  components: ComponentConfig[];
  selectedComponentId: string | null;
  history: ComponentConfig[][];
  historyIndex: number;
}

// Builder 操作
export type BuilderAction =
  | { type: "ADD_COMPONENT"; payload: ComponentConfig }
  | { type: "REMOVE_COMPONENT"; payload: string }
  | { type: "UPDATE_COMPONENT"; payload: ComponentConfig }
  | { type: "REORDER_COMPONENTS"; payload: ComponentConfig[] }
  | { type: "SELECT_COMPONENT"; payload: string | null }
  | { type: "MOVE_COMPONENT"; payload: { id: string; direction: "up" | "down" } }
  | { type: "UNDO" }
  | { type: "REDO" };
