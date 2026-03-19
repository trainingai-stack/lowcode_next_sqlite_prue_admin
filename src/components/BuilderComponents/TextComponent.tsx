"use client";

import type { ComponentConfig } from "@/types/builder";

interface TextComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function TextComponent({ component }: TextComponentProps) {
  const { props, style } = component;
  const { content, fontSize, fontWeight, color } = props;

  const fontSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const fontWeightClasses = {
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <div className={`${style?.padding || "py-4"} ${style?.textAlign ? `text-${style.textAlign}` : ""}`}>
      <p
        className={`${fontSizeClasses[fontSize]} ${fontWeightClasses[fontWeight]} ${color || "text-gray-700"}`}
      >
        {content}
      </p>
    </div>
  );
}
