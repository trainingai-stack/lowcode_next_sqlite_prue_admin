"use client";

import { useBuilderContext } from "./BuilderProvider";
import Button from "@/components/shadcnui/button";

interface ToolbarProps {
  pageTitle: string;
  onSave: () => void;
  isSaving: boolean;
}

export function Toolbar({ pageTitle, onSave, isSaving }: ToolbarProps) {
  const { canUndo, canRedo, undo, redo, components } = useBuilderContext();

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-600">
            {components.length} 个组件
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={undo}
            disabled={!canUndo}
            title="撤销 (Ctrl+Z)"
          >
            ↶ 撤销
          </Button>
          <Button
            variant="outline"
            onClick={redo}
            disabled={!canRedo}
            title="重做 (Ctrl+Y)"
          >
            ↷ 重做
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {isSaving ? "保存中..." : "💾 保存"}
          </Button>
        </div>
      </div>
    </div>
  );
}
