import type {
  EnglishLevel,
  OrderDifficulty,
  RestaurantArea,
  RestaurantCategory,
  SoloFriendly,
  SpicyLevel,
  TouristFriendly,
  VeganOption,
} from "./api/restaurantApi";

export type RestaurantLocale = "en" | "ko" | "fr";
export type RestaurantTone = "positive" | "neutral" | "warning";

export const restaurantLocaleOptions = [
  { locale: "en", label: "English" },
  { locale: "ko", label: "한국어" },
  { locale: "fr", label: "Français" },
] satisfies { locale: RestaurantLocale; label: string }[];

export const restaurantTone = {
  area: {
    BUSAN_STATION: "neutral",
    SEOMYEON: "neutral",
    HAEUNDAE: "neutral",
    GWANGALLI: "neutral",
    NAMPO: "neutral",
    JEONPO: "neutral",
    CENTUM_CITY: "neutral",
    DONGNAE: "neutral",
    BEOMIL: "neutral",
    YONGHO: "neutral",
  },
  category: {
    KOREAN_SOUP: "neutral",
    NOODLES: "neutral",
    KOREAN_BBQ: "neutral",
    SEAFOOD: "neutral",
    STREET_FOOD: "neutral",
    CAFE: "neutral",
    VEGETARIAN: "positive",
    RICE_BOWL: "neutral",
    DUMPLINGS: "neutral",
    SNACKS: "neutral",
    FINE_DINING: "neutral",
  },
  orderDifficulty: {
    EASY: "positive",
    NORMAL: "neutral",
    HARD: "warning",
  },
  englishLevel: {
    NONE: "warning",
    BASIC: "neutral",
    GOOD: "positive",
  },
  soloFriendly: {
    YES: "positive",
    OK: "neutral",
    NO: "warning",
  },
  spicyLevel: {
    NOT_SPICY: "positive",
    MILD: "neutral",
    SPICY: "warning",
    VERY_SPICY: "warning",
  },
  touristFriendly: {
    LOW: "warning",
    MEDIUM: "neutral",
    HIGH: "positive",
  },
  veganOption: {
    NONE: "warning",
    LIMITED: "neutral",
    FRIENDLY: "positive",
    VEGAN_ONLY: "positive",
  },
} satisfies {
  area: Record<RestaurantArea, RestaurantTone>;
  category: Record<RestaurantCategory, RestaurantTone>;
  orderDifficulty: Record<OrderDifficulty, RestaurantTone>;
  englishLevel: Record<EnglishLevel, RestaurantTone>;
  soloFriendly: Record<SoloFriendly, RestaurantTone>;
  spicyLevel: Record<SpicyLevel, RestaurantTone>;
  touristFriendly: Record<TouristFriendly, RestaurantTone>;
  veganOption: Record<VeganOption, RestaurantTone>;
};

