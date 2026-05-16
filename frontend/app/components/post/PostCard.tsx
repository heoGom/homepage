import type { Post } from "@/app/lib/api/postApi";
import { formatBoardDateTime } from "@/app/lib/formatDateTime";

type PostCardProps = {
  post: Post;

  onClick: () => void;
};
export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div
      className="cursor-pointer rounded border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <h3 className="font-bold">{post.title}</h3>

      <p>{post.content}</p>

      <p className="text-sm text-gray-500">
        {post.nickname} ({post.email}) · 작성시간 {formatBoardDateTime(post.createdAt)} ·
        좋아요 {post.likeCount} · 댓글 {post.commentCount} · 조회 {post.viewCount}
      </p>
    </div>
  );
}
