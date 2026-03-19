import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Builder - 创建你的个人页面",
  description: "快速搭建个人介绍页面，无需编码，拖拽即可完成",
};

const page = () => {
  return (
    <section className="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:py-20">
          {/* 左侧文案 */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 lg:text-6xl">
                打造你的专属页面
              </h1>
              <p className="text-xl text-gray-600">
                无需编码，拖拽即可。为自媒体创作者量身定制的页面搭建平台。
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    零代码搭建
                  </h3>
                  <p className="text-sm">
                    拖拽组件即可完成页面设计，无需任何编程知识
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    实时预览
                  </h3>
                  <p className="text-sm">
                    编辑即看到效果，所见即所得的设计体验
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    丰富组件
                  </h3>
                  <p className="text-sm">
                    10+ 精心设计的组件，满足各种页面需求
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    云端保存
                  </h3>
                  <p className="text-sm">
                    页面数据自动保存，随时随地访问你的作品
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700">
                立刻创建你的页面
                <span className="ml-2">→</span>
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-8 py-4 font-semibold text-gray-900 transition-all hover:border-gray-400">
                查看示例
              </Link>
            </div>
          </div>

          {/* 右侧图示 */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-600 opacity-20 blur-2xl"></div>
              <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="h-3 w-24 rounded bg-gray-200"></div>
                  <div className="h-2 w-full rounded bg-gray-100"></div>
                  <div className="h-2 w-5/6 rounded bg-gray-100"></div>

                  <div className="space-y-3 pt-4">
                    <div className="flex gap-2">
                      <div className="h-12 w-12 rounded-lg bg-blue-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-2 w-1/2 rounded bg-gray-100"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-12 w-12 rounded-lg bg-purple-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-2 w-1/2 rounded bg-gray-100"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-12 w-12 rounded-lg bg-pink-100"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-2 w-1/2 rounded bg-gray-100"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white">
                      保存
                    </button>
                    <button className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700">
                      预览
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部特性 */}
        <div className="mt-20 grid gap-8 border-t border-gray-200 pt-12 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              10+
            </div>
            <p className="mt-2 text-gray-600">
              精心设计的组件
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              ∞
            </div>
            <p className="mt-2 text-gray-600">
              无限创意可能
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              100%
            </div>
            <p className="mt-2 text-gray-600">
              免费使用
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
