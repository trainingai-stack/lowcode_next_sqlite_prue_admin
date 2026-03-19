"use client";

import type { ComponentConfig } from "@/types/builder";

interface GalleryComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function GalleryComponent({ component }: GalleryComponentProps) {
  const { props, style } = component;
  const { images, columns } = props;

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={`${style?.padding || "py-8"}`}>
      <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-4`}>
        {images.map((image: any, idx: number) => (
          <div key={idx} className="overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.title || `图片 ${idx + 1}`}
              className="h-48 w-full object-cover hover:scale-105 transition-transform"
            />
            {image.title && (
              <p className="mt-2 text-center text-sm font-medium">{image.title}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
