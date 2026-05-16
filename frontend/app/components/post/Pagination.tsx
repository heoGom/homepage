"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
};

export default function Pagination({
  page,
  totalPages,
  onChangePage,
  previousLabel = "이전",
  nextLabel = "다음",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const blockSize = 10;
  const currentBlock = Math.floor(page / blockSize);
  const startPage = currentBlock * blockSize;
  const endPage = Math.min(startPage + blockSize, totalPages);

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <button
        disabled={page === 0}
        onClick={() => onChangePage(page - 1)}
        className="min-h-11 rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        {previousLabel}
      </button>

      {Array.from({ length: endPage - startPage }, (_, i) => {
        const pageNumber = startPage + i;

        return (
          <button
            key={pageNumber}
            onClick={() => onChangePage(pageNumber)}
            className={`min-h-11 min-w-11 rounded border border-gray-300 px-3 py-2 dark:border-gray-700 ${
              page === pageNumber
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {pageNumber + 1}
          </button>
        );
      })}

      <button
        disabled={page === totalPages - 1}
        onClick={() => onChangePage(page + 1)}
        className="min-h-11 rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        {nextLabel}
      </button>
    </div>
  );
}
