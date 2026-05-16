"use client";

import { useState } from "react";
import {
  type EnglishLevel,
  type OrderDifficulty,
  type RestaurantArea,
  type RestaurantCategory,
  type RestaurantFilters,
  type SoloFriendly,
  type SpicyLevel,
  type TouristFriendly,
  type VeganOption,
} from "@/app/lib/api/restaurantApi";
import { restaurantI18n, type RestaurantLocale } from "@/app/lib/restaurantI18n";

type RestaurantFilterProps = {
  filters: RestaurantFilters;
  locale: RestaurantLocale;
  size: number;
  onChangeFilters: (filters: RestaurantFilters) => void;
  onChangeSize: (size: number) => void;
  onReset: () => void;
};

const orderDifficultyOptions: OrderDifficulty[] = ["EASY", "NORMAL", "HARD"];
const englishLevelOptions: EnglishLevel[] = ["NONE", "BASIC", "GOOD"];
const spicyLevelOptions: SpicyLevel[] = [
  "NOT_SPICY",
  "MILD",
  "SPICY",
  "VERY_SPICY",
];
const touristFriendlyOptions: TouristFriendly[] = ["LOW", "MEDIUM", "HIGH"];
const categoryOptions: RestaurantCategory[] = [
  "KOREAN_SOUP",
  "NOODLES",
  "KOREAN_BBQ",
  "SEAFOOD",
  "STREET_FOOD",
  "CAFE",
  "VEGETARIAN",
  "RICE_BOWL",
  "DUMPLINGS",
  "SNACKS",
  "FINE_DINING",
];
const veganOptionOptions: VeganOption[] = [
  "NONE",
  "LIMITED",
  "FRIENDLY",
  "VEGAN_ONLY",
];

type FilterKey = keyof RestaurantFilters;

const detailedFilterKeys: FilterKey[] = [
  "category",
  "englishLevel",
  "orderDifficulty",
  "spicyLevel",
  "touristFriendly",
  "veganOption",
];

const activeFilterKeys: FilterKey[] = [
  "area",
  "category",
  "orderDifficulty",
  "englishLevel",
  "soloFriendly",
  "spicyLevel",
  "touristFriendly",
  "veganOption",
];

export default function RestaurantFilter({
  filters,
  locale,
  size,
  onChangeFilters,
  onChangeSize,
  onReset,
}: RestaurantFilterProps) {
  const t = restaurantI18n[locale];
  const [open, setOpen] = useState(false);
  const detailedActiveCount = detailedFilterKeys.filter((key) => filters[key]).length;
  const activeFilters = activeFilterKeys.filter((key) => filters[key]);

  return (
    <div className="rounded border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          className="flex min-h-11 w-full items-center justify-between rounded border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 md:w-auto"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className="flex items-center gap-2">
            {t.ui.detailedFilters}
            {detailedActiveCount > 0 && (
              <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-black">
                {t.ui.active}
              </span>
            )}
          </span>
          <span className="ml-4 text-gray-500" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </button>

        <button
          className="min-h-11 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          onClick={onReset}
          type="button"
        >
          {t.ui.clearFilters}
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((key) => (
            <button
              key={key}
              className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              onClick={() =>
                onChangeFilters({
                  ...filters,
                  [key]: "",
                })
              }
              type="button"
            >
              {getActiveFilterLabel(key, filters, t)}
              <span className="ml-2 text-gray-400" aria-hidden="true">
                ×
              </span>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 dark:border-gray-800 md:grid-cols-2 lg:grid-cols-3">
          <SelectFilter
            label={t.ui.filterCategory}
            value={filters.category}
            options={categoryOptions}
            labels={t.enums.category}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                category: value as RestaurantFilters["category"],
              })
            }
          />
          <SelectFilter
            label={t.ui.filterEnglishLevel}
            value={filters.englishLevel}
            options={englishLevelOptions}
            labels={t.enums.englishLevel}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                englishLevel: value as RestaurantFilters["englishLevel"],
              })
            }
          />
          <SelectFilter
            label={t.ui.filterOrderDifficulty}
            value={filters.orderDifficulty}
            options={orderDifficultyOptions}
            labels={t.enums.orderDifficulty}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                orderDifficulty: value as RestaurantFilters["orderDifficulty"],
              })
            }
          />
          <SelectFilter
            label={t.ui.filterSpicyLevel}
            value={filters.spicyLevel}
            options={spicyLevelOptions}
            labels={t.enums.spicyLevel}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                spicyLevel: value as RestaurantFilters["spicyLevel"],
              })
            }
          />
          <SelectFilter
            label={t.ui.filterTouristFriendly}
            value={filters.touristFriendly}
            options={touristFriendlyOptions}
            labels={t.enums.touristFriendly}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                touristFriendly: value as RestaurantFilters["touristFriendly"],
              })
            }
          />
          <SelectFilter
            label={t.ui.filterVeganOption}
            value={filters.veganOption}
            options={veganOptionOptions}
            labels={t.enums.veganOption}
            allLabel={t.ui.all}
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                veganOption: value as RestaurantFilters["veganOption"],
              })
            }
          />
          <label className="flex min-w-0 flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
            {t.ui.size}
            <select
              className="min-h-11 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              value={size}
              onChange={(event) => onChangeSize(Number(event.target.value))}
            >
              <option value={6}>6 {t.ui.sizeUnit}</option>
              <option value={12}>12 {t.ui.sizeUnit}</option>
              <option value={24}>24 {t.ui.sizeUnit}</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

function getActiveFilterLabel(
  key: FilterKey,
  filters: RestaurantFilters,
  t: (typeof restaurantI18n)[RestaurantLocale],
) {
  const value = filters[key];

  if (!value) {
    return "";
  }

  switch (key) {
    case "area":
      return `${t.ui.filterArea}: ${t.enums.area[value as RestaurantArea]}`;
    case "category":
      return `${t.ui.filterCategory}: ${t.enums.category[value as RestaurantCategory]}`;
    case "orderDifficulty":
      return `${t.ui.filterOrderDifficulty}: ${t.enums.orderDifficulty[value as OrderDifficulty]}`;
    case "englishLevel":
      return `${t.ui.filterEnglishLevel}: ${t.enums.englishLevel[value as EnglishLevel]}`;
    case "soloFriendly":
      return `${t.ui.filterSoloFriendly}: ${t.enums.soloFriendly[value as SoloFriendly]}`;
    case "spicyLevel":
      return `${t.ui.filterSpicyLevel}: ${t.enums.spicyLevel[value as SpicyLevel]}`;
    case "touristFriendly":
      return `${t.ui.filterTouristFriendly}: ${t.enums.touristFriendly[value as TouristFriendly]}`;
    case "veganOption":
      return `${t.ui.filterVeganOption}: ${t.enums.veganOption[value as VeganOption]}`;
  }
}

function SelectFilter<T extends string>({
  label,
  value,
  options,
  labels,
  allLabel,
  onChange,
}: {
  label: string;
  value: T | "";
  options: T[];
  labels: Record<T, string>;
  allLabel: string;
  onChange: (value: T | "") => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
      {label}
      <select
        className="min-h-11 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        value={value}
        onChange={(event) => onChange(event.target.value as T | "")}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
