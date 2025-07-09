import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { Shop } from "@/types/models/Shop";
import { useTheme } from "@/contexts/ThemeContext";
import CarInfoItem from "../CarDetail/CarInfoIten";
import MapView, { Marker } from "react-native-maps";
import { openMapWithLatlng } from "@/libs/openMapWithLatlng";
import Button from "../common/Button";
import { useRouter } from "expo-router";

type StoreTabProps = {
  store: Shop;
};

const StoreTab: React.FC<StoreTabProps> = ({ store }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <Tabs.ScrollView>
      <View style={{ padding: 16, gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            店舗情報情報
          </Text>
          <View
            style={{
              gap: 8,
              borderWidth: 1,
              borderColor: colors.borderPrimary,
              padding: 12,
              borderRadius: 12,
            }}
          >
            <CarInfoItem label="店舗名" value={store.shopName} />
            <CarInfoItem
              label="住所"
              value={`${store.address1} ${store.address2} ${store.address3}`}
            />
            {store.businessHours && (
              <CarInfoItem label="営業時間" value={store.businessHours} />
            )}
            {store.holiday && (
              <CarInfoItem label="定休日" value={store.holiday} />
            )}
          </View>
        </View>
        <Button
          label="店舗詳細"
          isBorder
          onPress={() => router.push(`/shops/${store.id}`)}
          color={colors.primary}
        />
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            店舗地図
          </Text>
          <View
            style={{
              width: "100%",
              aspectRatio: 1 / 1,
              borderRadius: 12,
              overflow: "hidden",
            }}
            pointerEvents="auto"
          >
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: store.lat,
                longitude: store.lng,
                latitudeDelta: 0.0082,
                longitudeDelta: 0.0082,
              }}
              scrollEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: store.lat,
                  longitude: store.lng,
                }}
                onPress={() => {
                  openMapWithLatlng(
                    { latitude: store.lat, longitude: store.lng },
                    store.shopName
                  );
                }}
              />
            </MapView>
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};

export default StoreTab;
