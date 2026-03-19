"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { BuilderProvider } from "@/components/Builder/BuilderProvider";
import { Toolbar } from "@/components/Builder/Toolbar";
import { ComponentPanel } from "@/components/Builder/ComponentPanel";
import { Canvas } from "@/components/Builder/Canvas";
import { PropertyPanel } from "@/components/Builder/PropertyPanel";
import { useBuilderContext } from "@/components/Builder/BuilderProvider";
import type { ComponentConfig } from "@/types/builder";

interface PageData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  components: ComponentConfig[];
}

function BuilderEditorContent({ pageId, pageData }: { pageId: string; pageData: PageData }) {
  const { components } = useBuilderContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedComponentsRef = useRef<string>(JSON.stringify(components));

  // 实时保存函数（防抖）
  const autoSave = useCallback(async () => {
    if (!pageData) return;

    const currentComponentsStr = JSON.stringify(components);
    
    // 检查是否有变化
    if (currentComponentsStr === lastSavedComponentsRef.current) {
      return;
    }

    // 清除之前的定时器
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // 设置新的定时器，500ms 后保存
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setSaveStatus("saving");
        const saveData = {
          title: pageData.title,
          slug: pageData.slug,
          description: pageData.description,
          components: currentComponentsStr,
        };

        const response = await fetch(`/api/builder/pages/${pageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saveData),
        });

        if (!response.ok) {
          throw new Error("保存失败");
        }

        lastSavedComponentsRef.current = currentComponentsStr;
        setSaveStatus("saved");
        
        // 2秒后恢复状态
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err) {
        console.error("Auto save error:", err);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    }, 500);
  }, [pageId, pageData, components]);

  // 监听 components 变化，触发自动保存
  useEffect(() => {
    autoSave();
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [autoSave]);

  // 手动保存
  const handleSave = async () => {
    if (!pageData) return;

    try {
      setIsSaving(true);
      setSaveStatus("saving");
      const saveData = {
        title: pageData.title,
        slug: pageData.slug,
        description: pageData.description,
        components: JSON.stringify(components),
      };

      const response = await fetch(`/api/builder/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        throw new Error("保存失败");
      }

      lastSavedComponentsRef.current = JSON.stringify(components);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
      alert("页面已保存");
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      alert(err instanceof Error ? err.message : "保存失败");
    } finally {
      setIsSaving(false);
    }
  };

  if (!pageData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col pt-16">
      <Toolbar
        pageTitle={pageData.title}
        onSave={handleSave}
        isSaving={isSaving}
        saveStatus={saveStatus}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 overflow-y-auto">
          <ComponentPanel />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Canvas />
        </div>
        <div className="w-80 overflow-y-auto">
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
}

export default function BuilderEditorPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setPageId(p.pageId));
  }, [params]);

  useEffect(() => {
    if (!pageId) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/builder/pages/${pageId}`);
        if (!response.ok) throw new Error("获取页面失败");
        const data = await response.json();

        // 解析 components JSON 字符串
        const parsedData = {
          ...data,
          components: typeof data.components === "string"
            ? JSON.parse(data.components)
            : data.components,
        };

        setPageData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "获取页面失败");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageId]);

  if (!pageId) {
    return <div>加载中...</div>;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = "/builder"}
            className="text-blue-600 hover:underline"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  if (loading || !pageData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  return (
    <BuilderProvider initialComponents={pageData.components}>
      <BuilderEditorContent pageId={pageId} pageData={pageData} />
    </BuilderProvider>
  );
}
