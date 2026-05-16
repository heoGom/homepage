"use client";

type PostFormProps = {
  title: string;
  content: string;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

export default function PostForm({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  submitLabel,
}: PostFormProps) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-xl font-semibold">글 작성</h2>

      <input
        className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
        placeholder="제목"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
      />

      <textarea
        className="min-h-48 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 sm:text-sm"
        placeholder="내용"
        value={content}
        onChange={(e) => onChangeContent(e.target.value)}
      />

      <button
        className="min-h-11 w-full rounded bg-gray-900 py-2 font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={onSubmit}
        type="button"
      >
        {submitLabel ?? "글 작성"}
      </button>
    </div>
  );
}
