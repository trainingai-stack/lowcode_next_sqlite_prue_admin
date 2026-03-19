"use client";

import type { ComponentConfig } from "@/types/builder";

interface SocialComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function SocialComponent({ component }: SocialComponentProps) {
  const { props, style } = component;
  const { links, size } = props;

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const platformIcons: Record<string, string> = {
    twitter: "𝕏",
    github: "⚙️",
    linkedin: "in",
    instagram: "📷",
    youtube: "▶️",
  };

  return (
    <div className={`${style?.padding || "py-8"} ${style?.textAlign === "center" ? "text-center" : ""}`}>
      <div className="flex gap-4 justify-center">
        {links.map((link: any, idx: number) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors`}
            title={link.platform}
          >
            {platformIcons[link.platform]}
          </a>
        ))}
      </div>
    </div>
  );
}
