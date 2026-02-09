import { NextResponse } from "next/server";
import { createErrorEnvelope } from "./errors";

export function jsonResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json(createErrorEnvelope(message, code, status), {
    status,
  });
}

export function paginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return jsonResponse({
    data: items,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export function parseSearchParams(url: string) {
  const { searchParams } = new URL(url);
  return {
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? 10),
    search: searchParams.get("search") ?? "",
    sort: searchParams.get("sort") ?? "",
    order: (searchParams.get("order") ?? "desc") as "asc" | "desc",
    status: searchParams.get("status") ?? "",
  };
}
