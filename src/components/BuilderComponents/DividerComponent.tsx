"use client";

import type { ComponentConfig } from "@/types/builder";

interface DividerComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function DividerComponent({ component }: DividerComponentProps) {
  const { props, style } = component;
  const { style: dividerStyle, color } = props;

  const styleClasses = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  return (
    <div className={`${style?.margin || "my-8"}`}>
      <hr className={`border-t-2 ${styleClasses[dividerStyle as keyof typeof styleClasses]} ${color || "border-gray-300"}`} />
    </div>
  );
}
