import React, { useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { useAssets } from "expo-asset";

const ADDRESS = "日本、〒453-0843 愛知県名古屋市中村区鴨付町２丁目１１";
const LATITUDE = 35.1681;
const LONGITUDE = 136.8572;

// Google Maps Geocoding APIのキー（環境変数から取得することを推奨）
const GOOGLE_MAPS_API_KEY = process.env
  .EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

const places = [
  {
    id: "1",
    name: "米沢電気工事株式会社 名古屋支店",
    address: "愛知県名古屋市中村区鴨付町２丁目４",
  },
  {
    id: "2",
    name: "森本接骨院",
    address: "愛知県名古屋市中村区鴨付町２丁目７",
  },
  {
    id: "3",
    name: "立正佼成会名古屋西教会",
    address: "愛知県名古屋市中村区鴨付町２丁目４２",
  },
  {
    id: "4",
    name: "樹の恵本舗中村",
    address: "愛知県名古屋市中村区鴨付町２丁目４７",
  },
  {
    id: "5",
    name: "名古屋市消防局　中村消防署岩塚出張所",
    address: "愛知県名古屋市中村区剣町１５８",
  },
];

const TalkMap = () => {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [assets] = useAssets(require("@/assets/images/pin.png"));
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [centerAddress, setCenterAddress] = useState("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const snapPoints = useMemo(() => ["40%", "90%"], []);

  const handleFocus = () => {
    (bottomSheetRef.current as any)?.snapToIndex(2);
  };

  // 座標から住所を取得する関数
  const fetchAddress = async (latitude: number, longitude: number) => {
    if (GOOGLE_MAPS_API_KEY === "YOUR_API_KEY") {
      console.warn("Google Maps APIキーが設定されていません");
      return;
    }

    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}&language=ja`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setCenterAddress(address);
      }
    } catch (error) {
      console.error("住所取得エラー:", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // マップの移動が終わった時の処理
  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    // 移動が終わったら住所を取得
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, position: "relative" }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
        <View pointerEvents="none" style={styles.centerPin}>
          <Image
            source={assets?.[0] as ImageSourcePropType}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* 中央住所表示 */}
      {centerAddress && (
        <View
          style={[
            styles.addressContainer,
            { backgroundColor: colors.backgroundPrimary },
          ]}
        >
          <Text style={[styles.addressText, { color: colors.textPrimary }]}>
            {isLoadingAddress ? "住所を取得中..." : centerAddress}
          </Text>
        </View>
      )}
      <View style={{ height: "35%" }} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: colors.backgroundPrimary }}
        handleIndicatorStyle={{
          backgroundColor: colors.textSecondary,
          height: 5,
          width: 40,
          alignSelf: "center",
          marginVertical: 8,
          borderRadius: 3,
        }}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: 16,
            paddingTop: 4,
          }}
        >
          <BottomSheetTextInput
            style={[
              styles.searchInput,
              { backgroundColor: colors.backgroundSecondary },
            ]}
            placeholder="検索"
            value={search}
            onChangeText={setSearch}
            onFocus={handleFocus}
          />
        </BottomSheetView>
        <BottomSheetFlatList
          data={places}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: 16,
            gap: 12,
          }}
          renderItem={({ item }) => (
            <View style={{ gap: 4 }}>
              <Text style={[styles.placeName, { color: colors.textPrimary }]}>
                {item.name}
              </Text>
              <Text
                style={[styles.placeAddress, { color: colors.textSecondary }]}
              >
                {item.address}
              </Text>
            </View>
          )}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    zIndex: 10,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  sendText: { color: "#007AFF", fontSize: 16 },
  map: { flex: 1 },
  sheetTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  searchInput: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  placeName: { fontWeight: "bold", fontSize: 16 },
  placeAddress: { color: "#666", fontSize: 14 },
  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -40,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  addressContainer: {
    position: "absolute",
    top: 120,
    left: 60,
    right: 60,
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default TalkMap;
