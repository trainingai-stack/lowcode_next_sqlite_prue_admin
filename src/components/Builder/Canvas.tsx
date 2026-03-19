"use client";

import { useBuilderContext } from "./BuilderProvider";
import { useDragDrop } from "@/hooks/useDragDrop";
import { ComponentRenderer } from "@/components/BuilderComponents/ComponentRenderer";

export function Canvas() {
  const { components, selectedComponentId, selectComponent, reorderComponents } =
    useBuilderContext();

  const { draggedId, dragOverId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragDrop(components, reorderComponents);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {components.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600">从左侧组件库添加组件开始</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          {components.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={() => handleDragStart(component.id)}
              onDragOver={() => handleDragOver(component.id)}
              onDragEnd={handleDragEnd}
              className={`transition-opacity ${
                draggedId === component.id ? "opacity-50" : ""
              } ${dragOverId === component.id ? "border-t-4 border-blue-500" : ""}`}
            >
              <ComponentRenderer
                component={component}
                isSelected={selectedComponentId === component.id}
                onSelect={() => selectComponent(component.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
