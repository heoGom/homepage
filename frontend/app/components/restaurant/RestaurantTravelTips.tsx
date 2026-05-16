import { restaurantI18n, type RestaurantLocale } from "@/app/lib/restaurantI18n";

type RestaurantTravelTipsProps = {
  locale: RestaurantLocale;
};

export default function RestaurantTravelTips({ locale }: RestaurantTravelTipsProps) {
  const t = restaurantI18n[locale];

  return (
    <aside className="hidden rounded border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:block">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
        {t.ui.travelTips}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
        <li className="rounded border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950">
          {t.ui.travelTipArrival}
        </li>
        <li className="rounded border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950">
          {t.ui.travelTipSpicy}
        </li>
        <li className="rounded border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-950">
          {t.ui.travelTipSolo}
        </li>
      </ul>
    </aside>
  );
}
