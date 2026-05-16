"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCommentApi,
  deleteCommentApi,
  getCommentsApi,
  toggleCommentLikeApi,
  updateCommentApi,
  type Comment,
  type CommentLikeResponse,
} from "@/app/lib/api/commentApi";
import { showError } from "@/app/lib/api/apiError";
import { formatBoardDateTime } from "@/app/lib/formatDateTime";

type CommentSectionProps = {
  postId: string;
  meEmail?: string;
};

export default function CommentSection({ postId, meEmail }: CommentSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const fetchComments = useCallback(async () => {
    const data = await getCommentsApi(postId);
    setComments(data);
  }, [postId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchComments();
  }, [fetchComments]);

  async function handleCreate(parentId?: number) {
    const nextContent = parentId ? replyInputs[parentId] : content;
    if (!nextContent?.trim()) return;

    try {
      await createCommentApi(postId, nextContent, parentId);
      if (parentId) {
        setReplyInputs((prev) => ({ ...prev, [parentId]: "" }));
      } else {
        setContent("");
      }
      await fetchComments();
    } catch (error) {
      showError(error, "댓글을 작성하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  async function handleDelete(commentId: number) {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteCommentApi(commentId);
      await fetchComments();
    } catch (error) {
      showError(error, "댓글을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  async function handleUpdate(commentId: number) {
    if (!editingContent.trim()) return;

    try {
      await updateCommentApi(commentId, editingContent);
      setEditingCommentId(null);
      setEditingContent("");
      await fetchComments();
    } catch (error) {
      showError(error, "댓글을 수정하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  function updateCommentLikeState(
    items: Comment[],
    result: CommentLikeResponse,
  ): Comment[] {
    return items.map((item) => {
      if (item.commentId === result.commentId) {
        return {
          ...item,
          liked: result.liked,
          likeCount: result.likeCount,
        };
      }

      return {
        ...item,
        replies: updateCommentLikeState(item.replies, result),
      };
    });
  }

  async function handleToggleLike(commentId: number) {
    if (!meEmail) {
      alert("로그인 후 댓글 좋아요를 누를 수 있어요.");
      router.push("/login");
      return;
    }

    try {
      const result = await toggleCommentLikeApi(commentId);
      setComments((current) => updateCommentLikeState(current, result));
    } catch (error) {
      showError(error, "댓글 좋아요를 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  function renderComment(comment: Comment, isReply = false) {
    const isOwner = meEmail === comment.email;
    const isEditing = editingCommentId === comment.commentId;

    return (
      <div
        key={comment.commentId}
        className={`rounded border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 ${isReply ? "ml-3 mt-2 sm:ml-6" : ""}`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="text-sm text-gray-500">
              {comment.nickname} ({comment.email}) · 작성시간{" "}
              {formatBoardDateTime(comment.createdAt)}
            </p>
            {isEditing ? (
              <input
                className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
            ) : (
              <p className={`break-words ${comment.deleted ? "text-gray-400" : ""}`}>
                {comment.content}
              </p>
            )}
          </div>

          {!comment.deleted && (
            <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
              <button
                className={`min-h-10 rounded px-3 py-2 text-sm text-white ${
                  comment.liked ? "bg-rose-600" : "bg-gray-700"
                }`}
                onClick={() => handleToggleLike(comment.commentId)}
                type="button"
              >
                {comment.liked ? "좋아요 취소" : "좋아요"} {comment.likeCount}
              </button>

              {isOwner && (
                <>
                  {isEditing ? (
                    <>
                      <button
                        className="min-h-10 rounded bg-blue-600 px-3 py-2 text-sm text-white"
                        onClick={() => handleUpdate(comment.commentId)}
                      >
                        저장
                      </button>
                      <button
                        className="min-h-10 rounded bg-gray-500 px-3 py-2 text-sm text-white"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingContent("");
                        }}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="min-h-10 rounded bg-blue-600 px-3 py-2 text-sm text-white"
                        onClick={() => {
                          setEditingCommentId(comment.commentId);
                          setEditingContent(comment.content);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="min-h-10 rounded bg-red-600 px-3 py-2 text-sm text-white"
                        onClick={() => handleDelete(comment.commentId)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {!isReply && !comment.deleted && (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              className="min-h-11 min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
              placeholder="대댓글 작성"
              value={replyInputs[comment.commentId] ?? ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({
                  ...prev,
                  [comment.commentId]: e.target.value,
                }))
              }
            />
            <button
              className="min-h-11 rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => handleCreate(comment.commentId)}
            >
              등록
            </button>
          </div>
        )}

        {comment.replies.map((reply) => renderComment(reply, true))}
      </div>
    );
  }

  return (
    <section className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">댓글</h2>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="min-h-11 min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
          placeholder="댓글 작성"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="min-h-11 rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          onClick={() => handleCreate()}
        >
          등록
        </button>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </section>
  );
}
