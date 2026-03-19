"use client";

import type { ComponentConfig } from "@/types/builder";

interface ContactComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export function ContactComponent({ component }: ContactComponentProps) {
  const { props, style } = component;
  const { email, phone, address } = props;

  return (
    <div className={`${style?.padding || "py-8"} ${style?.textAlign === "center" ? "text-center" : ""}`}>
      <h3 className="text-lg font-semibold mb-4">联系方式</h3>
      <div className="space-y-2 text-gray-700">
        {email && (
          <p>
            📧 <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
          </p>
        )}
        {phone && (
          <p>
            📱 <a href={`tel:${phone}`} className="text-blue-600 hover:underline">{phone}</a>
          </p>
        )}
        {address && (
          <p>
            📍 {address}
          </p>
        )}
      </div>
    </div>
  );
}
