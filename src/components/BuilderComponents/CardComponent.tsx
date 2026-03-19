"use client";

import type { ComponentConfig } from "@/types/builder";

interface CardComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function CardComponent({ component }: CardComponentProps) {
  const { props, style } = component;
  const { title, description, image, link } = props;

  const cardContent = (
    <div className={`${style?.padding || "p-4"} rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow`}>
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-4 h-48 w-full rounded-lg object-cover"
        />
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className={`${style?.padding || "p-4"}`}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}
