import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { Clock, MapPin } from "lucide-react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

import ImageCarousel from "@/components/common/ImageCarousel";
import ShopInfoTab from "@/components/shop/ShopInfoTab";
import { useTheme } from "@/contexts/ThemeContext";
import { ShopWithManagementCompany } from "@/hooks/useFetchShop";
import StockCarItem from "@/components/staff/shops/StockCarItem";
import { Stock } from "@/types/firestore_schema/stock";

type ShopScreenProps = {
  shop: ShopWithManagementCompany;
  stockCars: Stock[];
};

type headerProps = {
  shop: ShopWithManagementCompany;
};

const ShopHeader: React.FC<headerProps> = ({ shop }) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{ backgroundColor: colors.backgroundPrimary }}
      pointerEvents="box-none"
    >
      <ImageCarousel images={shop.imageUrls ?? []} />
      <View style={{ gap: 8, padding: 16 }} pointerEvents="none">
        <Text style={{ ...typography.title1, color: colors.textPrimary }}>
          {shop.shopName}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={{ ...typography.body2, color: colors.textSecondary }}>
            {shop.address1}
            {shop.address2}
            {shop.address3}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={{ ...typography.body2, color: colors.textSecondary }}>
            {shop.businessHours}
          </Text>
        </View>
      </View>
      <ShopInfoTab shop={shop} />
    </View>
  );
};

const ShopScreen: React.FC<ShopScreenProps> = ({ shop, stockCars }) => {
  const { colors, typography } = useTheme();
  const renderTabBar = useCallback(
    (props: any) => (
      <MaterialTabBar
        {...props}
        activeColor={colors.primary}
        inactiveColor={colors.textSecondary}
        indicatorStyle={{
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 3,
        }}
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
        labelStyle={typography.heading3}
      />
    ),
    [colors, typography]
  );
  return (
    <Tabs.Container
      containerStyle={{
        backgroundColor: colors.backgroundPrimary,
      }}
      renderHeader={() => {
        return <ShopHeader shop={shop} />;
      }}
      renderTabBar={renderTabBar}
    >
      <Tabs.Tab name="在庫情報">
        <Tabs.FlashList
          data={stockCars}
          renderItem={({ item }) => <StockCarItem car={item} />}
        />
      </Tabs.Tab>
      <Tabs.Tab name="オファー情報">
        <Tabs.FlashList
          data={stockCars}
          renderItem={({ item }) => <StockCarItem car={item} />}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default ShopScreen;
