"use client";

import type { ComponentConfig } from "@/types/builder";

interface AvatarComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function AvatarComponent({ component }: AvatarComponentProps) {
  const { props, style } = component;
  const { imageUrl, size, shape } = props;

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-lg",
  };

  return (
    <div className={`${style?.padding || "py-8"} ${style?.textAlign === "center" ? "text-center" : ""}`}>
      <img
        src={imageUrl}
        alt="avatar"
        className={`${sizeClasses[size]} ${shapeClasses[shape]} object-cover mx-auto`}
      />
    </div>
  );
}
