"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getPostApi,
  deletePostApi,
  togglePostLikeApi,
  type Post,
} from "@/app/lib/api/postApi";
import { useAuth } from "../../hooks/useAuth";
import CommentSection from "@/app/components/comment/CommentSection";
import { showError } from "@/app/lib/api/apiError";
import { formatBoardDateTime } from "@/app/lib/formatDateTime";

function PostDetailContent() {
  const params = useParams();
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "5";
  const keyword = searchParams.get("keyword") ?? "";
  const sort = searchParams.get("sort") ?? "latest";
  const direction = searchParams.get("direction") ?? "desc";

  const { me, loading } = useAuth();

  const rawPostId = params.postId;
  const postId = typeof rawPostId === "string" ? rawPostId : "";

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostApi(postId);
        setPost(data);
      } catch (error) {
        showError(error, "게시글을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
        router.push("/dashboard");
      }
    }

    if (postId) {
      void fetchPost();
    }
  }, [postId, router]);

  async function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePostApi(postId);

      alert("삭제 완료");

      router.push("/dashboard");
    } catch (error) {
      showError(error, "게시글을 삭제하지 못했어요. 작성자만 삭제할 수 있어요.");
    }
  }

  async function handleToggleLike() {
    try {
      const result = await togglePostLikeApi(postId);
      setPost((current) =>
        current
          ? {
              ...current,
              likeCount: result.likeCount,
              liked: result.liked,
            }
          : current,
      );
    } catch (error) {
      showError(error, "좋아요를 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  if (!postId) {
    return <main className="p-6">잘못된 접근입니다.</main>;
  }

  if (loading || !post) {
    return <main className="p-6">로딩 중...</main>;
  }

  const isOwner = me?.email === post.email;

  return (
    <main className="mx-auto w-full max-w-3xl overflow-x-hidden px-4 py-6 sm:px-6">
      <div className="space-y-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">
        <h1 className="break-words text-2xl font-bold">{post.title}</h1>

        <p className="text-sm text-gray-500">
          작성자: {post.nickname} ({post.email})
        </p>

        <p className="text-sm text-gray-500">
          작성시간 {formatBoardDateTime(post.createdAt)}
        </p>

        <p className="text-sm text-gray-500">
          좋아요 {post.likeCount} · 댓글 {post.commentCount} · 조회 {post.viewCount}
        </p>

        <p className="whitespace-pre-wrap break-words leading-7">{post.content}</p>

        <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
          <button
            className={`min-h-11 rounded px-4 py-2 text-white ${
              post.liked ? "bg-rose-600" : "bg-gray-800 dark:bg-gray-700"
            }`}
            onClick={handleToggleLike}
            type="button"
          >
            {post.liked ? "좋아요 취소" : "좋아요"} {post.likeCount}
          </button>

          <button
            className="min-h-11 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
            onClick={() =>
              router.push(
                `/dashboard?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}&sort=${sort}&direction=${direction}`,
              )
            }
          >
            목록으로
          </button>

          {isOwner && (
            <>
              <button
                className="min-h-11 rounded bg-blue-600 px-4 py-2 text-white"
                onClick={() => router.push(`/posts/${postId}/edit`)}
              >
                수정
              </button>

              <button
                className="min-h-11 rounded bg-red-600 px-4 py-2 text-white"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      <CommentSection postId={postId} meEmail={me?.email} />
    </main>
  );
}

export default function PostDetailPage() {
  return (
    <Suspense fallback={<main className="p-6">로딩 중...</main>}>
      <PostDetailContent />
    </Suspense>
  );
}
