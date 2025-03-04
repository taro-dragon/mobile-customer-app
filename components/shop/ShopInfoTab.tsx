import { Text, View } from "react-native";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { ShopWithManagementCompany } from "@/hooks/useFetchShop";
import MapView, { Marker } from "react-native-maps";
import { openMapWithLatlng } from "@/libs/openMapWithLatlng";
import Card from "../common/Card";

type ShopInfoTabProps = {
  shop: ShopWithManagementCompany;
};

const ShopInfoTab: React.FC<ShopInfoTabProps> = ({ shop }) => {
  const { colors, typography } = useTheme();

  return (
    <View
      style={{ paddingHorizontal: 16, gap: 16, paddingVertical: 24 }}
      pointerEvents="box-none"
    >
      <View style={{ gap: 24 }} pointerEvents="none">
        {shop.shopCatchCopy && shop.description && (
          <View style={{ gap: 16 }}>
            {shop.shopCatchCopy && (
              <Text
                style={{
                  ...typography.heading2,
                  color: colors.textPrimary,
                }}
              >
                {shop.shopCatchCopy}
              </Text>
            )}
            {shop.description && (
              <Text
                style={{
                  ...typography.body2,
                  color: colors.textPrimary,
                }}
              >
                {shop.description}
              </Text>
            )}
          </View>
        )}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textPrimary,
            }}
          >
            店舗情報
          </Text>
          <Card>
            <View
              style={{
                gap: 8,
              }}
            >
              <CarInfoItem
                label="住所"
                value={`${shop.address1} ${shop.address2} ${shop.address3}`}
              />
              {shop.businessHours && (
                <CarInfoItem label="営業時間" value={shop.businessHours} />
              )}
              {shop.holiday && (
                <CarInfoItem label="定休日" value={shop.holiday} />
              )}
              {shop.managementCompany?.name && (
                <CarInfoItem
                  label="法人名"
                  value={shop.managementCompany.name}
                />
              )}
              {shop.managementCompany?.antiqueDealerLicenseNumber && (
                <CarInfoItem
                  label="古物商許可証番号"
                  value={shop.managementCompany.antiqueDealerLicenseNumber}
                />
              )}
              {/* <CarInfoItem label="営業時間" value={client.businessHours} /> */}
            </View>
          </Card>
        </View>
      </View>
      <View style={{ gap: 8 }} pointerEvents="box-none">
        <Text
          style={{
            ...typography.heading3,
            color: colors.textPrimary,
          }}
        >
          店舗地図
        </Text>
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: shop.lat,
              longitude: shop.lng,
              latitudeDelta: 0.0082,
              longitudeDelta: 0.0082,
            }}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: shop.lat,
                longitude: shop.lng,
              }}
              onPress={() => {
                openMapWithLatlng(
                  { latitude: shop.lat, longitude: shop.lng },
                  shop.shopName
                );
              }}
            />
          </MapView>
        </View>
      </View>
    </View>
  );
};

export default ShopInfoTab;
