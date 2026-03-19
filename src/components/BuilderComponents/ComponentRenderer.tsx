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

interface ComponentRendererProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
}: ComponentRendererProps) {
  const baseClassName = `relative p-4 border-2 cursor-pointer transition-all ${
    isSelected
      ? "border-blue-500 bg-blue-50"
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
