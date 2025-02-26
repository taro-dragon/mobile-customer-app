import { Linking, Platform } from "react-native";
import { LatLng } from "react-native-maps";

export const openMapWithLatlng = (latlng: LatLng, label: string): void => {
  // OSによって呼び出すアプリのスキーマが異なる
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  // 緯度経度を「,」で結合する
  const latLng = `${latlng.latitude},${latlng.longitude}`;
  // 諸々の情報を結合
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  if (!url) {
    return;
  }

  // 開く
  Linking.openURL(url);
};
