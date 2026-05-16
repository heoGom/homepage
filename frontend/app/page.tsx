"use client";

import { useAuth } from "./hooks/useAuth";
import Link from "next/link";

export default function HomePage() {
  const { me, loading, logout } = useAuth();
  const userFeatures = [
    "JWT 로그인/인증",
    "게시글 CRUD",
    "댓글/대댓글",
    "게시글/댓글 좋아요",
    "검색/자동완성/페이지네이션",
    "최신순/좋아요순/댓글순/조회수순 정렬",
  ];
  const systemFeatures = [
    {
      title: "감사 가능한 변경 이력",
      desc: "게시글과 댓글의 생성, 수정, 삭제를 History 테이블에 beforeData/afterData JSON으로 기록합니다.",
    },
    {
      title: "삭제 정책과 권한 검증",
      desc: "soft delete로 데이터를 보존하고, 작성자만 수정/삭제할 수 있도록 Service 레이어에서 검증합니다.",
    },
    {
      title: "조회수와 조회 이력",
      desc: "상세 조회 시 조회수를 증가시키고 누가 어떤 게시글을 조회했는지 이력으로 남깁니다.",
    },
  ];
  const techStack = [
    "Spring Boot",
    "Spring Security",
    "JPA",
    "JWT",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ];

  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-6 text-gray-900 dark:text-gray-100 sm:px-6 sm:py-10">
      <section className="border-b border-gray-200 pb-8 dark:border-gray-800 sm:pb-10">
        <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
          Spring Boot + Next.js 풀스택 게시판 프로젝트
        </p>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              인증, 게시판, 댓글, 감사 로그까지 갖춘 Homepage
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Homepage는 JWT 인증 기반의 게시판 기능을 백엔드와 프론트엔드로
              함께 구현한 프로젝트입니다. 게시글과 댓글의 기본 사용 흐름뿐 아니라
              soft delete, 변경 이력 감사 로그, 조회 이력, 작성자 권한 검증까지
              실무에서 필요한 운영 기준을 함께 다룹니다.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              현재 지원 기능
            </p>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {userFeatures.map((feature) => (
                <span
                  key={feature}
                  className="border border-gray-200 px-3 py-2 text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          <Link
            href="/dashboard"
            className="min-h-11 rounded bg-gray-900 px-6 py-3 text-center text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            게시판 보러가기
          </Link>

          {!loading &&
            (me ? (
              <button
                onClick={logout}
                className="min-h-11 rounded border border-gray-300 px-6 py-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                type="button"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/login"
                className="min-h-11 rounded border border-gray-300 px-6 py-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                로그인
              </Link>
            ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold">사용자 기능</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            게시글 작성부터 댓글, 좋아요, 검색, 정렬까지 게시판에서 기대하는
            핵심 흐름을 제공합니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "게시글과 댓글",
              desc: "게시글 작성, 수정, 삭제, 상세 조회와 댓글/대댓글 작성 흐름을 제공합니다.",
            },
            {
              title: "반응 기능",
              desc: "게시글과 댓글 좋아요를 toggle 방식으로 처리하고 중복 좋아요를 방지합니다.",
            },
            {
              title: "탐색 기능",
              desc: "검색, 제목 자동완성, 페이지네이션, 표시 개수 선택으로 목록 탐색을 돕습니다.",
            },
            {
              title: "정렬 기능",
              desc: "최신순, 좋아요순, 댓글순, 조회수순을 오름차순/내림차순으로 조회합니다.",
            },
            {
              title: "테마 지원",
              desc: "라이트/다크모드를 직접 전환하고 선택한 테마를 브라우저에 저장합니다.",
            },
            {
              title: "인증 흐름",
              desc: "JWT 로그인, 회원가입, 인증 만료 처리와 로그인 페이지 이동을 제공합니다.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {systemFeatures.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">기술 스택</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              백엔드는 Spring Boot, 프론트엔드는 Next.js App Router 기반으로 구성합니다.
            </p>
          </div>

          <div className="flex max-w-2xl flex-wrap gap-2">
            {techStack.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              {skill}
            </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
