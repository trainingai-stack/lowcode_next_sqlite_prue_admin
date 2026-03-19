"use client";

import type { ComponentConfig } from "@/types/builder";
import Button from "@/components/shadcnui/button";

interface ButtonComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function ButtonComponent({ component }: ButtonComponentProps) {
  const { props, style } = component;
  const { text, variant, size } = props;

  return (
    <div className={`${style?.padding || "py-4"} ${style?.textAlign === "center" ? "text-center" : ""}`}>
      <Button variant={variant} size={size}>
        {text}
      </Button>
    </div>
  );
}
