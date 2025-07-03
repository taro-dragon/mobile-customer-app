// Google Maps APIのキー（環境変数から取得することを推奨）
const GOOGLE_MAPS_API_KEY = process.env
  .EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

export const fetchAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  if (GOOGLE_MAPS_API_KEY === "YOUR_API_KEY") {
    console.warn("Google Maps APIキーが設定されていません");
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}&language=ja`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch address from coordinates:", error);
    return null;
  }
};
