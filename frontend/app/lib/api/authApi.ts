import {
  API_BASE_URL,
  authHeaders,
  createApiError,
  readApiData,
} from "./client";
import { authFetch } from "./authFetch";

export type LoginResponse = {
  accessToken: string;
  nickname: string;
};

export type MeResponse = {
  email: string;
  nickname: string;
  role: string;
};

export async function signupApi(
  email: string,
  password: string,
  nickname: string,
) {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickname }),
  });

  if (!res.ok) {
    throw await createApiError(res, "회원가입을 완료하지 못했어요. 입력 내용을 확인해주세요.");
  }

  return readApiData<string>(res);
}

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  return readApiData<LoginResponse>(res);
}

export async function getMeApi() {
  const res = await authFetch(`${API_BASE_URL}/api/users/me`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("내 정보 조회 실패");
  }

  return readApiData<MeResponse>(res);
}
