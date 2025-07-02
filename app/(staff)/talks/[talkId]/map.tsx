import React, { useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { useAssets } from "expo-asset";

const LATITUDE = 35.1681;
const LONGITUDE = 136.8572;

// Google Maps APIのキー（環境変数から取得することを推奨）
const GOOGLE_MAPS_API_KEY = process.env
  .EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string;

interface SearchResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const snapPoints = useMemo(() => ["40%", "60%"], []);

  const handleFocus = () => {
    (bottomSheetRef.current as any)?.snapToIndex(2);
  };

  // BottomSheetの高さ変更を監視
  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
  };

  // マップの高さを計算（BottomSheetの高さに応じて変動）
  const mapHeight = bottomSheetIndex === 0 ? "40%" : "10%";

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
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const searchPlaces = async (query: string) => {
    if (!query.trim() || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=${GOOGLE_MAPS_API_KEY}&language=ja&components=country:jp`
      );
      const data = await response.json();

      if (data.predictions) {
        setSearchResults(data.predictions);
      }
    } catch (error) {
      setSearchResults([]);
    }
  };

  // 検索テキストが変更された時の処理
  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.trim()) {
      searchPlaces(text);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultTap = async (result: SearchResult) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const { lat, lng } = data.result.geometry.location;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        setSearchResults([]);
        setSearch(result.description);

        // BottomSheetのindexを0に変更
        bottomSheetRef.current?.snapToIndex(1);
      }
    } catch (error) {}
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, position: "relative" }}>
        <MapView
          ref={mapRef}
          style={[styles.map, { height: mapHeight }]}
          provider={PROVIDER_DEFAULT}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {/* Markerは使わない */}
        </MapView>
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
      <View
        style={{ height: "35%", backgroundColor: colors.backgroundPrimary }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleBottomSheetChange}
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
              {
                backgroundColor: colors.backgroundSecondary,
                color: colors.textPrimary,
                fontWeight: "600",
              },
            ]}
            placeholder="住所や場所を検索"
            value={search}
            onChangeText={handleSearchChange}
            onFocus={handleFocus}
          />
          <BottomSheetFlatList
            data={searchResults}
            ListEmptyComponent={
              <View style={styles.loadingContainer}>
                <Text
                  style={[styles.loadingText, { color: colors.textSecondary }]}
                >
                  検索結果がありません
                </Text>
              </View>
            }
            keyExtractor={(item) => item.place_id}
            contentContainerStyle={{
              paddingVertical: 16,
              gap: 8,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.searchResultItem]}
                onPress={() => handleSearchResultTap(item)}
              >
                <Text
                  style={[
                    styles.searchResultMainText,
                    { color: colors.textPrimary },
                  ]}
                >
                  {item.structured_formatting.main_text}
                </Text>
                <Text
                  style={[
                    styles.searchResultSecondaryText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.structured_formatting.secondary_text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetView>
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
  searchResultItem: {
    gap: 4,
  },
  searchResultMainText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  searchResultSecondaryText: {
    fontSize: 14,
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
  },
});

export default TalkMap;
