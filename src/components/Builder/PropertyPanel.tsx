"use client";

import { useBuilderContext } from "./BuilderProvider";
import { componentNames } from "@/lib/builder/defaults";
import Button from "@/components/shadcnui/button";

export function PropertyPanel() {
  const {
    components,
    selectedComponentId,
    removeComponent,
    updateComponent,
  } = useBuilderContext();

  const selectedComponent = components.find((c) => c.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <div className="h-full border-l border-gray-200 bg-gray-50 p-4">
        <p className="text-center text-gray-600">选择一个组件来编辑属性</p>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    updateComponent({
      ...selectedComponent,
      props: {
        ...selectedComponent.props,
        [key]: value,
      },
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    updateComponent({
      ...selectedComponent,
      style: {
        ...selectedComponent.style,
        [key]: value,
      },
    });
  };

  const handleDelete = () => {
    if (confirm("确定要删除这个组件吗？") && selectedComponentId) {
      removeComponent(selectedComponentId);
    }
  };

  return (
    <div className="h-full overflow-y-auto border-l border-gray-200 bg-gray-50 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {componentNames[selectedComponent.type]}
        </h2>
        <p className="text-xs text-gray-600">ID: {selectedComponent.id}</p>
      </div>

      {/* 组件属性编辑 */}
      <div className="mb-6 space-y-4">
        <h3 className="font-medium text-gray-900">属性</h3>

        {selectedComponent.type === "hero" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                标题
              </label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange("title", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                副标题
              </label>
              <input
                type="text"
                value={selectedComponent.props.subtitle || ""}
                onChange={(e) => handlePropChange("subtitle", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                按钮文本
              </label>
              <input
                type="text"
                value={selectedComponent.props.ctaText || ""}
                onChange={(e) => handlePropChange("ctaText", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

        {selectedComponent.type === "avatar" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                图片 URL
              </label>
              <input
                type="text"
                value={selectedComponent.props.imageUrl}
                onChange={(e) => handlePropChange("imageUrl", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                大小
              </label>
              <select
                value={selectedComponent.props.size}
                onChange={(e) => handlePropChange("size", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
                <option value="xl">超大</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                形状
              </label>
              <select
                value={selectedComponent.props.shape}
                onChange={(e) => handlePropChange("shape", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="circle">圆形</option>
                <option value="square">方形</option>
                <option value="rounded">圆角</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent.type === "text" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                内容
              </label>
              <textarea
                value={selectedComponent.props.content}
                onChange={(e) => handlePropChange("content", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                字体大小
              </label>
              <select
                value={selectedComponent.props.fontSize}
                onChange={(e) => handlePropChange("fontSize", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="sm">小</option>
                <option value="base">正常</option>
                <option value="lg">大</option>
                <option value="xl">更大</option>
                <option value="2xl">最大</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                字体粗细
              </label>
              <select
                value={selectedComponent.props.fontWeight}
                onChange={(e) => handlePropChange("fontWeight", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="normal">正常</option>
                <option value="semibold">半粗</option>
                <option value="bold">粗体</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent.type === "button" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                按钮文本
              </label>
              <input
                type="text"
                value={selectedComponent.props.text}
                onChange={(e) => handlePropChange("text", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                链接
              </label>
              <input
                type="text"
                value={selectedComponent.props.link || ""}
                onChange={(e) => handlePropChange("link", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                样式
              </label>
              <select
                value={selectedComponent.props.variant}
                onChange={(e) => handlePropChange("variant", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="default">默认</option>
                <option value="outline">边框</option>
                <option value="ghost">幽灵</option>
                <option value="secondary">次要</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                大小
              </label>
              <select
                value={selectedComponent.props.size}
                onChange={(e) => handlePropChange("size", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent.type === "contact" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <input
                type="email"
                value={selectedComponent.props.email || ""}
                onChange={(e) => handlePropChange("email", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                电话
              </label>
              <input
                type="text"
                value={selectedComponent.props.phone || ""}
                onChange={(e) => handlePropChange("phone", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地址
              </label>
              <input
                type="text"
                value={selectedComponent.props.address || ""}
                onChange={(e) => handlePropChange("address", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

        {selectedComponent.type === "card" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                标题
              </label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange("title", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                描述
              </label>
              <textarea
                value={selectedComponent.props.description}
                onChange={(e) => handlePropChange("description", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                图片 URL
              </label>
              <input
                type="text"
                value={selectedComponent.props.image || ""}
                onChange={(e) => handlePropChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                链接
              </label>
              <input
                type="text"
                value={selectedComponent.props.link || ""}
                onChange={(e) => handlePropChange("link", e.target.value)}
                placeholder="https://example.com"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

        {selectedComponent.type === "divider" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                样式
              </label>
              <select
                value={selectedComponent.props.style}
                onChange={(e) => handlePropChange("style", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                颜色
              </label>
              <select
                value={selectedComponent.props.color}
                onChange={(e) => handlePropChange("color", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="border-gray-300">灰色</option>
                <option value="border-gray-400">深灰色</option>
                <option value="border-blue-300">蓝色</option>
                <option value="border-red-300">红色</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent.type === "social" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                大小
              </label>
              <select
                value={selectedComponent.props.size}
                onChange={(e) => handlePropChange("size", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                社交链接
              </label>
              <div className="space-y-3">
                {(selectedComponent.props.links || []).map((link: any, idx: number) => (
                  <div key={idx} className="rounded border border-gray-300 p-3 space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        平台
                      </label>
                      <select
                        value={link.platform}
                        onChange={(e) => {
                          const newLinks = [...(selectedComponent.props.links || [])];
                          newLinks[idx].platform = e.target.value;
                          handlePropChange("links", newLinks);
                        }}
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs"
                      >
                        <option value="twitter">Twitter</option>
                        <option value="github">GitHub</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        链接
                      </label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...(selectedComponent.props.links || [])];
                          newLinks[idx].url = e.target.value;
                          handlePropChange("links", newLinks);
                        }}
                        placeholder="https://example.com"
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newLinks = (selectedComponent.props.links || []).filter((_: any, i: number) => i !== idx);
                        handlePropChange("links", newLinks);
                      }}
                      className="w-full rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                    >
                      删除链接
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newLinks = [...(selectedComponent.props.links || []), { platform: "twitter", url: "" }];
                  handlePropChange("links", newLinks);
                }}
                className="mt-3 w-full rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
              >
                + 添加链接
              </button>
            </div>
          </>
        )}

        {selectedComponent.type === "gallery" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                列数
              </label>
              <select
                value={selectedComponent.props.columns}
                onChange={(e) => handlePropChange("columns", parseInt(e.target.value))}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="1">1 列</option>
                <option value="2">2 列</option>
                <option value="3">3 列</option>
                <option value="4">4 列</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片列表
              </label>
              <div className="space-y-3">
                {(selectedComponent.props.images || []).map((image: any, idx: number) => (
                  <div key={idx} className="rounded border border-gray-300 p-3 space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        图片 {idx + 1} - URL
                      </label>
                      <input
                        type="text"
                        value={image.url}
                        onChange={(e) => {
                          const newImages = [...(selectedComponent.props.images || [])];
                          newImages[idx].url = e.target.value;
                          handlePropChange("images", newImages);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        标题（可选）
                      </label>
                      <input
                        type="text"
                        value={image.title || ""}
                        onChange={(e) => {
                          const newImages = [...(selectedComponent.props.images || [])];
                          newImages[idx].title = e.target.value;
                          handlePropChange("images", newImages);
                        }}
                        placeholder="图片标题"
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newImages = (selectedComponent.props.images || []).filter((_: any, i: number) => i !== idx);
                        handlePropChange("images", newImages);
                      }}
                      className="w-full rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                    >
                      删除图片
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newImages = [...(selectedComponent.props.images || []), { url: "", title: "" }];
                  handlePropChange("images", newImages);
                }}
                className="mt-3 w-full rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
              >
                + 添加图片
              </button>
            </div>
          </>
        )}

        {selectedComponent.type === "section" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                标题
              </label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange("title", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                内边距
              </label>
              <select
                value={selectedComponent.props.padding}
                onChange={(e) => handlePropChange("padding", e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* 删除按钮 */}
      <div className="border-t border-gray-200 pt-4">
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="w-full"
        >
          删除组件
        </Button>
      </div>
    </div>
  );
}
