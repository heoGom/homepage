"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { PostDirection, PostSort } from "@/app/lib/api/postApi";

export function usePostQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);
  const size = getPostSize(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";
  const sort = getPostSort(searchParams.get("sort"));
  const direction = getPostDirection(searchParams.get("direction"));

  function moveToList(
    nextPage = page,
    nextSize = size,
    nextKeyword = keyword,
    nextSort = sort,
    nextDirection = direction,
  ) {
    router.push(
      `/dashboard?page=${nextPage}&size=${nextSize}&keyword=${encodeURIComponent(nextKeyword)}&sort=${nextSort}&direction=${nextDirection}`,
    );
  }

  function moveToDetail(postId: number) {
    router.push(
      `/posts/${postId}?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}&sort=${sort}&direction=${direction}`,
    );
  }

  return {
    page,
    size,
    keyword,
    sort,
    direction,
    moveToList,
    moveToDetail,
  };
}

function getPostSort(value: string | null): PostSort {
  if (value === "likes" || value === "comments" || value === "views") {
    return value;
  }

  return "latest";
}

function getPostDirection(value: string | null): PostDirection {
  return value === "asc" ? "asc" : "desc";
}

function getPostSize(value: string | null) {
  const size = Number(value ?? 5);

  if ([5, 10, 20, 50].includes(size)) {
    return size;
  }

  return 5;
}
