"use client";

import { useEffect, useCallback, useState } from "react";
import { useBuilderContext } from "./BuilderProvider";
import { useDragDrop } from "@/hooks/useDragDrop";
import { ComponentRenderer } from "@/components/BuilderComponents/ComponentRenderer";
import type { ComponentConfig } from "@/types/builder";

export function Canvas() {
  const {
    components,
    selectedComponentId,
    selectComponent,
    reorderComponents,
    moveComponentUp,
    moveComponentDown,
    duplicateComponent,
  } = useBuilderContext();

  const [copiedComponent, setCopiedComponent] = useState<ComponentConfig | null>(null);

  const { draggedId, dragOverId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragDrop(components, reorderComponents);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedComponentId) return;

      const currentIndex = components.findIndex((c) => c.id === selectedComponentId);
      if (currentIndex === -1) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          moveComponentUp(selectedComponentId);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < components.length - 1) {
          moveComponentDown(selectedComponentId);
        }
      } else if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        const componentToCopy = components.find((c) => c.id === selectedComponentId);
        if (componentToCopy) {
          setCopiedComponent(componentToCopy);
        }
      } else if (e.key === "v" && e.ctrlKey) {
        e.preventDefault();
        if (copiedComponent) {
          const newComponent = {
            ...copiedComponent,
            id: `${copiedComponent.type}_${Date.now()}`,
          };
          duplicateComponent(newComponent);
        }
      }
    },
    [selectedComponentId, components, moveComponentUp, moveComponentDown, copiedComponent, duplicateComponent]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
          {components.map((component, index) => (
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
                index={index}
                totalCount={components.length}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
