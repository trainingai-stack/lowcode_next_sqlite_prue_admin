"use client";

import type { ComponentConfig, DividerProps } from "@/types/builder";

interface DividerComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function DividerComponent({ component }: DividerComponentProps) {
  const { props, style } = component;
  const { style: dividerStyle, color } = props as DividerProps;

  const styleClasses: Record<DividerProps["style"], string> = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  return (
    <div className={`${style?.margin || "my-8"}`}>
      <hr className={`border-t-2 ${styleClasses[dividerStyle]} ${color || "border-gray-300"}`} />
    </div>
  );
}
