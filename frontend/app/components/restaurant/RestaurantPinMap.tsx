import Link from "next/link";
import type { Restaurant } from "@/app/lib/api/restaurantApi";
import {
  restaurantI18n,
  type RestaurantLocale,
} from "@/app/lib/restaurantI18n";

const TILE_SIZE = 256;
const MAP_ZOOM = 12;
const MAP_CENTER = {
  latitude: 35.132,
  longitude: 129.092,
};
const TILE_OFFSETS = [-2, -1, 0, 1, 2];

type RestaurantPinMapProps = {
  restaurants: Restaurant[];
  locale: RestaurantLocale;
};

export default function RestaurantPinMap({ restaurants, locale }: RestaurantPinMapProps) {
  const t = restaurantI18n[locale];
  const restaurantsWithCoordinates = restaurants.filter(hasCoordinates);

  return (
    <section className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t.ui.restaurantMap}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.ui.restaurantMapSubtitle}
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative min-h-[360px] overflow-hidden bg-gray-100 dark:bg-gray-950">
          <MapTiles />
          <div className="absolute inset-0 bg-white/5 dark:bg-gray-950/20" />

          {restaurantsWithCoordinates.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {t.ui.restaurantMapEmpty}
            </div>
          ) : (
            restaurantsWithCoordinates.map((restaurant, index) => (
              <RestaurantPin
                key={restaurant.restaurantId}
                restaurant={restaurant}
                index={index}
                locale={locale}
              />
            ))
          )}

          <div className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-[11px] text-gray-600 shadow-sm dark:bg-gray-900/90 dark:text-gray-300">
            © OpenStreetMap contributors
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 dark:border-gray-800 lg:border-l lg:border-t-0">
          <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {restaurantsWithCoordinates.map((restaurant, index) => (
              <Link
                key={restaurant.restaurantId}
                className="flex items-start gap-3 rounded border border-gray-100 px-3 py-2 text-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                href={`/restaurants/${restaurant.restaurantId}?locale=${locale}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white dark:bg-white dark:text-black">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-gray-900 dark:text-gray-100">
                    {restaurant.name}
                  </span>
                  <span className="mt-0.5 block truncate text-gray-500 dark:text-gray-400">
                    {t.enums.area[restaurant.area]} · {t.enums.category[restaurant.category]}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RestaurantPin({
  restaurant,
  index,
  locale,
}: {
  restaurant: Restaurant & { latitude: number; longitude: number };
  index: number;
  locale: RestaurantLocale;
}) {
  const position = toMapPosition(restaurant.latitude, restaurant.longitude);

  return (
    <Link
      aria-label={restaurant.name}
      className="group absolute z-10 -translate-x-1/2 -translate-y-full"
      href={`/restaurants/${restaurant.restaurantId}?locale=${locale}`}
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
      }}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-lg ring-4 ring-white transition group-hover:-translate-y-1 group-hover:bg-red-700 dark:ring-gray-950">
        {index + 1}
      </span>
      <span className="pointer-events-none absolute left-1/2 top-10 hidden w-max max-w-48 -translate-x-1/2 rounded bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
        {restaurant.name}
      </span>
    </Link>
  );
}

function MapTiles() {
  const centerTile = getTile(MAP_CENTER.latitude, MAP_CENTER.longitude, MAP_ZOOM);
  const centerWorldPixel = toWorldPixel(MAP_CENTER.latitude, MAP_CENTER.longitude, MAP_ZOOM);

  return (
    <>
      {TILE_OFFSETS.flatMap((yOffset) =>
        TILE_OFFSETS.map((xOffset) => {
          const tileX = centerTile.x + xOffset;
          const tileY = centerTile.y + yOffset;
          const left = tileX * TILE_SIZE - centerWorldPixel.x;
          const top = tileY * TILE_SIZE - centerWorldPixel.y;

          return (
            <div
              key={`${tileX}-${tileY}`}
              aria-hidden="true"
              className="absolute bg-cover bg-center opacity-95"
              style={{
                backgroundImage: `url("https://tile.openstreetmap.org/${MAP_ZOOM}/${tileX}/${tileY}.png")`,
                left: `calc(50% + ${left}px)`,
                top: `calc(50% + ${top}px)`,
                height: TILE_SIZE,
                width: TILE_SIZE,
              }}
            />
          );
        }),
      )}
    </>
  );
}

function hasCoordinates(restaurant: Restaurant): restaurant is Restaurant & { latitude: number; longitude: number } {
  return typeof restaurant.latitude === "number" && typeof restaurant.longitude === "number";
}

function toMapPosition(latitude: number, longitude: number) {
  const center = toWorldPixel(MAP_CENTER.latitude, MAP_CENTER.longitude, MAP_ZOOM);
  const target = toWorldPixel(latitude, longitude, MAP_ZOOM);

  return {
    x: target.x - center.x,
    y: target.y - center.y,
  };
}

function getTile(latitude: number, longitude: number, zoom: number) {
  const scale = 2 ** zoom;
  const latRad = toRadians(latitude);

  return {
    x: Math.floor(((longitude + 180) / 360) * scale),
    y: Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale,
    ),
  };
}

function toWorldPixel(latitude: number, longitude: number, zoom: number) {
  const scale = 2 ** zoom;
  const latRad = toRadians(latitude);

  return {
    x: ((longitude + 180) / 360) * scale * TILE_SIZE,
    y:
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      scale *
      TILE_SIZE,
  };
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