export const restaurantI18n = {
  en: {
    ui: {
      title: "Find easy restaurants in Busan",
      subtitle: "A simple guide for foreign visitors who want to eat in Busan without stress.",
      filterArea: "Area",
      filterAreaPlaceholder: "e.g. Myeongdong",
      filterCategory: "Category",
      filterCategoryPlaceholder: "e.g. Kalguksu",
      filterOrderDifficulty: "Ordering",
      filterEnglishLevel: "English",
      filterSoloFriendly: "Solo dining",
      filterSpicyLevel: "Spice level",
      filterTouristFriendly: "Traveler fit",
      filterVeganOption: "Vegan",
      size: "Items per page",
      sizeUnit: "items",
      all: "All",
      reset: "Reset filters",
      clearFilters: "Clear filters",
      detailedFilters: "Detailed filters",
      active: "Active",
      exploreByArea: "Area Guide",
      allAreas: "All areas",
      allAreasDescription: "Browse every recommended restaurant",
      restaurantMap: "Restaurant map",
      restaurantMapSubtitle: "Pins update with your current filters.",
      restaurantMapEmpty: "No pinned restaurants are available for these filters.",
      quickPicks: "Quick Picks",
      quickPicksSubtitle: "Start with the situations travelers ask about most.",
      quickPickEasyOrdering: "Easy ordering",
      quickPickSoloFriendly: "Solo friendly",
      quickPickNotSpicy: "Not spicy",
      quickPickVeganFriendly: "Vegan",
      quickPickEnglishSupport: "English support",
      travelTips: "Travel Tips",
      travelTipArrival: "First time in Busan? Try Busan Station or Nampo.",
      travelTipSpicy: "Can't eat spicy food? Choose Not spicy.",
      travelTipSolo: "Eating alone? Use Solo friendly.",
      listTitle: "Restaurants",
      totalPrefix: "Total",
      totalSuffix: "places",
      empty: "No restaurants match these filters.",
      loading: "Loading restaurants...",
      loadError: "Could not load restaurants. Please try again later.",
      detailLoadError: "Could not load this restaurant. Please try again later.",
      detailLoading: "Loading restaurant...",
      address: "Address",
      location: "Location",
      coreTags: "Key details",
      backToList: "Back to restaurants",
      recommendedMenu: "Recommended menu",
      howToOrder: "How to order",
      thingsToKnow: "Things to know",
      beforeYouGo: "Before you go",
      visitorGuide: "Visitor guide",
      whyThisWorks: "Why this place works",
      whatToExpect: "What to expect",
      openMap: "Open in Google Maps",
      unavailable: "Not provided yet.",
      why: "Why we recommend",
      recommendationPrefix: "We recommend it for visitors:",
      recommendationFallback: (category: string, area: string) =>
        `A practical ${category} option in ${area} for visitors choosing Korean food.`,
      previous: "Previous",
      next: "Next",
      badgeEasySolo: "Easy solo pick",
      badgeFirstTime: "Good for first-time visitors",
      badgeNonSpicy: "Safe non-spicy choice",
      badgeVegan: "Vegan-friendly",
      badgeArrival: "Good after arrival",
      badgeBeach: "Good near the beach",
      badgeDefault: "Foreigner-friendly pick",
      beforeEasyOrdering: "Ordering should be simple for first-time visitors.",
      beforeHardOrdering: "Check the ordering or waiting system before visiting.",
      beforeNoEnglish: "Prepare the restaurant name or menu screenshot before you go.",
      beforeSoloYes: "This place is comfortable for solo travelers.",
      beforeSoloNo: "This place is better for groups.",
      beforeSpicy: "Ask for a mild option if you cannot eat spicy food.",
      beforeNotSpicy: "This is a safe choice if you avoid spicy food.",
      beforeNoVegan: "This place is not suitable for vegan visitors.",
      beforeVeganOnly: "This is a strong option for vegan travelers.",
    },
    enums: {
      area: {
        BUSAN_STATION: "Busan Station",
        SEOMYEON: "Seomyeon",
        HAEUNDAE: "Haeundae",
        GWANGALLI: "Gwangalli",
        NAMPO: "Nampo",
        JEONPO: "Jeonpo",
        CENTUM_CITY: "Centum City",
        DONGNAE: "Dongnae",
        BEOMIL: "Beomil",
        YONGHO: "Yongho",
      },
      areaDescription: {
        BUSAN_STATION: "Best for arrival-day meals",
        NAMPO: "Street food and classic markets",
        SEOMYEON: "Central nightlife and local restaurants",
        GWANGALLI: "Beach views and casual dining",
        HAEUNDAE: "Popular tourist dining area",
        JEONPO: "Cafes and trendy restaurants",
        CENTUM_CITY: "Shopping and convention area",
        DONGNAE: "Traditional local food",
        BEOMIL: "Old local eateries",
        YONGHO: "Quiet local neighborhood",
      },
      category: {
        KOREAN_SOUP: "Korean soup",
        NOODLES: "Noodles",
        KOREAN_BBQ: "Korean BBQ",
        SEAFOOD: "Seafood",
        STREET_FOOD: "Street food",
        CAFE: "Cafe",
        VEGETARIAN: "Vegetarian",
        RICE_BOWL: "Rice bowl",
        DUMPLINGS: "Dumplings",
        SNACKS: "Snacks",
        FINE_DINING: "Fine dining",
      },
      orderDifficulty: {
        EASY: "Easy ordering",
        NORMAL: "Some help needed",
        HARD: "Advanced ordering",
      },
      englishLevel: {
        NONE: "Little English",
        BASIC: "Basic English",
        GOOD: "English-friendly",
      },
      soloFriendly: {
        YES: "Solo friendly",
        OK: "Solo possible",
        NO: "Better with group",
      },
      spicyLevel: {
        NOT_SPICY: "Not spicy",
        MILD: "Mild",
        SPICY: "Spicy",
        VERY_SPICY: "Very spicy",
      },
      touristFriendly: {
        LOW: "Not tourist friendly",
        MEDIUM: "Tourist okay",
        HIGH: "Tourist friendly",
      },
      veganOption: {
        NONE: "No vegan option",
        LIMITED: "Limited vegan",
        FRIENDLY: "Vegan options",
        VEGAN_ONLY: "Vegan",
      },
    },
  },
  ko: {
    ui: {
      title: "부산에서 고르기 쉬운 식당",
      subtitle: "외국인 방문객이 주문, 혼밥, 매운 정도, 비건 옵션을 보고 부담 없이 고를 수 있는 가이드입니다.",
      filterArea: "지역",
      filterAreaPlaceholder: "예: 명동",
      filterCategory: "분류",
      filterCategoryPlaceholder: "예: 칼국수",
      filterOrderDifficulty: "주문 난이도",
      filterEnglishLevel: "영어",
      filterSoloFriendly: "혼밥",
      filterSpicyLevel: "매운 정도",
      filterTouristFriendly: "관광객 친화도",
      filterVeganOption: "비건",
      size: "표시 개수",
      sizeUnit: "개",
      all: "전체",
      reset: "필터 초기화",
      clearFilters: "필터 초기화",
      detailedFilters: "상세 필터",
      active: "적용 중",
      exploreByArea: "지역 가이드",
      allAreas: "전체 지역",
      allAreasDescription: "추천 식당 전체 보기",
      restaurantMap: "식당 지도",
      restaurantMapSubtitle: "현재 필터 조건에 맞춰 핀이 표시됩니다.",
      restaurantMapEmpty: "현재 조건에서 표시할 식당 핀이 없습니다.",
      quickPicks: "빠른 선택",
      quickPicksSubtitle: "여행자가 가장 자주 묻는 조건으로 바로 찾아봅니다.",
      quickPickEasyOrdering: "주문 쉬움",
      quickPickSoloFriendly: "혼밥 추천",
      quickPickNotSpicy: "맵지 않음",
      quickPickVeganFriendly: "비건",
      quickPickEnglishSupport: "영어 지원",
      travelTips: "여행 팁",
      travelTipArrival: "부산이 처음이라면 부산역이나 남포부터 골라보세요.",
      travelTipSpicy: "매운 음식을 못 먹는다면 맵지 않음 조건을 고르세요.",
      travelTipSolo: "혼자 먹는다면 혼밥 추천 조건을 사용하세요.",
      listTitle: "식당 목록",
      totalPrefix: "총",
      totalSuffix: "곳",
      empty: "조건에 맞는 식당이 없습니다.",
      loading: "식당 목록을 불러오는 중...",
      loadError: "식당 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      detailLoadError: "식당 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
      detailLoading: "식당 정보를 불러오는 중...",
      address: "주소",
      location: "Location",
      coreTags: "핵심 정보",
      backToList: "식당 목록으로",
      recommendedMenu: "추천 메뉴",
      howToOrder: "주문 방법",
      thingsToKnow: "가기 전 참고",
      beforeYouGo: "가기 전에 확인",
      visitorGuide: "방문자 가이드",
      whyThisWorks: "이 식당이 괜찮은 이유",
      whatToExpect: "예상할 점",
      openMap: "Google Maps에서 열기",
      unavailable: "아직 정보가 없습니다.",
      why: "추천 이유",
      recommendationPrefix: "외국인 방문객에게 추천하는 이유:",
      recommendationFallback: (category: string, area: string) =>
        `${area}에서 한국 음식을 고를 때 참고하기 좋은 ${category} 식당입니다.`,
      previous: "이전",
      next: "다음",
      badgeEasySolo: "혼자 가기 쉬운 선택",
      badgeFirstTime: "처음 방문자에게 적합",
      badgeNonSpicy: "맵지 않아 안전한 선택",
      badgeVegan: "비건 친화",
      badgeArrival: "도착 후 먹기 좋음",
      badgeBeach: "해변 근처 선택",
      badgeDefault: "외국인에게 무난한 선택",
      beforeEasyOrdering: "처음 방문해도 주문이 비교적 간단합니다.",
      beforeHardOrdering: "방문 전 주문 방식이나 웨이팅 방식을 확인하세요.",
      beforeNoEnglish: "식당명이나 메뉴 화면을 미리 준비하면 좋습니다.",
      beforeSoloYes: "혼자 여행하는 사람도 편하게 이용하기 좋습니다.",
      beforeSoloNo: "혼자보다는 여럿이 방문하기에 더 적합합니다.",
      beforeSpicy: "매운 음식을 못 먹는다면 덜 맵게 가능한지 물어보세요.",
      beforeNotSpicy: "매운 음식을 피한다면 안전한 선택입니다.",
      beforeNoVegan: "비건 방문객에게는 적합하지 않습니다.",
      beforeVeganOnly: "비건 여행자에게 강하게 추천할 수 있는 선택입니다.",
    },
    enums: {
      area: {
        BUSAN_STATION: "부산역",
        SEOMYEON: "서면",
        HAEUNDAE: "해운대",
        GWANGALLI: "광안리",
        NAMPO: "남포",
        JEONPO: "전포",
        CENTUM_CITY: "센텀시티",
        DONGNAE: "동래",
        BEOMIL: "범일",
        YONGHO: "용호",
      },
      areaDescription: {
        BUSAN_STATION: "도착한 날 바로 먹기 좋은 식사",
        NAMPO: "시장과 길거리 음식 중심지",
        SEOMYEON: "중심가 밤 문화와 로컬 식당",
        GWANGALLI: "해변 전망과 캐주얼 다이닝",
        HAEUNDAE: "관광객이 많이 찾는 식사 지역",
        JEONPO: "카페와 트렌디한 식당",
        CENTUM_CITY: "쇼핑과 컨벤션 주변 지역",
        DONGNAE: "전통적인 로컬 음식",
        BEOMIL: "오래된 로컬 식당",
        YONGHO: "조용한 로컬 동네",
      },
      category: {
        KOREAN_SOUP: "국밥/탕",
        NOODLES: "면 요리",
        KOREAN_BBQ: "고기구이",
        SEAFOOD: "해산물",
        STREET_FOOD: "길거리 음식",
        CAFE: "카페",
        VEGETARIAN: "채식",
        RICE_BOWL: "덮밥/비빔밥",
        DUMPLINGS: "만두",
        SNACKS: "분식",
        FINE_DINING: "파인 다이닝",
      },
      orderDifficulty: {
        EASY: "주문 쉬움",
        NORMAL: "약간 도움 필요",
        HARD: "주문 난이도 높음",
      },
      englishLevel: {
        NONE: "영어 거의 없음",
        BASIC: "기본 영어 가능",
        GOOD: "영어 친화",
      },
      soloFriendly: {
        YES: "혼밥 추천",
        OK: "혼밥 가능",
        NO: "여럿이 가기 좋음",
      },
      spicyLevel: {
        NOT_SPICY: "맵지 않음",
        MILD: "조금 매움",
        SPICY: "매움",
        VERY_SPICY: "매우 매움",
      },
      touristFriendly: {
        LOW: "관광객 친화 낮음",
        MEDIUM: "관광객 무난",
        HIGH: "관광객 친화",
      },
      veganOption: {
        NONE: "비건 옵션 없음",
        LIMITED: "비건 제한적",
        FRIENDLY: "비건 옵션 있음",
        VEGAN_ONLY: "비건",
      },
    },
  },
  fr: {
    ui: {
      title: "Restaurants faciles à choisir à Busan",
      subtitle: "Un guide simple pour manger à Busan sans stress, selon la commande, le solo, les épices et les options véganes.",
      filterArea: "Quartier",
      filterAreaPlaceholder: "ex. Myeongdong",
      filterCategory: "Catégorie",
      filterCategoryPlaceholder: "ex. Kalguksu",
      filterOrderDifficulty: "Commande",
      filterEnglishLevel: "Anglais",
      filterSoloFriendly: "Repas solo",
      filterSpicyLevel: "Épices",
      filterTouristFriendly: "Touristes",
      filterVeganOption: "Végane",
      size: "Par page",
      sizeUnit: "éléments",
      all: "Tous",
      reset: "Réinitialiser",
      clearFilters: "Effacer les filtres",
      detailedFilters: "Filtres détaillés",
      active: "Actif",
      exploreByArea: "Guide des quartiers",
      allAreas: "Tous les quartiers",
      allAreasDescription: "Voir tous les restaurants recommandés",
      restaurantMap: "Carte des restaurants",
      restaurantMapSubtitle: "Les repères suivent les filtres sélectionnés.",
      restaurantMapEmpty: "Aucun restaurant avec repère pour ces filtres.",
      quickPicks: "Choix rapides",
      quickPicksSubtitle: "Commencez par les situations les plus utiles en voyage.",
      quickPickEasyOrdering: "Commande facile",
      quickPickSoloFriendly: "Adapté solo",
      quickPickNotSpicy: "Pas épicé",
      quickPickVeganFriendly: "Végane",
      quickPickEnglishSupport: "Anglais disponible",
      travelTips: "Conseils voyage",
      travelTipArrival: "Première fois à Busan ? Essayez la gare de Busan ou Nampo.",
      travelTipSpicy: "Vous ne mangez pas épicé ? Choisissez Pas épicé.",
      travelTipSolo: "Vous mangez seul ? Utilisez Adapté solo.",
      listTitle: "Restaurants",
      totalPrefix: "Total",
      totalSuffix: "adresses",
      empty: "Aucun restaurant ne correspond à ces filtres.",
      loading: "Chargement des restaurants...",
      loadError: "Impossible de charger les restaurants. Veuillez réessayer.",
      detailLoadError: "Impossible de charger ce restaurant. Veuillez réessayer.",
      detailLoading: "Chargement du restaurant...",
      address: "Adresse",
      location: "Location",
      coreTags: "Détails clés",
      backToList: "Retour aux restaurants",
      recommendedMenu: "Menu recommandé",
      howToOrder: "Comment commander",
      thingsToKnow: "À savoir",
      beforeYouGo: "Avant d'y aller",
      visitorGuide: "Guide visiteur",
      whyThisWorks: "Pourquoi ce lieu convient",
      whatToExpect: "À quoi s'attendre",
      openMap: "Ouvrir dans Google Maps",
      unavailable: "Pas encore renseigné.",
      why: "Pourquoi nous recommandons",
      recommendationPrefix: "Nous le recommandons aux visiteurs :",
      recommendationFallback: (category: string, area: string) =>
        `Une option ${category} pratique à ${area} pour découvrir la cuisine coréenne.`,
      previous: "Précédent",
      next: "Suivant",
      badgeEasySolo: "Bon choix en solo",
      badgeFirstTime: "Bien pour une première visite",
      badgeNonSpicy: "Choix sûr non épicé",
      badgeVegan: "Adapté aux véganes",
      badgeArrival: "Pratique après l'arrivée",
      badgeBeach: "Près de la plage",
      badgeDefault: "Choix adapté aux étrangers",
      beforeEasyOrdering: "La commande devrait être simple pour une première visite.",
      beforeHardOrdering: "Vérifiez le système de commande ou d'attente avant d'y aller.",
      beforeNoEnglish: "Préparez le nom du restaurant ou une capture du menu.",
      beforeSoloYes: "Ce lieu est confortable pour les voyageurs solo.",
      beforeSoloNo: "Ce lieu convient mieux aux groupes.",
      beforeSpicy: "Demandez une option plus douce si vous ne mangez pas épicé.",
      beforeNotSpicy: "C'est un choix sûr si vous évitez les plats épicés.",
      beforeNoVegan: "Ce lieu ne convient pas aux visiteurs véganes.",
      beforeVeganOnly: "C'est une très bonne option pour les voyageurs véganes.",
    },
    enums: {
      area: {
        BUSAN_STATION: "Gare de Busan",
        SEOMYEON: "Seomyeon",
        HAEUNDAE: "Haeundae",
        GWANGALLI: "Gwangalli",
        NAMPO: "Nampo",
        JEONPO: "Jeonpo",
        CENTUM_CITY: "Centum City",
        DONGNAE: "Dongnae",
        BEOMIL: "Beomil",
        YONGHO: "Yongho",
      },
      areaDescription: {
        BUSAN_STATION: "Idéal pour le repas d'arrivée",
        NAMPO: "Street food et marchés classiques",
        SEOMYEON: "Vie nocturne centrale et restaurants locaux",
        GWANGALLI: "Vue sur la plage et repas décontractés",
        HAEUNDAE: "Quartier de restaurants touristique",
        JEONPO: "Cafés et restaurants tendance",
        CENTUM_CITY: "Zone shopping et convention",
        DONGNAE: "Cuisine locale traditionnelle",
        BEOMIL: "Anciennes adresses locales",
        YONGHO: "Quartier local calme",
      },
      category: {
        KOREAN_SOUP: "Soupe coréenne",
        NOODLES: "Nouilles",
        KOREAN_BBQ: "Barbecue coréen",
        SEAFOOD: "Fruits de mer",
        STREET_FOOD: "Street food",
        CAFE: "Café",
        VEGETARIAN: "Végétarien",
        RICE_BOWL: "Bol de riz",
        DUMPLINGS: "Mandu",
        SNACKS: "Snacks coréens",
        FINE_DINING: "Gastronomie",
      },
      orderDifficulty: {
        EASY: "Commande facile",
        NORMAL: "Aide parfois utile",
        HARD: "Commande avancée",
      },
      englishLevel: {
        NONE: "Peu d'anglais",
        BASIC: "Anglais basique",
        GOOD: "Adapté en anglais",
      },
      soloFriendly: {
        YES: "Adapté solo",
        OK: "Solo possible",
        NO: "Mieux en groupe",
      },
      spicyLevel: {
        NOT_SPICY: "Pas épicé",
        MILD: "Doux",
        SPICY: "Épicé",
        VERY_SPICY: "Très épicé",
      },
      touristFriendly: {
        LOW: "Peu adapté aux touristes",
        MEDIUM: "Correct pour touristes",
        HIGH: "Adapté aux touristes",
      },
      veganOption: {
        NONE: "Pas d'option végane",
        LIMITED: "Végane limité",
        FRIENDLY: "Options véganes",
        VEGAN_ONLY: "Végane",
      },
    },
  },
} satisfies Record<
  RestaurantLocale,
  {
    ui: {
      title: string;
      subtitle: string;
      filterArea: string;
      filterAreaPlaceholder: string;
      filterCategory: string;
      filterCategoryPlaceholder: string;
      filterOrderDifficulty: string;
      filterEnglishLevel: string;
      filterSoloFriendly: string;
      filterSpicyLevel: string;
      filterTouristFriendly: string;
      filterVeganOption: string;
      size: string;
      sizeUnit: string;
      all: string;
      reset: string;
      clearFilters: string;
      detailedFilters: string;
      active: string;
      exploreByArea: string;
      allAreas: string;
      allAreasDescription: string;
      restaurantMap: string;
      restaurantMapSubtitle: string;
      restaurantMapEmpty: string;
      quickPicks: string;
      quickPicksSubtitle: string;
      quickPickEasyOrdering: string;
      quickPickSoloFriendly: string;
      quickPickNotSpicy: string;
      quickPickVeganFriendly: string;
      quickPickEnglishSupport: string;
      travelTips: string;
      travelTipArrival: string;
      travelTipSpicy: string;
      travelTipSolo: string;
      listTitle: string;
      totalPrefix: string;
      totalSuffix: string;
      empty: string;
      loading: string;
      loadError: string;
      detailLoadError: string;
      detailLoading: string;
      address: string;
      location: string;
      coreTags: string;
      backToList: string;
      recommendedMenu: string;
      howToOrder: string;
      thingsToKnow: string;
      beforeYouGo: string;
      visitorGuide: string;
      whyThisWorks: string;
      whatToExpect: string;
      openMap: string;
      unavailable: string;
      why: string;
      recommendationPrefix: string;
      recommendationFallback: (category: string, area: string) => string;
      previous: string;
      next: string;
      badgeEasySolo: string;
      badgeFirstTime: string;
      badgeNonSpicy: string;
      badgeVegan: string;
      badgeArrival: string;
      badgeBeach: string;
      badgeDefault: string;
      beforeEasyOrdering: string;
      beforeHardOrdering: string;
      beforeNoEnglish: string;
      beforeSoloYes: string;
      beforeSoloNo: string;
      beforeSpicy: string;
      beforeNotSpicy: string;
      beforeNoVegan: string;
      beforeVeganOnly: string;
    };
    enums: {
      area: Record<RestaurantArea, string>;
      areaDescription: Record<RestaurantArea, string>;
      category: Record<RestaurantCategory, string>;
      orderDifficulty: Record<OrderDifficulty, string>;
      englishLevel: Record<EnglishLevel, string>;
      soloFriendly: Record<SoloFriendly, string>;
      spicyLevel: Record<SpicyLevel, string>;
      touristFriendly: Record<TouristFriendly, string>;
      veganOption: Record<VeganOption, string>;
    };
  }
>;
