import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCEvo19EOmI45wb7kcpIpT2GtpP5l9Qk4Q");

export const searchGeocode = async (
  address: string
): Promise<Geocoder.GeocoderResponse> => {
  return await Geocoder.from(address);
};
