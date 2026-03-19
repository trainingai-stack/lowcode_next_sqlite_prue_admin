"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";
import type { ComponentConfig } from "@/types/builder";
import { useBuilder } from "@/hooks/useBuilder";

interface BuilderContextType {
  components: ComponentConfig[];
  selectedComponentId: string | null;
  canUndo: boolean;
  canRedo: boolean;
  addComponent: (component: ComponentConfig) => void;
  removeComponent: (id: string) => void;
  updateComponent: (component: ComponentConfig) => void;
  reorderComponents: (components: ComponentConfig[]) => void;
  selectComponent: (id: string | null) => void;
  moveComponent: (id: string, direction: "up" | "down") => void;
  undo: () => void;
  redo: () => void;
  copiedComponent: ComponentConfig | null;
  copyComponent: (component: ComponentConfig) => void;
  pasteComponent: () => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({
  children,
  initialComponents = [],
}: {
  children: React.ReactNode;
  initialComponents?: ComponentConfig[];
}) {
  const builder = useBuilder(initialComponents);
  const copiedComponentRef = useRef<ComponentConfig | null>(null);

  const copyComponent = useCallback((component: ComponentConfig) => {
    copiedComponentRef.current = component;
  }, []);

  const pasteComponent = useCallback(() => {
    if (copiedComponentRef.current) {
      const newComponent: ComponentConfig = {
        ...copiedComponentRef.current,
        id: `${copiedComponentRef.current.id}-copy-${Date.now()}`,
        props: { ...copiedComponentRef.current.props },
        style: copiedComponentRef.current.style
          ? { ...copiedComponentRef.current.style }
          : undefined,
      };
      builder.addComponent(newComponent);
    }
  }, [builder]);

  return (
    <BuilderContext.Provider
      value={{
        ...builder,
        copiedComponent: copiedComponentRef.current,
        copyComponent,
        pasteComponent,
      }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilderContext() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilderContext must be used within BuilderProvider");
  }
  return context;
}
