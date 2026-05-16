"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPostApi } from "@/app/lib/api/postApi";
import PostForm from "@/app/components/post/PostForm";
import { showError } from "@/app/lib/api/apiError";

export default function PostWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleCreatePost() {
    try {
      const post = await createPostApi(title, content);
      alert("글 작성 완료");
      router.push(`/posts/${post.postId}`);
    } catch (error) {
      showError(error, "게시글을 작성하지 못했어요. 입력 내용을 확인해주세요.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <section className="border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold">글 작성</h1>

        <PostForm
          title={title}
          content={content}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
          onSubmit={handleCreatePost}
          submitLabel="등록하기"
        />
      </section>
    </main>
  );
}
