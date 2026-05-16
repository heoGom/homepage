import { authFetch } from "./authFetch";
import { API_BASE_URL, authHeaders, createApiError, readApiData } from "./client";

export type Post = {
  postId: number;
  title: string;
  content: string;
  email: string;
  nickname: string;
  status: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
  topLevelCommentCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PostLikeToggleResponse = {
  postId: number;
  likeCount: number;
  liked: boolean;
};

export type PostPageResponse = {
  posts: Post[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PostSort = "latest" | "likes" | "comments" | "views";
export type PostDirection = "asc" | "desc";

export async function getPostsApi(
  page: number,
  size: number,
  keyword: string,
  sort: PostSort,
  direction: PostDirection,
) {
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    keyword: keyword || "",
    sort,
    direction,
  });

  const res = await authFetch(`${API_BASE_URL}/api/posts?${query}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "게시글 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
  }

  return readApiData<PostPageResponse>(res);
}

export async function getPostApi(postId: string | string[]) {
  const normalizedPostId = Array.isArray(postId) ? postId[0] : postId;

  const res = await authFetch(`${API_BASE_URL}/api/posts/${normalizedPostId}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "게시글을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
  }

  return readApiData<Post>(res);
}

export async function createPostApi(title: string, content: string) {
  const res = await authFetch(`${API_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw await createApiError(res, "게시글을 작성하지 못했어요. 입력 내용을 확인해주세요.");
  }

  return readApiData<Post>(res);
}

export async function updatePostApi(
  postId: string | string[],
  title: string,
  content: string,
) {
  const res = await authFetch(`${API_BASE_URL}/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw await createApiError(res, "게시글을 수정하지 못했어요. 작성자만 수정할 수 있어요.");
  }

  return readApiData<Post>(res);
}

export async function deletePostApi(postId: string | string[]) {
  const res = await authFetch(`${API_BASE_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "게시글을 삭제하지 못했어요. 작성자만 삭제할 수 있어요.");
  }
}

export async function togglePostLikeApi(postId: string | string[]) {
  const res = await authFetch(`${API_BASE_URL}/api/posts/${postId}/likes`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "좋아요를 처리하지 못했어요. 잠시 후 다시 시도해주세요.");
  }

  return readApiData<PostLikeToggleResponse>(res);
}

export async function suggestPostsApi(keyword: string) {
  const query = new URLSearchParams({ keyword });

  const res = await authFetch(`${API_BASE_URL}/api/posts/suggest?${query}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw await createApiError(res, "검색어 추천을 불러오지 못했어요.");
  }

  return readApiData<string[]>(res);
}
