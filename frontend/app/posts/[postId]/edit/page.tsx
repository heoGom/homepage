"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostApi, updatePostApi, type Post } from "@/app/lib/api/postApi";
import PostForm from "@/app/components/post/PostForm";
import { useAuth } from "@/app/hooks/useAuth";
import { showError } from "@/app/lib/api/apiError";

export default function PostEditPage() {
  const params = useParams();
  const router = useRouter();

  const { me, loading } = useAuth();

  const [post, setPost] = useState<Post | null>(null);

  const rawPostId = params.postId;
  const postId = typeof rawPostId === "string" ? rawPostId : "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!postId) return;

    async function fetchPost() {
      try {
        const data = await getPostApi(postId);
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        showError(error, "게시글을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
        router.push("/dashboard");
      }
    }

    void fetchPost();
  }, [postId, router]);

  useEffect(() => {
    if (!loading && post && me?.email !== post.email) {
      router.push(`/posts/${postId}`);
    }
  }, [loading, post, me, postId, router]);

  async function handleUpdate() {
    try {
      await updatePostApi(postId, title, content);

      alert("수정 완료");
      router.push(`/posts/${postId}`);
    } catch (error) {
      showError(error, "게시글을 수정하지 못했어요. 작성자만 수정할 수 있어요.");
    }
  }

  if (!postId) {
    return <main className="p-6">잘못된 접근입니다.</main>;
  }

  if (loading || !post) {
    return <main className="p-6">로딩 중...</main>;
  }

  if (me?.email !== post.email) {
    return <main className="p-6">권한이 없습니다.</main>;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="space-y-4">
        <PostForm
          title={title}
          content={content}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
          onSubmit={handleUpdate}
          submitLabel="수정하기"
        />
      </div>
    </main>
  );
}
