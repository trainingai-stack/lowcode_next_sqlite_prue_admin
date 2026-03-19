"use client";

import { useReducer, useCallback } from "react";
import type { ComponentConfig, BuilderState, BuilderAction } from "@/types/builder";

const initialState: BuilderState = {
  components: [],
  selectedComponentId: null,
  history: [[]],
  historyIndex: 0,
  clipboard: null,
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

    case "MOVE_COMPONENT_UP": {
      const index = state.components.findIndex((c) => c.id === action.payload);
      if (index > 0) {
        const newComponents = [...state.components];
        [newComponents[index - 1], newComponents[index]] = [
          newComponents[index],
          newComponents[index - 1],
        ];
        return {
          ...state,
          components: newComponents,
          history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    }

    case "MOVE_COMPONENT_DOWN": {
      const index = state.components.findIndex((c) => c.id === action.payload);
      if (index < state.components.length - 1) {
        const newComponents = [...state.components];
        [newComponents[index], newComponents[index + 1]] = [
          newComponents[index + 1],
          newComponents[index],
        ];
        return {
          ...state,
          components: newComponents,
          history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    }

    case "COPY_COMPONENT": {
      const component = state.components.find((c) => c.id === action.payload);
      if (component) {
        return {
          ...state,
          clipboard: component,
        };
      }
      return state;
    }

    case "PASTE_COMPONENT": {
      if (state.clipboard) {
        const newComponent = {
          ...state.clipboard,
          id: `${state.clipboard.id}-${Date.now()}`,
        };
        const newComponents = [...state.components, newComponent];
        return {
          ...state,
          components: newComponents,
          history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
          historyIndex: state.historyIndex + 1,
          selectedComponentId: newComponent.id,
        };
      }
      return state;
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

  const moveComponentUp = useCallback((id: string) => {
    dispatch({ type: "MOVE_COMPONENT_UP", payload: id });
  }, []);

  const moveComponentDown = useCallback((id: string) => {
    dispatch({ type: "MOVE_COMPONENT_DOWN", payload: id });
  }, []);

  const copyComponent = useCallback((id: string) => {
    dispatch({ type: "COPY_COMPONENT", payload: id });
  }, []);

  const pasteComponent = useCallback(() => {
    dispatch({ type: "PASTE_COMPONENT" });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  return {
    components: state.components,
    selectedComponentId: state.selectedComponentId,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    hasClipboard: state.clipboard !== null,
    addComponent,
    removeComponent,
    updateComponent,
    reorderComponents,
    selectComponent,
    moveComponentUp,
    moveComponentDown,
    copyComponent,
    pasteComponent,
    undo,
    redo,
  };
}
