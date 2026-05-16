"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

import {
  getPostsApi,
  suggestPostsApi,
  type PostDirection,
  type Post,
  type PostSort,
} from "../lib/api/postApi";

import Pagination from "../components/post/Pagination";
import PostSearch from "../components/post/PostSearch";
import PostList from "../components/post/PostList";
import { usePostQueryParams } from "../hooks/usePostQueryParams";

function DashboardContent() {
  const router = useRouter();
  const { me, loading } = useAuth();

  const { page, size, keyword, sort, direction, moveToDetail, moveToList } =
    usePostQueryParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [inputKeyword, setInputKeyword] = useState(keyword);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  function handleSearch() {
    moveToList(0, size, inputKeyword, sort, direction);
    setSuggestions([]);
  }

  function handleSelectSuggestion(value: string) {
    setInputKeyword(value);
    moveToList(0, size, value, sort, direction);
    setSuggestions([]);
  }

  function handleChangePage(nextPage: number) {
    moveToList(nextPage, size, keyword, sort, direction);
  }

  function handleChangeSize(nextSize: number) {
    moveToList(0, nextSize, keyword, sort, direction);
  }

  function handleChangeSortOption(value: string) {
    const [nextSort, nextDirection] = value.split(":") as [
      PostSort,
      PostDirection,
    ];
    moveToList(0, size, keyword, nextSort, nextDirection);
  }

  useEffect(() => {
    if (!loading && !me) {
      router.push("/login");
    }
  }, [loading, me, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    if (!loading && me) {
      async function fetchPosts() {
        try {
          const data = await getPostsApi(page, size, keyword, sort, direction);

          setPosts(data.posts);
          setTotalPages(data.totalPages);
        } catch (e) {
          console.error(e);
        }
      }

      void fetchPosts();
    }
  }, [loading, me, page, size, keyword, sort, direction]);

  useEffect(() => {
    if (inputKeyword.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await suggestPostsApi(inputKeyword);
        setSuggestions(data);
      } catch {
        console.error("자동완성 실패");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputKeyword]);

  if (loading) {
    return <main className="p-6">로딩 중...</main>;
  }

  if (!me) {
    return <main className="p-6">로그인 페이지로 이동 중...</main>;
  }

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <section className="mb-6 border-b border-gray-200 pb-5 dark:border-gray-700">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              게시판
            </h1>
            <p className="mt-1 text-sm text-gray-500">게시글을 검색하고 확인합니다.</p>
          </div>

          <button
            className="min-h-11 w-full rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:w-auto"
            onClick={() => router.push("/posts/write")}
            type="button"
          >
            글 작성
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            글 목록
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:flex md:items-center md:gap-3">
            <label className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              표시 개수
              <select
                className="min-h-11 min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:flex-none"
                value={size}
                onChange={(event) => handleChangeSize(Number(event.target.value))}
              >
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={20}>20개</option>
                <option value={50}>50개</option>
              </select>
            </label>

            <label className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              보기 순서
              <select
                className="min-h-11 min-w-0 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:flex-none"
                value={`${sort}:${direction}`}
                onChange={(event) => handleChangeSortOption(event.target.value)}
              >
                <option value="latest:desc">최근 작성순</option>
                <option value="latest:asc">오래된 작성순</option>
                <option value="likes:desc">좋아요 많은 순</option>
                <option value="likes:asc">좋아요 적은 순</option>
                <option value="comments:desc">댓글 많은 순</option>
                <option value="comments:asc">댓글 적은 순</option>
                <option value="views:desc">조회수 높은 순</option>
                <option value="views:asc">조회수 낮은 순</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <PostSearch
            keyword={inputKeyword}
            suggestions={suggestions}
            onChangeKeyword={setInputKeyword}
            onSearch={handleSearch}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>

        <div className="bg-white dark:bg-gray-900">
          <PostList posts={posts} onClickPost={moveToDetail} />
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="p-6">로딩 중...</main>}>
      <DashboardContent />
    </Suspense>
  );
}
