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
  onSelect: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function isDefaultOrEmpty(component: ComponentConfig): boolean {
  const defaults = componentDefaults[component.type];
  if (!defaults) return false;

  const defaultProps = defaults.props;
  const currentProps = component.props;

  switch (component.type) {
    case "hero":
      return (
        currentProps.title === defaultProps.title &&
        (!currentProps.subtitle || currentProps.subtitle === defaultProps.subtitle) &&
        (!currentProps.ctaText || currentProps.ctaText === defaultProps.ctaText)
      );
    case "avatar":
      return currentProps.imageUrl === defaultProps.imageUrl;
    case "text":
      return currentProps.content === defaultProps.content;
    case "button":
      return currentProps.text === defaultProps.text;
    case "card":
      return (
        currentProps.title === defaultProps.title &&
        currentProps.description === defaultProps.description
      );
    case "contact":
      return (
        (!currentProps.email || currentProps.email === defaultProps.email) &&
        (!currentProps.phone || currentProps.phone === defaultProps.phone) &&
        (!currentProps.address || currentProps.address === defaultProps.address)
      );
    case "social":
      return !currentProps.links || currentProps.links.length === 0;
    case "gallery":
      return !currentProps.images || currentProps.images.length === 0;
    case "section":
      return currentProps.title === defaultProps.title;
    case "divider":
      return false;
    default:
      return false;
  }
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  canMoveUp = true,
  canMoveDown = true,
  onMoveUp,
  onMoveDown,
}: ComponentRendererProps) {
  const isDefault = isDefaultOrEmpty(component);

  let borderClass = "border-transparent hover:border-gray-300";
  if (isSelected) {
    borderClass = "border-blue-500 bg-blue-50";
  } else if (isDefault) {
    borderClass = "border-orange-300 border-dashed hover:border-orange-400";
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveUp?.();
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveDown?.();
  };

  const commonProps = {
    component,
    isSelected,
    onSelect: handleClick,
  };

  return (
    <div className={`relative p-4 border-2 cursor-pointer transition-all ${borderClass}`} onClick={handleClick}>
      {isSelected && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <button
            onClick={handleMoveUp}
            disabled={!canMoveUp}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              canMoveUp
                ? "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="上移 (↑)">
            ↑
          </button>
          <button
            onClick={handleMoveDown}
            disabled={!canMoveDown}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              canMoveDown
                ? "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="下移 (↓)">
            ↓
          </button>
        </div>
      )}
      {isDefault && !isSelected && (
        <div className="absolute left-2 top-2 z-10">
          <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded">
            待编辑
          </span>
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
