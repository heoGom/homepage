"use client";

import type { RestaurantArea, RestaurantFilters } from "@/app/lib/api/restaurantApi";
import { restaurantI18n, type RestaurantLocale } from "@/app/lib/restaurantI18n";

type RestaurantAreaExplorerProps = {
  filters: RestaurantFilters;
  locale: RestaurantLocale;
  onChangeFilters: (filters: RestaurantFilters) => void;
};

const areaOptions: RestaurantArea[] = [
  "BUSAN_STATION",
  "NAMPO",
  "SEOMYEON",
  "GWANGALLI",
  "HAEUNDAE",
  "JEONPO",
  "CENTUM_CITY",
  "DONGNAE",
];

export default function RestaurantAreaExplorer({
  filters,
  locale,
  onChangeFilters,
}: RestaurantAreaExplorerProps) {
  const t = restaurantI18n[locale];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t.ui.exploreByArea}
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-5">
        <AreaButton
          active={!filters.area}
          label={t.ui.allAreas}
          description={t.ui.allAreasDescription}
          onClick={() =>
            onChangeFilters({
              ...filters,
              area: "",
            })
          }
        />

        {areaOptions.map((area) => (
          <AreaButton
            key={area}
            active={filters.area === area}
            label={t.enums.area[area]}
            description={t.enums.areaDescription[area]}
            onClick={() =>
              onChangeFilters({
                ...filters,
                area,
              })
            }
          />
        ))}
      </div>
    </section>
  );
}

function AreaButton({
  active,
  label,
  description,
  onClick,
}: {
  active: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`min-h-28 w-56 shrink-0 rounded border p-4 text-left transition md:w-auto ${
        active
          ? "border-gray-900 bg-gray-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-black"
          : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span
        className={`mt-2 block text-xs leading-5 ${
          active ? "text-gray-200 dark:text-gray-700" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {description}
      </span>
    </button>
  );
}
