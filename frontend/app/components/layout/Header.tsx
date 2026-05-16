"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";

export default function Header() {
  const router = useRouter();
  const { me, logout } = useAuth();
  const { theme, mounted, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const themeToggleLabel = theme === "dark" ? "라이트 모드" : "다크 모드";

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/login"); // 이건 OK (이벤트 기반이라 안전)
  }

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold text-gray-900 dark:text-gray-100"
          >
            Homepage
          </Link>

          <nav aria-label="주요 메뉴" className="hidden items-center gap-1 text-sm md:flex">
            <Link
              href="/dashboard"
              className="rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              게시판
            </Link>
            <Link
              href="/restaurants"
              className="rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              식당 추천
            </Link>
          </nav>
        </div>

        <button
          className="min-h-11 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          메뉴
        </button>

        <div className="hidden items-center justify-end gap-2 text-sm md:flex">
          <button
            className="min-h-10 rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={toggleTheme}
            aria-label={mounted ? themeToggleLabel : "테마 변경"}
            type="button"
          >
            {mounted ? themeToggleLabel : null}
          </button>

          {me ? (
            <>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {me.nickname}님
              </span>
              <button
                className="min-h-10 rounded border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleLogout}
                type="button"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="min-h-10 rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                회원가입
              </Link>
              <Link
                href="/login"
                className="min-h-10 rounded bg-gray-900 px-3 py-2 text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 text-sm">
            <Link
              href="/dashboard"
              className="min-h-11 rounded bg-gray-100 px-3 py-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              게시판
            </Link>
            <Link
              href="/restaurants"
              className="min-h-11 rounded bg-gray-100 px-3 py-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              식당 추천
            </Link>

            <button
              className="min-h-11 rounded border border-gray-300 px-3 py-3 text-left text-gray-700 dark:border-gray-700 dark:text-gray-200"
              onClick={toggleTheme}
              aria-label={mounted ? themeToggleLabel : "테마 변경"}
              type="button"
            >
              {mounted ? themeToggleLabel : null}
            </button>

            {me ? (
              <>
                <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
                  {me.nickname}님
                </span>
                <button
                  className="min-h-11 rounded border border-gray-300 px-3 py-3 text-left text-gray-700 dark:border-gray-700 dark:text-gray-200"
                  onClick={handleLogout}
                  type="button"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="min-h-11 rounded border border-gray-300 px-3 py-3 text-gray-700 dark:border-gray-700 dark:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  회원가입
                </Link>
                <Link
                  href="/login"
                  className="min-h-11 rounded bg-gray-900 px-3 py-3 text-white dark:bg-white dark:text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  로그인
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
