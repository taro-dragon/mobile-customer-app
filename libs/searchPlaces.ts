// Google Maps APIのキー（環境変数から取得することを推奨）
const GOOGLE_MAPS_API_KEY = process.env
  .EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

export interface SearchResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export const searchPlaces = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim() || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY") {
    return [];
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&key=${GOOGLE_MAPS_API_KEY}&language=ja&components=country:jp`
    );
    const data = await response.json();

    if (data.predictions) {
      return data.predictions;
    }
    return [];
  } catch (error) {
    console.error("Failed to search places:", error);
    return [];
  }
};
