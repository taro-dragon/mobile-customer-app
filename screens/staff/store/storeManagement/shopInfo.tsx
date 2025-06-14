import React from "react";
import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CalendarOff, Clock, Edit, MapPin } from "lucide-react-native";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import ImageCarousel from "@/components/common/ImageCarousel";
import { useTheme } from "@/contexts/ThemeContext";
import { Shop } from "@/types/models/Shop";
import MapView, { Marker } from "react-native-maps";
import { openMapWithLatlng } from "@/libs/openMapWithLatlng";

type ShopInfoScreenProps = {
  store: Shop;
  isOwner: boolean;
};

const ShopInfoScreen: React.FC<ShopInfoScreenProps> = ({ store, isOwner }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: colors.backgroundPrimary }}
        pointerEvents="box-none"
      >
        <ImageCarousel images={store.imageUrls ?? []} />
        <View
          style={{ gap: 8, paddingHorizontal: 16, paddingBottom: 16 }}
          pointerEvents="none"
        >
          <Text style={{ ...typography.title1, color: colors.textPrimary }}>
            {store.shopName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {store.address1}
              {store.address2}
              {store.address3}
              {store.building && ` ${store.building}`}
            </Text>
          </View>
          {store.businessHours && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Clock size={16} color={colors.textSecondary} />
              <Text
                style={{ ...typography.body2, color: colors.textSecondary }}
              >
                {store.businessHours}
              </Text>
            </View>
          )}
          {store.holiday && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <CalendarOff size={16} color={colors.textSecondary} />
              <Text
                style={{ ...typography.body2, color: colors.textSecondary }}
              >
                {store.holiday}
              </Text>
            </View>
          )}
          <View style={{ gap: 24 }}>
            {store.shopCatchCopy && store.description && (
              <View style={{ gap: 16 }}>
                {store.shopCatchCopy && (
                  <Text
                    style={{
                      ...typography.heading2,
                      color: colors.textPrimary,
                    }}
                  >
                    {store.shopCatchCopy}
                  </Text>
                )}
                {store.description && (
                  <Text
                    style={{
                      ...typography.body2,
                      color: colors.textPrimary,
                    }}
                  >
                    {store.description}
                  </Text>
                )}
              </View>
            )}
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
      </ScrollView>
      {isOwner && (
        <>
          <Divider />
          <View style={{ padding: 16 }}>
            <Button
              label="店舗情報を編集"
              onPress={() => router.push("/store/editShopInfo")}
              color={colors.primary}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ShopInfoScreen;
