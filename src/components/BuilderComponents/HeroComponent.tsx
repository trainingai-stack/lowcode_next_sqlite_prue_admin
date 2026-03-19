"use client";

import type { ComponentConfig } from "@/types/builder";

interface HeroComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function HeroComponent({ component, isSelected, onSelect }: HeroComponentProps) {
  const { props, style } = component;
  const { title, subtitle, backgroundImage, ctaText } = props;

  return (
    <div
      className={`${style?.padding || "py-20"} ${style?.backgroundColor || "bg-gradient-to-r from-blue-500 to-purple-600"} text-gray-900`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-4 text-xl text-gray-700">{subtitle}</p>}
        {ctaText && (
          <button className="mt-8 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100">
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
}
