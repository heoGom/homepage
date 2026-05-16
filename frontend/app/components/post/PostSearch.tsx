"use client";

type PostSearchProps = {
  keyword: string;
  suggestions: string[];
  onChangeKeyword: (value: string) => void;
  onSearch: () => void;
  onSelectSuggestion: (value: string) => void;
};

export default function PostSearch({
  keyword,
  suggestions,
  onChangeKeyword,
  onSearch,
  onSelectSuggestion,
}: PostSearchProps) {
  return (
    <div className="relative flex w-full flex-col gap-2 sm:flex-row">
      <div className="relative w-full">
        <input
          className="min-h-11 w-full rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
          placeholder="제목 검색"
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded border border-gray-200 bg-white text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="min-h-11 shrink-0 whitespace-nowrap rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={onSearch}
        type="button"
      >
        검색
      </button>
    </div>
  );
}
