import { API_BASE_URL, createApiError, readApiData } from "./client";

export type RestaurantArea =
  | "BUSAN_STATION"
  | "SEOMYEON"
  | "HAEUNDAE"
  | "GWANGALLI"
  | "NAMPO"
  | "JEONPO"
  | "CENTUM_CITY"
  | "DONGNAE"
  | "BEOMIL"
  | "YONGHO";
export type RestaurantCategory =
  | "KOREAN_SOUP"
  | "NOODLES"
  | "KOREAN_BBQ"
  | "SEAFOOD"
  | "STREET_FOOD"
  | "CAFE"
  | "VEGETARIAN"
  | "RICE_BOWL"
  | "DUMPLINGS"
  | "SNACKS"
  | "FINE_DINING";
export type OrderDifficulty = "EASY" | "NORMAL" | "HARD";
export type EnglishLevel = "NONE" | "BASIC" | "GOOD";
export type SoloFriendly = "YES" | "OK" | "NO";
export type SpicyLevel = "NOT_SPICY" | "MILD" | "SPICY" | "VERY_SPICY";
export type TouristFriendly = "LOW" | "MEDIUM" | "HIGH";
export type VeganOption = "NONE" | "LIMITED" | "FRIENDLY" | "VEGAN_ONLY";

export type Restaurant = {
  restaurantId: number;
  name: string;
  area: RestaurantArea;
  category: RestaurantCategory;
  address: string;
  description: string | null;
  imageUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  recommendedMenu: string | null;
  orderDifficulty: OrderDifficulty;
  englishLevel: EnglishLevel;
  soloFriendly: SoloFriendly;
  spicyLevel: SpicyLevel;
  touristFriendly: TouristFriendly;
  veganOption?: VeganOption;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type RestaurantDetail = Omit<Restaurant, "status" | "createdAt" | "updatedAt"> & {
  mapUrl: string | null;
  recommendedMenu: string | null;
  orderTip: string | null;
  warningNote: string | null;
};

export type RestaurantFilters = {
  area: RestaurantArea | "";
  category: RestaurantCategory | "";
  orderDifficulty: OrderDifficulty | "";
  englishLevel: EnglishLevel | "";
  soloFriendly: SoloFriendly | "";
  spicyLevel: SpicyLevel | "";
  touristFriendly: TouristFriendly | "";
  veganOption: VeganOption | "";
};

export type RestaurantPageResponse = {
  restaurants: Restaurant[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export async function getRestaurantsApi(
  page: number,
  size: number,
  filters: RestaurantFilters,
  fallbackMessage = "Could not load restaurants. Please try again later.",
) {
  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  appendIfPresent(query, "area", filters.area);
  appendIfPresent(query, "category", filters.category);
  appendIfPresent(query, "orderDifficulty", filters.orderDifficulty);
  appendIfPresent(query, "englishLevel", filters.englishLevel);
  appendIfPresent(query, "soloFriendly", filters.soloFriendly);
  appendIfPresent(query, "spicyLevel", filters.spicyLevel);
  appendIfPresent(query, "touristFriendly", filters.touristFriendly);
  appendIfPresent(query, "veganOption", filters.veganOption);

  const res = await fetch(`${API_BASE_URL}/api/restaurants?${query}`);

  if (!res.ok) {
    throw await createApiError(res, fallbackMessage);
  }

  return readApiData<RestaurantPageResponse>(res);
}

export async function getRestaurantDetailApi(
  restaurantId: string,
  fallbackMessage = "Could not load this restaurant. Please try again later.",
) {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}`);

  if (!res.ok) {
    throw await createApiError(res, fallbackMessage);
  }

  return readApiData<RestaurantDetail>(res);
}

export const getRestaurantApi = getRestaurantDetailApi;

function appendIfPresent(query: URLSearchParams, key: string, value: string) {
  if (value) {
    query.set(key, value);
  }
}
