import { authFetch } from "./authFetch";
import { API_BASE_URL, authHeaders, createApiError, readApiData } from "./client";

export type Comment = {
  commentId: number;
  parentId: number | null;
  content: string;
  email: string;
  nickname: string;
  deleted: boolean;
  likeCount: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
};

export type CommentLikeResponse = {
  commentId: number;
  likeCount: number;
  liked: boolean;
};

export async function getCommentsApi(postId: string) {
  const res = await authFetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
  }

  return readApiData<Comment[]>(res);
}

export async function createCommentApi(
  postId: string,
  content: string,
  parentId?: number,
) {
  const res = await authFetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ content, parentId: parentId ?? null }),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글을 작성하지 못했어요. 입력 내용을 확인해주세요.");
  }

  return readApiData<Comment>(res);
}

export async function updateCommentApi(commentId: number, content: string) {
  const res = await authFetch(`${API_BASE_URL}/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글을 수정하지 못했어요. 작성자만 수정할 수 있어요.");
  }

  return readApiData<Comment>(res);
}

export async function deleteCommentApi(commentId: number) {
  const res = await authFetch(`${API_BASE_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글을 삭제하지 못했어요. 작성자만 삭제할 수 있어요.");
  }
}

export async function toggleCommentLikeApi(commentId: number) {
  const res = await authFetch(`${API_BASE_URL}/api/comments/${commentId}/likes`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글 좋아요를 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
  }

  return readApiData<CommentLikeResponse>(res);
}

export async function getCommentLikeApi(commentId: number) {
  const res = await authFetch(`${API_BASE_URL}/api/comments/${commentId}/likes`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "댓글 좋아요 상태를 불러오지 못했어요.");
  }

  return readApiData<CommentLikeResponse>(res);
}
