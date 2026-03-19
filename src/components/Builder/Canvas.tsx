"use client";

import { useBuilderContext } from "./BuilderProvider";
import { useDragDrop } from "@/hooks/useDragDrop";
import { ComponentRenderer } from "@/components/BuilderComponents/ComponentRenderer";
import { useEffect, useCallback } from "react";

export function Canvas() {
  const {
    components,
    selectedComponentId,
    selectComponent,
    reorderComponents,
    moveComponentUp,
    moveComponentDown,
    copyComponent,
    pasteComponent,
  } = useBuilderContext();

  const { draggedId, dragOverId, handleDragStart, handleDragOver, handleDragEnd } =
    useDragDrop(components, reorderComponents);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedComponentId) return;

      // 方向键上下移动
      if (e.key === "ArrowUp" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        moveComponentUp(selectedComponentId);
      } else if (e.key === "ArrowDown" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        moveComponentDown(selectedComponentId);
      }

      // Ctrl+C / Cmd+C 复制
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        copyComponent(selectedComponentId);
      }

      // Ctrl+V / Cmd+V 粘贴
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        pasteComponent();
      }
    },
    [selectedComponentId, moveComponentUp, moveComponentDown, copyComponent, pasteComponent]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
