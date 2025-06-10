import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { Shop } from "@/types/models/Shop";
import { useTheme } from "@/contexts/ThemeContext";
import CarInfoItem from "../CarDetail/CarInfoIten";

type StoreTabProps = {
  store: Shop;
};

const StoreTab: React.FC<StoreTabProps> = ({ store }) => {
  const { colors, typography } = useTheme();
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
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};

export default StoreTab;
