"use client";

import { v4 as uuidv4 } from "uuid";
import { useBuilderContext } from "./BuilderProvider";
import { componentDefaults, componentNames, componentIcons } from "@/lib/builder/defaults";
import type { ComponentType } from "@/types/builder";

const componentTypes: ComponentType[] = [
  "hero",
  "avatar",
  "text",
  "button",
  "gallery",
  "contact",
  "social",
  "divider",
  "card",
  "section",
];

export function ComponentPanel() {
  const { addComponent } = useBuilderContext();

  const handleAddComponent = (type: ComponentType) => {
    const defaultConfig = componentDefaults[type];
    const newComponent = {
      ...defaultConfig,
      id: uuidv4(),
    };
    addComponent(newComponent);
  };

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">组件库</h2>
      <div className="space-y-2">
        {componentTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleAddComponent(type)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-left hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{componentIcons[type]}</span>
              <div>
                <div className="font-medium text-gray-900">
                  {componentNames[type]}
                </div>
                <div className="text-xs text-gray-600">点击添加</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
