import type { Restaurant } from "@/app/lib/api/restaurantApi";
import { restaurantI18n, type RestaurantLocale } from "@/app/lib/restaurantI18n";
import RestaurantCard from "./RestaurantCard";

type RestaurantListProps = {
  restaurants: Restaurant[];
  locale: RestaurantLocale;
};

export default function RestaurantList({ restaurants, locale }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="border border-gray-200 bg-white px-4 py-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        {restaurantI18n[locale].ui.empty}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.restaurantId}
          restaurant={restaurant}
          locale={locale}
        />
      ))}
    </div>
  );
}
