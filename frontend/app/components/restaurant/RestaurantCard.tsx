import Link from "next/link";
import type { Restaurant } from "@/app/lib/api/restaurantApi";
import {
  restaurantI18n,
  restaurantTone,
  type RestaurantLocale,
  type RestaurantTone,
} from "@/app/lib/restaurantI18n";

const RESTAURANT_IMAGE_PLACEHOLDER = "https://placehold.co/800x500?text=Restaurant";

type RestaurantCardProps = {
  restaurant: Restaurant;
  locale: RestaurantLocale;
};

export default function RestaurantCard({ restaurant, locale }: RestaurantCardProps) {
  const t = restaurantI18n[locale];
  const imageUrl = restaurant.imageUrl?.trim() || RESTAURANT_IMAGE_PLACEHOLDER;
  const description = restaurant.description?.trim() || t.ui.unavailable;
  const recommendedMenu = restaurant.recommendedMenu?.trim() || t.ui.unavailable;
  const recommendationBadge = getRecommendationBadge(restaurant, locale);

  return (
    <Link
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-100"
      href={`/restaurants/${restaurant.restaurantId}?locale=${locale}`}
    >
      <article className="flex min-h-[430px] flex-col overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-gray-300 group-hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:group-hover:border-gray-600">
        <div className="relative">
          <div
            className="aspect-[16/10] bg-gray-100 bg-cover bg-center dark:bg-gray-800"
            role="img"
            aria-label={restaurant.name}
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
          <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm dark:bg-gray-950/95 dark:text-gray-100">
            {recommendationBadge}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {t.enums.area[restaurant.area]}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {t.enums.category[restaurant.category]}
              </span>
            </div>

            <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
              {restaurant.name}
            </h2>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="mt-4 rounded border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {t.ui.recommendedMenu}
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
              {recommendedMenu}
            </p>
          </div>

          <dl className="mt-4 flex flex-wrap gap-2 text-sm">
            <RestaurantPill
              value={t.enums.orderDifficulty[restaurant.orderDifficulty]}
              tone={restaurantTone.orderDifficulty[restaurant.orderDifficulty]}
            />
            <RestaurantPill
              value={t.enums.soloFriendly[restaurant.soloFriendly]}
              tone={restaurantTone.soloFriendly[restaurant.soloFriendly]}
            />
            <RestaurantPill
              value={t.enums.spicyLevel[restaurant.spicyLevel]}
              tone={restaurantTone.spicyLevel[restaurant.spicyLevel]}
            />
          </dl>
        </div>
      </article>
    </Link>
  );
}

function getRecommendationBadge(restaurant: Restaurant, locale: RestaurantLocale) {
  const t = restaurantI18n[locale];

  if (restaurant.orderDifficulty === "EASY" && restaurant.soloFriendly === "YES") {
    return t.ui.badgeEasySolo;
  }

  if (restaurant.touristFriendly === "HIGH" && restaurant.orderDifficulty === "EASY") {
    return t.ui.badgeFirstTime;
  }

  if (restaurant.spicyLevel === "NOT_SPICY") {
    return t.ui.badgeNonSpicy;
  }

  if (restaurant.veganOption === "VEGAN_ONLY") {
    return t.ui.badgeVegan;
  }

  if (restaurant.area === "BUSAN_STATION") {
    return t.ui.badgeArrival;
  }

  if (restaurant.area === "GWANGALLI" || restaurant.area === "HAEUNDAE") {
    return t.ui.badgeBeach;
  }

  return t.ui.badgeDefault;
}

function RestaurantPill({
  value,
  tone,
}: {
  value: string;
  tone: RestaurantTone;
}) {
  return (
    <div className={`flex min-h-9 min-w-0 items-center gap-2 rounded-full border px-3 py-1.5 ${getSignalClassName(tone)}`}>
      <dt className="sr-only">{value}</dt>
      <dd className="flex min-w-0 items-center gap-2 font-medium">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${getDotClassName(tone)}`}
          aria-hidden="true"
        />
        <span className="truncate">{value}</span>
      </dd>
    </div>
  );
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
