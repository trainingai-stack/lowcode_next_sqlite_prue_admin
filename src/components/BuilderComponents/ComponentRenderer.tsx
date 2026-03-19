"use client";

import type { ComponentConfig } from "@/types/builder";
import { HeroComponent } from "./HeroComponent";
import { AvatarComponent } from "./AvatarComponent";
import { TextComponent } from "./TextComponent";
import { ButtonComponent } from "./ButtonComponent";
import { GalleryComponent } from "./GalleryComponent";
import { ContactComponent } from "./ContactComponent";
import { SocialComponent } from "./SocialComponent";
import { DividerComponent } from "./DividerComponent";
import { CardComponent } from "./CardComponent";
import { SectionComponent } from "./SectionComponent";
import { componentDefaults } from "@/lib/builder/defaults";

interface ComponentRendererProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// 检查组件是否使用默认内容或为空内容
const isDefaultOrEmptyContent = (component: ComponentConfig): boolean => {
  const defaults = componentDefaults[component.type];
  if (!defaults) return false;

  const props = component.props;
  const defaultProps = defaults.props;

  // 根据组件类型检查关键内容字段
  switch (component.type) {
    case "hero":
      return (
        !props.title ||
        props.title === defaultProps.title ||
        !props.title.trim()
      );
    case "avatar": {
      // 只有精确等于默认值、空/空白时才提示
      // 用户输入真实URL后就不再提示
      const trimmedUrl = props.imageUrl?.trim() || "";
      return (
        !trimmedUrl ||
        trimmedUrl === "https://via.placeholder.com/200"
      );
    }
    case "text":
      return (
        !props.content ||
        props.content === defaultProps.content ||
        !props.content.trim()
      );
    case "button":
      return (
        !props.text ||
        props.text === defaultProps.text ||
        !props.text.trim()
      );
    case "gallery":
      return (
        !props.images ||
        props.images.length === 0 ||
        props.images.every((img: any) => !img.url || img.url === "https://via.placeholder.com/300" || img.url.toLowerCase().includes("placeholder"))
      );
    case "contact": {
      // 只要有一个联系方式是默认值或空，就提示需要编辑
      const isEmailEmptyOrDefault = !props.email || !props.email.trim() || props.email === "contact@example.com";
      const isPhoneEmptyOrDefault = !props.phone || !props.phone.trim() || props.phone === "+86 123-4567-8900";
      const isAddressEmptyOrDefault = !props.address || !props.address.trim() || props.address === "中国，北京";
      return isEmailEmptyOrDefault || isPhoneEmptyOrDefault || isAddressEmptyOrDefault;
    }
    case "social":
      return (
        !props.links ||
        props.links.length === 0 ||
        props.links.every((link: any) => !link.url || link.url.trim() === "")
      );
    case "card":
      return (
        !props.title ||
        props.title === defaultProps.title ||
        !props.title.trim() ||
        !props.description ||
        !props.description.trim()
      );
    case "section":
      return (
        !props.title ||
        props.title === defaultProps.title ||
        !props.title.trim()
      );
    default:
      return false;
  }
};

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
}: ComponentRendererProps) {
  const needsAttention = isDefaultOrEmptyContent(component);

  const baseClassName = `relative p-4 border-2 cursor-pointer transition-all ${
    isSelected
      ? "border-blue-500 bg-blue-50"
      : needsAttention
      ? "border-dashed border-orange-400 bg-orange-50"
      : "border-transparent hover:border-gray-300"
  }`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const commonProps = {
    component,
    isSelected,
    onSelect: handleClick,
  };

  return (
    <div className={baseClassName} onClick={handleClick}>
      {needsAttention && !isSelected && (
        <div className="absolute top-1 right-1 text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
          ⚠️ 需要编辑
        </div>
      )}
      {component.type === "hero" && <HeroComponent {...commonProps} />}
      {component.type === "avatar" && <AvatarComponent {...commonProps} />}
      {component.type === "text" && <TextComponent {...commonProps} />}
      {component.type === "button" && <ButtonComponent {...commonProps} />}
      {component.type === "gallery" && <GalleryComponent {...commonProps} />}
      {component.type === "contact" && <ContactComponent {...commonProps} />}
      {component.type === "social" && <SocialComponent {...commonProps} />}
      {component.type === "divider" && <DividerComponent {...commonProps} />}
      {component.type === "card" && <CardComponent {...commonProps} />}
      {component.type === "section" && <SectionComponent {...commonProps} />}
    </div>
  );
}
