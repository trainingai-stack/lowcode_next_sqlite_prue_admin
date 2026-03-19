"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/database/dbClient";
import { createPageSchema } from "@/lib/builder/schemas";
import { z } from "zod";

// GET /api/builder/pages - 获取页面列表
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("获取页面列表失败:", error);
    return NextResponse.json(
      { error: "获取页面列表失败" },
      { status: 500 }
    );
  }
}

// POST /api/builder/pages - 创建页面
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证请求数据
    const validatedData = createPageSchema.parse(body);

    // 检查 slug 是否已存在
    const existingPage = await prisma.page.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: "页面 slug 已存在" },
        { status: 400 }
      );
    }

    // 创建页面
    const page = await prisma.page.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        components: JSON.stringify(validatedData.components),
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "数据验证失败", details: error.errors },
        { status: 400 }
      );
    }

    console.error("创建页面失败:", error);
    return NextResponse.json(
      { error: "创建页面失败" },
      { status: 500 }
    );
  }
}
