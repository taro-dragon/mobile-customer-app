import React, { useRef, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from "react-native-maps";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/contexts/ThemeContext";

const ADDRESS = "日本、〒453-0843 愛知県名古屋市中村区鴨付町２丁目１１";
const LATITUDE = 35.1681;
const LONGITUDE = 136.8572;

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
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const snapPoints = useMemo(() => ["40%", "90%"], []);

  const handleFocus = () => {
    (bottomSheetRef.current as any)?.snapToIndex(2);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}>
          <Callout>
            <Text>{ADDRESS}</Text>
          </Callout>
        </Marker>
      </MapView>
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
});

export default TalkMap;
