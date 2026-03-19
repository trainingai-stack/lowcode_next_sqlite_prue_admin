"use client";

import type { ComponentConfig } from "@/types/builder";
import { useBuilderContext } from "@/components/Builder/BuilderProvider";
import { componentDefaults } from "@/lib/builder/defaults";
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

interface ComponentRendererProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
  totalCount: number;
}

function isContentEmptyOrDefault(component: ComponentConfig): boolean {
  const defaultConfig = componentDefaults[component.type];
  if (!defaultConfig) return false;

  const props = component.props;
  const defaultProps = defaultConfig.props;

  for (const key of Object.keys(props)) {
    const value = props[key];
    const defaultValue = defaultProps[key];

    if (typeof value === "string" && (!value || value.trim() === "")) {
      return true;
    }

    if (typeof value === "string" && typeof defaultValue === "string") {
      if (value !== defaultValue && value.trim() !== "") {
        return false;
      }
    } else if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      if (Array.isArray(value) && value.length > 0) {
        return false;
      }
    }
  }

  return true;
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  index,
  totalCount,
}: ComponentRendererProps) {
  const { moveComponentUp, moveComponentDown } = useBuilderContext();
  const isEmptyOrDefault = isContentEmptyOrDefault(component);

  const baseClassName = `relative p-4 border-2 cursor-pointer transition-all ${
    isSelected
      ? "border-blue-500 bg-blue-50"
      : isEmptyOrDefault
      ? "border-dashed border-orange-400 bg-orange-50/30"
      : "border-transparent hover:border-gray-300"
  }`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index > 0) {
      moveComponentUp(component.id);
    }
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < totalCount - 1) {
      moveComponentDown(component.id);
    }
  };

  const commonProps = {
    component,
    isSelected,
    onSelect: handleClick,
  };

  return (
    <div className={baseClassName} onClick={handleClick}>
      {isSelected && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <button
            onClick={handleMoveUp}
            disabled={index === 0}
            className={`rounded bg-white px-2 py-1 text-xs shadow ${
              index === 0
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title="上移"
          >
            ↑
          </button>
          <button
            onClick={handleMoveDown}
            disabled={index === totalCount - 1}
            className={`rounded bg-white px-2 py-1 text-xs shadow ${
              index === totalCount - 1
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title="下移"
          >
            ↓
          </button>
        </div>
      )}
      {isEmptyOrDefault && !isSelected && (
        <div className="absolute left-2 top-2 z-10 rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
          请编辑内容
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
