import Geocoder from "react-native-geocoding";

const GOOGLE_MAP_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

Geocoder.init(GOOGLE_MAP_API_KEY);

export const searchGeocode = async (
  address: string
): Promise<Geocoder.GeocoderResponse> => {
  return await Geocoder.from(address);
};
