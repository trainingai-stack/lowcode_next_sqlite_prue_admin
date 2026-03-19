"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/database/dbClient";
import { updatePageSchema } from "@/lib/builder/schemas";
import { z } from "zod";

// GET /api/builder/pages/[id] - 获取单个页面
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json(
        { error: "页面不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("获取页面失败:", error);
    return NextResponse.json(
      { error: "获取页面失败" },
      { status: 500 }
    );
  }
}

// PUT /api/builder/pages/[id] - 更新页面
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("=== PUT /api/builder/pages/[id] ===");
    console.log("Page ID:", id);
    console.log("Request body:", JSON.stringify(body, null, 2));

    // 如果 components 是字符串，先解析为数组
    let processedBody = { ...body };
    if (typeof processedBody.components === "string") {
      try {
        processedBody.components = JSON.parse(processedBody.components);
      } catch (e) {
        console.error("Failed to parse components JSON:", e);
        processedBody.components = [];
      }
    }

    console.log("Processed body:", JSON.stringify(processedBody, null, 2));

    // 验证请求数据
    const validatedData = updatePageSchema.parse(processedBody);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // 检查页面是否存在
    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json(
        { error: "页面不存在" },
        { status: 404 }
      );
    }

    // 如果更新 slug，检查是否已被其他页面使用
    if (validatedData.slug && validatedData.slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "页面 slug 已存在" },
          { status: 400 }
        );
      }
    }

    // 更新页面
    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        ...(validatedData.title && { title: validatedData.title }),
        ...(validatedData.slug && { slug: validatedData.slug }),
        ...(validatedData.description !== undefined && {
          description: validatedData.description,
        }),
        ...(validatedData.components && {
          components: typeof validatedData.components === "string"
            ? validatedData.components
            : JSON.stringify(validatedData.components)
        }),
      },
    });

    console.log("Updated page:", JSON.stringify(updatedPage, null, 2));
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Catch error type:", error instanceof z.ZodError);
    console.error("Full error:", error);

    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }));
      console.error("Zod validation error details:", JSON.stringify(errorMessages, null, 2));
      return NextResponse.json(
        { error: "数据验证失败", details: errorMessages },
        { status: 400 }
      );
    }

    console.error("更新页面失败:", error);
    return NextResponse.json(
      { error: "更新页面失败", message: error instanceof Error ? error.message : "未知错误" },
      { status: 500 }
    );
  }
}

// DELETE /api/builder/pages/[id] - 删除页面
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查页面是否存在
    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json(
        { error: "页面不存在" },
        { status: 404 }
      );
    }

    // 删除页面
    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除页面失败:", error);
    return NextResponse.json(
      { error: "删除页面失败" },
      { status: 500 }
    );
  }
}
