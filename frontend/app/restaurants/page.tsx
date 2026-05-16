"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RestaurantAreaExplorer from "../components/restaurant/RestaurantAreaExplorer";
import RestaurantFilter from "../components/restaurant/RestaurantFilter";
import RestaurantList from "../components/restaurant/RestaurantList";
import RestaurantQuickPicks from "../components/restaurant/RestaurantQuickPicks";
import RestaurantTravelTips from "../components/restaurant/RestaurantTravelTips";
import Pagination from "../components/post/Pagination";
import {
  getRestaurantsApi,
  type EnglishLevel,
  type OrderDifficulty,
  type Restaurant,
  type RestaurantArea,
  type RestaurantCategory,
  type RestaurantFilters,
  type SoloFriendly,
  type SpicyLevel,
  type TouristFriendly,
  type VeganOption,
} from "../lib/api/restaurantApi";
import {
  restaurantI18n,
  restaurantLocaleOptions,
  type RestaurantLocale,
} from "../lib/restaurantI18n";

const defaultFilters: RestaurantFilters = {
  area: "",
  category: "",
  orderDifficulty: "",
  englishLevel: "",
  soloFriendly: "",
  spicyLevel: "",
  touristFriendly: "",
  veganOption: "",
};

function RestaurantsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamKey = searchParams.toString();
  const page = getPage(searchParams.get("page"));
  const size = getSize(searchParams.get("size"));
  const locale = getLocale(searchParams.get("locale"));
  const t = restaurantI18n[locale];
  const filters = useMemo(
    () => getFilters(new URLSearchParams(searchParamKey)),
    [searchParamKey],
  );

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function moveToList(
    nextPage = page,
    nextSize = size,
    nextFilters = filters,
    nextLocale = locale,
  ) {
    const query = new URLSearchParams({
      locale: nextLocale,
      page: String(nextPage),
      size: String(nextSize),
    });

    appendIfPresent(query, "area", nextFilters.area);
    appendIfPresent(query, "category", nextFilters.category);
    appendIfPresent(query, "orderDifficulty", nextFilters.orderDifficulty);
    appendIfPresent(query, "englishLevel", nextFilters.englishLevel);
    appendIfPresent(query, "soloFriendly", nextFilters.soloFriendly);
    appendIfPresent(query, "spicyLevel", nextFilters.spicyLevel);
    appendIfPresent(query, "touristFriendly", nextFilters.touristFriendly);
    appendIfPresent(query, "veganOption", nextFilters.veganOption);

    router.push(`/restaurants?${query}`);
  }

  function handleChangeFilters(nextFilters: RestaurantFilters) {
    moveToList(0, size, nextFilters);
  }

  function handleChangeSize(nextSize: number) {
    moveToList(0, nextSize, filters);
  }

  function handleReset() {
    moveToList(0, size, defaultFilters);
  }

  function handleChangeLocale(nextLocale: RestaurantLocale) {
    moveToList(page, size, filters, nextLocale);
  }

  useEffect(() => {
    let canceled = false;

    async function fetchRestaurants() {
      setLoading(true);
      setErrorMessage("");

      try {
        const data = await getRestaurantsApi(page, size, filters, t.ui.loadError);

        if (canceled) {
          return;
        }

        setRestaurants(data.restaurants);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        if (canceled) {
          return;
        }

        console.error(error);
        setRestaurants([]);
        setTotalPages(0);
        setTotalElements(0);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : t.ui.loadError,
        );
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    void fetchRestaurants();

    return () => {
      canceled = true;
    };
  }, [page, size, filters, t.ui.loadError]);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <section className="mb-6 border-b border-gray-200 pb-5 dark:border-gray-700">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t.ui.title}
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-gray-500 dark:text-gray-400">
              {t.ui.subtitle}
            </p>
          </div>

          <div className="flex w-full rounded border border-gray-300 p-1 text-sm dark:border-gray-700 md:w-auto">
            {restaurantLocaleOptions.map((option) => (
              <button
                key={option.locale}
                className={`min-h-10 flex-1 rounded px-3 py-2 font-medium md:flex-none ${
                  locale === option.locale
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
                onClick={() => handleChangeLocale(option.locale)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <RestaurantAreaExplorer
          filters={filters}
          locale={locale}
          onChangeFilters={handleChangeFilters}
        />

        <RestaurantQuickPicks
          filters={filters}
          locale={locale}
          onChangeFilters={handleChangeFilters}
        />

        <RestaurantFilter
          filters={filters}
          locale={locale}
          size={size}
          onChangeFilters={handleChangeFilters}
          onChangeSize={handleChangeSize}
          onReset={handleReset}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t.ui.listTitle}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.ui.totalPrefix} {totalElements} {t.ui.totalSuffix}
              </p>
            </div>

            {errorMessage && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                {errorMessage}
              </div>
            )}

            {loading ? (
              <div className="border border-gray-200 bg-white px-4 py-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                {t.ui.loading}
              </div>
            ) : (
              <RestaurantList restaurants={restaurants} locale={locale} />
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onChangePage={(nextPage) => moveToList(nextPage, size, filters)}
              previousLabel={t.ui.previous}
              nextLabel={t.ui.next}
            />
          </div>

          <RestaurantTravelTips locale={locale} />
        </div>
      </section>
    </main>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<main className="p-6">로딩 중...</main>}>
      <RestaurantsContent />
    </Suspense>
  );
}

function getFilters(searchParams: URLSearchParams): RestaurantFilters {
  return {
    area: getRestaurantArea(searchParams.get("area")),
    category: getRestaurantCategory(searchParams.get("category")),
    orderDifficulty: getOrderDifficulty(searchParams.get("orderDifficulty")),
    englishLevel: getEnglishLevel(searchParams.get("englishLevel")),
    soloFriendly: getSoloFriendly(searchParams.get("soloFriendly")),
    spicyLevel: getSpicyLevel(searchParams.get("spicyLevel")),
    touristFriendly: getTouristFriendly(searchParams.get("touristFriendly")),
    veganOption: getVeganOption(searchParams.get("veganOption")),
  };
}

function getRestaurantArea(value: string | null): RestaurantArea | "" {
  if (
    value === "BUSAN_STATION" ||
    value === "SEOMYEON" ||
    value === "HAEUNDAE" ||
    value === "GWANGALLI" ||
    value === "NAMPO" ||
    value === "JEONPO" ||
    value === "CENTUM_CITY" ||
    value === "DONGNAE" ||
    value === "BEOMIL" ||
    value === "YONGHO"
  ) {
    return value;
  }

  return "";
}

function getRestaurantCategory(value: string | null): RestaurantCategory | "" {
  if (
    value === "KOREAN_SOUP" ||
    value === "NOODLES" ||
    value === "KOREAN_BBQ" ||
    value === "SEAFOOD" ||
    value === "STREET_FOOD" ||
    value === "CAFE" ||
    value === "VEGETARIAN" ||
    value === "RICE_BOWL" ||
    value === "DUMPLINGS" ||
    value === "SNACKS" ||
    value === "FINE_DINING"
  ) {
    return value;
  }

  return "";
}

function getLocale(value: string | null): RestaurantLocale {
  if (value === "ko" || value === "fr") {
    return value;
  }

  return "en";
}

function getPage(value: string | null) {
  const page = Number(value ?? 0);
  return Number.isInteger(page) && page >= 0 ? page : 0;
}

function getSize(value: string | null) {
  const size = Number(value ?? 6);

  if ([6, 12, 24].includes(size)) {
    return size;
  }

  return 6;
}

function getOrderDifficulty(value: string | null): OrderDifficulty | "" {
  if (value === "EASY" || value === "NORMAL" || value === "HARD") {
    return value;
  }

  return "";
}

function getEnglishLevel(value: string | null): EnglishLevel | "" {
  if (value === "NONE" || value === "BASIC" || value === "GOOD") {
    return value;
  }

  return "";
}

function getSoloFriendly(value: string | null): SoloFriendly | "" {
  if (value === "YES" || value === "OK" || value === "NO") {
    return value;
  }

  return "";
}

function getSpicyLevel(value: string | null): SpicyLevel | "" {
  if (
    value === "NOT_SPICY" ||
    value === "MILD" ||
    value === "SPICY" ||
    value === "VERY_SPICY"
  ) {
    return value;
  }

  return "";
}

function getTouristFriendly(value: string | null): TouristFriendly | "" {
  if (value === "LOW" || value === "MEDIUM" || value === "HIGH") {
    return value;
  }

  return "";
}

function getVeganOption(value: string | null): VeganOption | "" {
  if (
    value === "NONE" ||
    value === "LIMITED" ||
    value === "FRIENDLY" ||
    value === "VEGAN_ONLY"
  ) {
    return value;
  }

  return "";
}

function appendIfPresent(query: URLSearchParams, key: string, value: string) {
  if (value) {
    query.set(key, value);
  }
}
