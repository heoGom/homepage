"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  getRestaurantDetailApi,
  type RestaurantDetail,
  type VeganOption,
} from "@/app/lib/api/restaurantApi";
import {
  restaurantI18n,
  restaurantTone,
  type RestaurantLocale,
  type RestaurantTone,
} from "@/app/lib/restaurantI18n";

const RESTAURANT_IMAGE_PLACEHOLDER = "https://placehold.co/800x500?text=Restaurant";

function RestaurantDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("locale"));
  const t = restaurantI18n[locale];
  const rawRestaurantId = params.restaurantId;
  const restaurantId = typeof rawRestaurantId === "string" ? rawRestaurantId : "";
  const hasRestaurantId = restaurantId.length > 0;

  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let canceled = false;

    async function fetchRestaurant() {
      setLoading(true);
      setErrorMessage("");

      try {
        const data = await getRestaurantDetailApi(restaurantId, t.ui.detailLoadError);

        if (!canceled) {
          setRestaurant(data);
        }
      } catch (error) {
        if (!canceled) {
          setRestaurant(null);
          setErrorMessage(
            error instanceof Error ? error.message : t.ui.detailLoadError,
          );
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    if (hasRestaurantId) {
      void fetchRestaurant();
    }

    return () => {
      canceled = true;
    };
  }, [hasRestaurantId, restaurantId, t.ui.detailLoadError]);

  if (!hasRestaurantId) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="space-y-4 border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <p>{t.ui.detailLoadError}</p>
          <BackLink locale={locale} label={t.ui.backToList} />
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="border border-gray-200 bg-white px-4 py-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          {t.ui.detailLoading}
        </div>
      </main>
    );
  }

  if (errorMessage || !restaurant) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="space-y-4 border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <p>{errorMessage || t.ui.detailLoadError}</p>
          <BackLink locale={locale} label={t.ui.backToList} />
        </div>
      </main>
    );
  }

  const veganOption = getVeganOption(restaurant.veganOption);
  const recommendation = buildRecommendation(restaurant, locale);
  const beforeYouGoTips = buildBeforeYouGoTips(restaurant, locale);
  const imageUrl = restaurant.imageUrl?.trim() || RESTAURANT_IMAGE_PLACEHOLDER;
  const mapEmbedUrl = buildGoogleMapsEmbedUrl(restaurant);

  return (
    <main className="mx-auto w-full max-w-5xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-5">
        <BackLink locale={locale} label={t.ui.backToList} />
      </div>

      <article className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div
          className="aspect-[16/9] bg-gray-100 bg-cover bg-center dark:bg-gray-800"
          role="img"
          aria-label={restaurant.name}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />

        <div className="space-y-6 p-5 sm:p-6">
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-700 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t.enums.area[restaurant.area]} · {t.enums.category[restaurant.category]}
              </p>
              <h1 className="mt-2 break-words text-3xl font-bold text-gray-900 dark:text-gray-100">
                {restaurant.name}
              </h1>
            </div>

            <span className={`w-fit rounded-full border px-3 py-1 text-sm font-semibold ${getBadgeClassName(restaurantTone.touristFriendly[restaurant.touristFriendly])}`}>
              {t.enums.touristFriendly[restaurant.touristFriendly]}
            </span>
          </header>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.ui.whyThisWorks}
              </h2>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-gray-700 dark:text-gray-300">
                {recommendation}
              </p>
            </section>

            <section className="rounded border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.ui.recommendedMenu}
              </h2>
              <p className="mt-2 break-words text-lg font-semibold text-gray-900 dark:text-gray-100">
                {restaurant.recommendedMenu || t.ui.unavailable}
              </p>
            </section>
          </div>

          <section className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t.ui.beforeYouGo}
            </h2>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 dark:text-gray-300 md:grid-cols-2">
              {beforeYouGoTips.map((tip) => (
                <li
                  key={tip}
                  className="rounded border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-950"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 rounded border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {t.ui.location}
                </h2>
                <p className="mt-2 break-words text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {restaurant.address}
                </p>
              </div>

              {restaurant.mapUrl && (
                <a
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  href={restaurant.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.ui.openMap}
                </a>
              )}
            </div>

            <iframe
              className="h-72 w-full rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 sm:h-80"
              src={mapEmbedUrl}
              title={`${restaurant.name} ${t.ui.location}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t.ui.visitorGuide}
            </h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <RestaurantSignal
                value={t.enums.orderDifficulty[restaurant.orderDifficulty]}
                tone={restaurantTone.orderDifficulty[restaurant.orderDifficulty]}
              />
              <RestaurantSignal
                value={t.enums.englishLevel[restaurant.englishLevel]}
                tone={restaurantTone.englishLevel[restaurant.englishLevel]}
              />
              <RestaurantSignal
                value={t.enums.soloFriendly[restaurant.soloFriendly]}
                tone={restaurantTone.soloFriendly[restaurant.soloFriendly]}
              />
              <RestaurantSignal
                value={t.enums.spicyLevel[restaurant.spicyLevel]}
                tone={restaurantTone.spicyLevel[restaurant.spicyLevel]}
              />
              <RestaurantSignal
                value={t.enums.touristFriendly[restaurant.touristFriendly]}
                tone={restaurantTone.touristFriendly[restaurant.touristFriendly]}
              />
              <RestaurantSignal
                value={t.enums.veganOption[veganOption]}
                tone={restaurantTone.veganOption[veganOption]}
                icon="🌱"
              />
            </dl>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <GuideSection
              title={t.ui.howToOrder}
              content={restaurant.orderTip || t.ui.unavailable}
            />
            <GuideSection
              title={t.ui.whatToExpect}
              content={restaurant.warningNote || t.ui.unavailable}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

export default function RestaurantDetailPage() {
  return (
    <Suspense fallback={<main className="p-6">로딩 중...</main>}>
      <RestaurantDetailContent />
    </Suspense>
  );
}

function BackLink({ locale, label }: { locale: RestaurantLocale; label: string }) {
  return (
    <Link
      className="inline-flex min-h-10 items-center rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      href={`/restaurants?locale=${locale}`}
    >
      {label}
    </Link>
  );
}

function GuideSection({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </h2>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-gray-700 dark:text-gray-300">
        {content}
      </p>
    </section>
  );
}

function RestaurantSignal({
  value,
  tone,
  icon,
}: {
  value: string;
  tone: RestaurantTone;
  icon?: string;
}) {
  return (
    <div className={`flex min-h-11 min-w-0 items-center gap-2 rounded border px-3 py-2 ${getSignalClassName(tone)}`}>
      <dt className="sr-only">{value}</dt>
      <dd className="flex min-w-0 items-center gap-2 font-medium">
        {icon ? (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : (
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${getDotClassName(tone)}`}
            aria-hidden="true"
          />
        )}
        <span className="truncate">{value}</span>
      </dd>
    </div>
  );
}

