"use client";

import { useState, useCallback } from "react";
import type { ComponentConfig } from "@/types/builder";

export function useDragDrop(
  components: ComponentConfig[],
  onReorder: (components: ComponentConfig[]) => void
) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const handleDragOver = useCallback((id: string) => {
    setDragOverId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      const draggedIndex = components.findIndex((c) => c.id === draggedId);
      const dragOverIndex = components.findIndex((c) => c.id === dragOverId);

      if (draggedIndex !== -1 && dragOverIndex !== -1) {
        const newComponents = [...components];
        const [draggedComponent] = newComponents.splice(draggedIndex, 1);
        newComponents.splice(dragOverIndex, 0, draggedComponent);
        onReorder(newComponents);
      }
    }

    setDraggedId(null);
    setDragOverId(null);
  }, [draggedId, dragOverId, components, onReorder]);

  return {
    draggedId,
    dragOverId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
