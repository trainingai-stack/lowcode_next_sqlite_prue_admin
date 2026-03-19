"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/shadcnui/button";

interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BuilderListPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/builder/pages");
      if (!response.ok) throw new Error("获取页面列表失败");
      const data = await response.json();
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取页面列表失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个页面吗？")) return;

    try {
      const response = await fetch(`/api/builder/pages/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("删除失败");
      setPages(pages.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "删除失败");
    }
  };

  const handleCreateNew = async () => {
    const title = prompt("请输入页面标题:");
    if (!title) return;

    const slug = prompt("请输入页面 slug (URL 路径):");
    if (!slug) return;

    try {
      const response = await fetch("/api/builder/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          components: [],
        }),
      });

      if (!response.ok) throw new Error("创建失败");
      const newPage = await response.json();
      router.push(`/builder/${newPage.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "创建失败");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">页面搭建</h1>
            <p className="mt-2 text-gray-600">创建和管理你的个人页面</p>
          </div>
          <Button onClick={handleCreateNew} size="lg">
            + 新建页面
          </Button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">加载中...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
            <p className="text-gray-600 mb-4">还没有创建任何页面</p>
            <Button onClick={handleCreateNew}>创建第一个页面</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {page.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      slug: <code className="bg-gray-100 px-2 py-1 rounded">{page.slug}</code>
                    </p>
                    {page.description && (
                      <p className="mt-2 text-gray-600">{page.description}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      创建于: {new Date(page.createdAt).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/builder/${page.id}`}>
                      <Button variant="outline">编辑</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(page.id)}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
