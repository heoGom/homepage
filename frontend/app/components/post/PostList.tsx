import type { Post } from "@/app/lib/api/postApi";
import { formatBoardDateTime } from "@/app/lib/formatDateTime";

type PostListProps = {
  posts: Post[];
  onClickPost: (postId: number) => void;
};

export default function PostList({ posts, onClickPost }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-gray-500">게시글이 없습니다.</p>;
  }

  return (
    <div className="overflow-hidden border-y border-gray-200 dark:border-gray-700">
      <div className="hidden grid-cols-[72px_minmax(0,1fr)_150px_150px_72px_72px_72px] border-b bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 md:grid">
        <span>번호</span>
        <span className="text-left">제목</span>
        <span>작성자</span>
        <span>작성시간</span>
        <span>좋아요</span>
        <span>댓글</span>
        <span>조회</span>
      </div>

      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {posts.map((post) => (
          <li key={post.postId}>
            <button
              className="grid min-h-16 w-full gap-2 px-3 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-4 md:grid-cols-[72px_minmax(0,1fr)_150px_150px_72px_72px_72px] md:items-center md:gap-0"
              onClick={() => onClickPost(post.postId)}
              type="button"
            >
              <span className="hidden text-center text-sm text-gray-500 md:block">
                {post.postId}
              </span>

              <span className="min-w-0">
                <span className="block truncate font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </span>
                <span className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-500 md:hidden">
                  <span>{post.nickname}</span>
                  <span>{formatBoardDateTime(post.createdAt)}</span>
                  <span>좋아요 {post.likeCount}</span>
                  <span>댓글 {post.commentCount}</span>
                  <span>조회 {post.viewCount}</span>
                </span>
              </span>

              <span className="hidden truncate text-center text-sm text-gray-600 dark:text-gray-300 md:block">
                {post.nickname}
              </span>
              <span className="hidden text-center text-sm text-gray-500 md:block">
                {formatBoardDateTime(post.createdAt)}
              </span>
              <span className="hidden text-center text-sm text-gray-500 md:block">
                {post.likeCount}
              </span>
              <span className="hidden text-center text-sm text-gray-500 md:block">
                {post.commentCount}
              </span>
              <span className="hidden text-center text-sm text-gray-500 md:block">
                {post.viewCount}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
