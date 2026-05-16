"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserMessage } from "@/app/lib/api/apiError";
import { signupApi } from "@/app/lib/api/authApi";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSignup() {
    if (password !== passwordConfirm) {
      setMessage("비밀번호와 비밀번호 확인이 일치하지 않아요.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      await signupApi(email, password, nickname);
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/login");
    } catch (error) {
      setMessage(
        getUserMessage(error, "회원가입을 완료하지 못했어요. 입력 내용을 확인해주세요."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-md items-center px-4 py-6 sm:py-10">
      <div className="w-full space-y-5 border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="mt-1 text-sm text-gray-500">
            게시판을 이용할 계정을 만들어주세요.
          </p>
        </div>

        <div className="space-y-3">
          <input
            className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일"
            type="email"
          />

          <input
            className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="닉네임"
          />

          <input
            className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            type="password"
          />

          <input
            className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            placeholder="비밀번호 확인"
            type="password"
          />

          <button
            className="min-h-11 w-full rounded bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            disabled={submitting}
            onClick={handleSignup}
            type="button"
          >
            {submitting ? "가입 중..." : "회원가입"}
          </button>
        </div>

        {message && <p className="text-sm text-red-600">{message}</p>}

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <Link className="font-medium text-gray-900 underline dark:text-gray-100" href="/login">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
