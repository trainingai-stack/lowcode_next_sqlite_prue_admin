"use client";

import type { ComponentConfig, SectionProps } from "@/types/builder";

interface SectionComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function SectionComponent({ component }: SectionComponentProps) {
  const { props, style } = component;
  const { title, backgroundColor, padding } = props as SectionProps;

  const paddingClasses: Record<SectionProps["padding"], string> = {
    sm: "py-4 px-4",
    md: "py-8 px-6",
    lg: "py-12 px-8",
  };

  return (
    <div className={`${style?.padding || paddingClasses[padding]} ${backgroundColor || "bg-gray-50"}`}>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="mt-4 text-gray-600">
          <p>区域内容将在此显示</p>
        </div>
      </div>
    </div>
  );
}
