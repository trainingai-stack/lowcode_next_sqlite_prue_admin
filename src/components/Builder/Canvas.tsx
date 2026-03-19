"use client";

import { useEffect, useCallback } from "react";
import { useBuilderContext } from "./BuilderProvider";
import { useDragDrop } from "@/hooks/useDragDrop";
import { ComponentRenderer } from "@/components/BuilderComponents/ComponentRenderer";

export function Canvas() {
  const {
    components,
    selectedComponentId,
    selectComponent,
    reorderComponents,
    moveComponent,
    copyComponent,
    pasteComponent,
  } = useBuilderContext();

  const { draggedId, dragOverId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragDrop(components, reorderComponents);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedComponentId) return;

      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (isInput) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveComponent(selectedComponentId, "up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        moveComponent(selectedComponentId, "down");
      } else if (e.ctrlKey && e.key === "c") {
        const selectedComponent = components.find((c) => c.id === selectedComponentId);
        if (selectedComponent) {
          e.preventDefault();
          copyComponent(selectedComponent);
        }
      } else if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        pasteComponent();
      }
    },
    [selectedComponentId, moveComponent, components, copyComponent, pasteComponent]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const selectedIndex = components.findIndex((c) => c.id === selectedComponentId);
  const canMoveUp = selectedIndex > 0;
  const canMoveDown = selectedIndex < components.length - 1 && selectedIndex !== -1;

  return (
    <div
      className="flex-1 overflow-y-auto bg-white"
      onClick={() => selectComponent(null)}>
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
              } ${dragOverId === component.id ? "border-t-4 border-blue-500" : ""}`}>
              <ComponentRenderer
                component={component}
                isSelected={selectedComponentId === component.id}
                onSelect={() => selectComponent(component.id)}
                canMoveUp={index > 0}
                canMoveDown={index < components.length - 1}
                onMoveUp={() => moveComponent(component.id, "up")}
                onMoveDown={() => moveComponent(component.id, "down")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
