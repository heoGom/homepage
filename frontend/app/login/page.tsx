"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");
  const [message, setMessage] = useState("");

  const { me, loading, login, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (me) {
      router.push("/dashboard");
    }
  }, [me, router]);

  if (loading) {
    return <main className="p-4">로딩 중...</main>;
  }

  async function handleLogin() {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setMessage("로그인 실패");
    }
  }

  function handleLogout() {
    logout();
    setMessage("로그아웃 완료");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-md items-center px-4 py-6 sm:py-10">
      <div className="w-full space-y-4 border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <h1 className="text-2xl font-bold">로그인</h1>

        {me ? (
          <div className="space-y-3">
            <p className="font-semibold">{me.nickname}님 로그인 중</p>
            <p>이메일: {me.email}</p>
            <p>권한: {me.role}</p>
            <button
              className="min-h-11 w-full rounded bg-gray-600 py-2 text-white hover:bg-gray-500"
              onClick={handleLogout}
              type="button"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />

            <input
              className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />

            <button
              className="min-h-11 w-full rounded bg-gray-900 py-2 font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={handleLogin}
              type="button"
            >
              로그인
            </button>

            <p className="text-center text-sm text-gray-500">
              아직 계정이 없나요?{" "}
              <Link className="font-medium text-gray-900 underline dark:text-gray-100" href="/signup">
                회원가입
              </Link>
            </p>
          </div>
        )}

        {message && <p>{message}</p>}
      </div>
    </main>
  );
}
