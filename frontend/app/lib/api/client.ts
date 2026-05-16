import { ApiError } from "./apiError";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export async function createApiError(res: Response, fallback: string) {
  if (res.status === 403) {
    return new ApiError(403, "작성자만 수정하거나 삭제할 수 있어요.");
  }

  try {
    const body = (await res.clone().json()) as { message?: string };
    return new ApiError(res.status, body.message || fallback);
  } catch {
    return new ApiError(res.status, fallback);
  }
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function authHeaders() {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function readApiData<T>(res: Response) {
  const body = (await res.json()) as ApiResponse<T>;
  return body.data;
}
