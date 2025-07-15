import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { useAssets } from "expo-asset";
import { fetchPlaceCoordinates } from "@/libs/fetchPlaceCoordinates";
import { fetchAddressFromCoordinates } from "@/libs/fetchAddressFromCoordinates";
import { searchPlaces, SearchResult } from "@/libs/searchPlaces";
import { LocateFixed } from "lucide-react-native";
import { Stack } from "expo-router";

const LATITUDE = 35.1709;
const LONGITUDE = 136.8816;

type SearchMapProps = {
  submit: (lat: number, lng: number, address?: string) => void;
  submitButtonText?: string;
};

const SearchMap: React.FC<SearchMapProps> = ({
  submit,
  submitButtonText = "送信",
}) => {
  const { colors, typography } = useTheme();
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
  const [mapHeight, setMapHeight] = useState("40%");
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { latitude, longitude } = location.coords;
        setRegion((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      }
    })();
  }, []);

  const snapPoints = useMemo(() => ["40%", "60%"], []);

  const handleFocus = () => {
    (bottomSheetRef.current as any)?.snapToIndex(2);
  };

  const handleBottomSheetChange = (index: number) => {
    setBottomSheetIndex(index);
  };

  useEffect(() => {
    if (bottomSheetIndex === 0) {
      setMapHeight("10%");
    } else if (bottomSheetIndex === 1) {
      setMapHeight("35%");
    } else {
      setMapHeight("50%");
    }
  }, [bottomSheetIndex]);

  const fetchAddress = async (latitude: number, longitude: number) => {
    setIsLoadingAddress(true);
    try {
      const address = await fetchAddressFromCoordinates(latitude, longitude);
      if (address) {
        setCenterAddress(address);
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleSearchChange = async (text: string) => {
    setSearch(text);
    if (text.trim()) {
      const results = await searchPlaces(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultTap = async (result: SearchResult) => {
    try {
      const coordinates = await fetchPlaceCoordinates(result.place_id);

      if (coordinates) {
        const newRegion = {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        setSearch(result.description);
        bottomSheetRef.current?.snapToIndex(1);
      }
    } catch (error) {
      console.error("Failed to fetch place coordinates:", error);
    }
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  const handleMoveToCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
      fetchAddress(latitude, longitude);
    }
  };
  const handleSubmit = async () => {
    let address: string | null = centerAddress;

    if (!address) {
      try {
        address = await fetchAddressFromCoordinates(
          region.latitude,
          region.longitude
        );
      } catch (error) {}
    }

    submit(region.latitude, region.longitude, address || undefined);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleSubmit}>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading4 }}
              >
                {submitButtonText}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 1, position: "relative" }}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}
          />
          <View pointerEvents="none" style={styles.centerPin}>
            <Image
              source={assets?.[0] as ImageSourcePropType}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
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
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 56,
              right: 20,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: colors.textPrimary,
            }}
            onPress={handleMoveToCurrentLocation}
          >
            <LocateFixed size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: mapHeight as DimensionValue,
            backgroundColor: colors.backgroundPrimary,
          }}
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
                    style={[
                      styles.loadingText,
                      { color: colors.textSecondary },
                    ]}
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
    </>
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
    top: 20,
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
  currentLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  currentLocationButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SearchMap;