function buildBeforeYouGoTips(
  restaurant: RestaurantDetail,
  locale: RestaurantLocale,
) {
  const t = restaurantI18n[locale];
  const tips: string[] = [];
  const veganOption = getVeganOption(restaurant.veganOption);

  if (restaurant.orderDifficulty === "EASY") {
    tips.push(t.ui.beforeEasyOrdering);
  }

  if (restaurant.orderDifficulty === "HARD") {
    tips.push(t.ui.beforeHardOrdering);
  }

  if (restaurant.englishLevel === "NONE") {
    tips.push(t.ui.beforeNoEnglish);
  }

  if (restaurant.soloFriendly === "YES") {
    tips.push(t.ui.beforeSoloYes);
  }

  if (restaurant.soloFriendly === "NO") {
    tips.push(t.ui.beforeSoloNo);
  }

  if (restaurant.spicyLevel === "SPICY" || restaurant.spicyLevel === "VERY_SPICY") {
    tips.push(t.ui.beforeSpicy);
  }

  if (restaurant.spicyLevel === "NOT_SPICY") {
    tips.push(t.ui.beforeNotSpicy);
  }

  if (veganOption === "NONE") {
    tips.push(t.ui.beforeNoVegan);
  }

  if (veganOption === "VEGAN_ONLY") {
    tips.push(t.ui.beforeVeganOnly);
  }

  return tips.slice(0, 4);
}

function buildRecommendation(
  restaurant: RestaurantDetail,
  locale: RestaurantLocale,
) {
  const t = restaurantI18n[locale];
  const description = restaurant.description?.trim();

  if (description) {
    return `${t.ui.recommendationPrefix} ${description}`;
  }

  return t.ui.recommendationFallback(
    t.enums.category[restaurant.category],
    t.enums.area[restaurant.area],
  );
}

function buildGoogleMapsEmbedUrl(restaurant: RestaurantDetail) {
  const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function getVeganOption(value: VeganOption | undefined): VeganOption {
  if (
    value === "LIMITED" ||
    value === "FRIENDLY" ||
    value === "VEGAN_ONLY"
  ) {
    return value;
  }

  return "NONE";
}

function getLocale(value: string | null): RestaurantLocale {
  if (value === "ko" || value === "fr") {
    return value;
  }

  return "en";
}

function getBadgeClassName(tone: RestaurantTone) {
  switch (tone) {
    case "positive":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-200";
    case "neutral":
      return "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200";
    case "warning":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200";
  }
}

function getSignalClassName(tone: RestaurantTone) {
  switch (tone) {
    case "positive":
      return "border-green-100 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200";
    case "neutral":
      return "border-yellow-100 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200";
    case "warning":
      return "border-red-100 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200";
  }
}

function getDotClassName(tone: RestaurantTone) {
  switch (tone) {
    case "positive":
      return "bg-green-500";
    case "neutral":
      return "bg-yellow-500";
    case "warning":
      return "bg-red-500";
  }
}
