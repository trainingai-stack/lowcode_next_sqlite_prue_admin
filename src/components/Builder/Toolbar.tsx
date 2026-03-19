"use client";

import { useBuilderContext } from "./BuilderProvider";
import Button from "@/components/shadcnui/button";

interface ToolbarProps {
  pageTitle: string;
  onSave: () => void;
  isSaving: boolean;
  saveStatus?: "idle" | "saving" | "saved" | "error";
}

export function Toolbar({ pageTitle, onSave, isSaving, saveStatus = "idle" }: ToolbarProps) {
  const { canUndo, canRedo, undo, redo, components } = useBuilderContext();

  const getSaveButtonText = () => {
    if (isSaving || saveStatus === "saving") return "保存中...";
    if (saveStatus === "saved") return "✓ 已保存";
    if (saveStatus === "error") return "⚠ 重试";
    return "💾 保存";
  };

  const getSaveButtonClass = () => {
    if (saveStatus === "saved") return "bg-green-600 hover:bg-green-700 text-white font-semibold";
    if (saveStatus === "error") return "bg-red-600 hover:bg-red-700 text-white font-semibold";
    return "bg-blue-600 hover:bg-blue-700 text-white font-semibold";
  };

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-600">
            {components.length} 个组件
          </p>
        </div>

        <div className="flex gap-3 items-center">
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
            disabled={isSaving || saveStatus === "saving"}
            className={getSaveButtonClass()}
          >
            {getSaveButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}
