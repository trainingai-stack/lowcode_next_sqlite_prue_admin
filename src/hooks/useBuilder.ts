"use client";

import { useReducer, useCallback } from "react";
import type { ComponentConfig, BuilderState, BuilderAction } from "@/types/builder";

const initialState: BuilderState = {
  components: [],
  selectedComponentId: null,
  history: [[]],
  historyIndex: 0,
};

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newComponents = [...state.components, action.payload];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
        selectedComponentId: action.payload.id,
      };
    }

    case "REMOVE_COMPONENT": {
      const newComponents = state.components.filter(
        (c) => c.id !== action.payload
      );
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
        selectedComponentId:
          state.selectedComponentId === action.payload
            ? null
            : state.selectedComponentId,
      };
    }

    case "UPDATE_COMPONENT": {
      const newComponents = state.components.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case "REORDER_COMPONENTS": {
      return {
        ...state,
        components: action.payload,
        history: [...state.history.slice(0, state.historyIndex + 1), action.payload],
        historyIndex: state.historyIndex + 1,
      };
    }

    case "SELECT_COMPONENT": {
      return {
        ...state,
        selectedComponentId: action.payload,
      };
    }

    case "UNDO": {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state,
          components: state.history[newIndex],
          historyIndex: newIndex,
          selectedComponentId: null,
        };
      }
      return state;
    }

    case "REDO": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state,
          components: state.history[newIndex],
          historyIndex: newIndex,
          selectedComponentId: null,
        };
      }
      return state;
    }

    case "MOVE_COMPONENT_UP": {
      const index = state.components.findIndex((c) => c.id === action.payload);
      if (index <= 0) return state;
      const newComponents = [...state.components];
      [newComponents[index - 1], newComponents[index]] = [newComponents[index], newComponents[index - 1]];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case "MOVE_COMPONENT_DOWN": {
      const index = state.components.findIndex((c) => c.id === action.payload);
      if (index === -1 || index >= state.components.length - 1) return state;
      const newComponents = [...state.components];
      [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case "DUPLICATE_COMPONENT": {
      const newComponents = [...state.components, action.payload];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
        selectedComponentId: action.payload.id,
      };
    }

    default:
      return state;
  }
}

export function useBuilder(initialComponents: ComponentConfig[] = []) {
  const [state, dispatch] = useReducer(builderReducer, {
    ...initialState,
    components: initialComponents,
    history: [initialComponents],
  });

  const addComponent = useCallback((component: ComponentConfig) => {
    dispatch({ type: "ADD_COMPONENT", payload: component });
  }, []);

  const removeComponent = useCallback((id: string) => {
    dispatch({ type: "REMOVE_COMPONENT", payload: id });
  }, []);

  const updateComponent = useCallback((component: ComponentConfig) => {
    dispatch({ type: "UPDATE_COMPONENT", payload: component });
  }, []);

  const reorderComponents = useCallback((components: ComponentConfig[]) => {
    dispatch({ type: "REORDER_COMPONENTS", payload: components });
  }, []);

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", payload: id });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  const moveComponentUp = useCallback((id: string) => {
    dispatch({ type: "MOVE_COMPONENT_UP", payload: id });
  }, []);

  const moveComponentDown = useCallback((id: string) => {
    dispatch({ type: "MOVE_COMPONENT_DOWN", payload: id });
  }, []);

  const duplicateComponent = useCallback((component: ComponentConfig) => {
    dispatch({ type: "DUPLICATE_COMPONENT", payload: component });
  }, []);

  return {
    components: state.components,
    selectedComponentId: state.selectedComponentId,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    addComponent,
    removeComponent,
    updateComponent,
    reorderComponents,
    selectComponent,
    undo,
    redo,
    moveComponentUp,
    moveComponentDown,
    duplicateComponent,
  };
}
