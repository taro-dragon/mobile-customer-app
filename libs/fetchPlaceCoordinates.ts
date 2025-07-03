const GOOGLE_MAPS_API_KEY = process.env
  .EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

export const fetchPlaceCoordinates = async (placeId: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.result?.geometry?.location) {
      return data.result.geometry.location;
    }
    throw new Error("Failed to fetch place coordinates");
  } catch (error) {
    throw error;
  }
};
