"use client";

import type { RestaurantFilters } from "@/app/lib/api/restaurantApi";
import { restaurantI18n, type RestaurantLocale } from "@/app/lib/restaurantI18n";

type RestaurantQuickPicksProps = {
  filters: RestaurantFilters;
  locale: RestaurantLocale;
  onChangeFilters: (filters: RestaurantFilters) => void;
};

export default function RestaurantQuickPicks({
  filters,
  locale,
  onChangeFilters,
}: RestaurantQuickPicksProps) {
  const t = restaurantI18n[locale];
  const quickPicks = [
    {
      key: "easyOrdering",
      label: t.ui.quickPickEasyOrdering,
      active: filters.orderDifficulty === "EASY",
      filters: { ...filters, orderDifficulty: filters.orderDifficulty === "EASY" ? "" : "EASY" },
    },
    {
      key: "soloFriendly",
      label: t.ui.quickPickSoloFriendly,
      active: filters.soloFriendly === "YES",
      filters: { ...filters, soloFriendly: filters.soloFriendly === "YES" ? "" : "YES" },
    },
    {
      key: "notSpicy",
      label: t.ui.quickPickNotSpicy,
      active: filters.spicyLevel === "NOT_SPICY",
      filters: { ...filters, spicyLevel: filters.spicyLevel === "NOT_SPICY" ? "" : "NOT_SPICY" },
    },
    {
      key: "veganFriendly",
      label: t.ui.quickPickVeganFriendly,
      active: filters.veganOption === "VEGAN_ONLY",
      filters: { ...filters, veganOption: filters.veganOption === "VEGAN_ONLY" ? "" : "VEGAN_ONLY" },
    },
    {
      key: "englishSupport",
      label: t.ui.quickPickEnglishSupport,
      active: filters.englishLevel === "GOOD",
      filters: { ...filters, englishLevel: filters.englishLevel === "GOOD" ? "" : "GOOD" },
    },
  ] satisfies {
    key: string;
    label: string;
    active: boolean;
    filters: RestaurantFilters;
  }[];

  return (
    <section className="rounded border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t.ui.quickPicks}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t.ui.quickPicksSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPicks.map((pick) => (
            <button
              key={pick.key}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                pick.active
                  ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              }`}
              onClick={() => onChangeFilters(pick.filters)}
              type="button"
            >
              {pick.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
