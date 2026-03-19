"use client";

import React, { createContext, useContext } from "react";
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
  undo: () => void;
  redo: () => void;
  moveComponentUp: (id: string) => void;
  moveComponentDown: (id: string) => void;
  duplicateComponent: (component: ComponentConfig) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({
  children,
  initialComponents = [],
}: {
  children: React.ReactNode;
  initialComponents?: ComponentConfig[];
}) {
  const builder = useBuilder(initialComponents);

  return (
    <BuilderContext.Provider value={builder}>
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
