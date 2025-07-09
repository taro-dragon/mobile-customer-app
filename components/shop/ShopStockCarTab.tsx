import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { CarIcon } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Stock } from "@/types/firestore_schema/stock";
import StockCarItem from "../staff/shops/StockCarItem";
import SafeAreaBottom from "../common/SafeAreaBottom";
import { useHeaderHeight } from "@react-navigation/elements";

type ShopStockCarTabProps = {
  stockCars: Stock[];
  hasMoreStockCars: boolean;
  loadMoreStockCars: () => void;
  isLoading: boolean;
};

const ShopStockCarTab: React.FC<ShopStockCarTabProps> = ({
  stockCars,
  hasMoreStockCars,
  loadMoreStockCars,
  isLoading,
}) => {
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <Tabs.FlashList
      data={stockCars}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16 }}>
          <StockCarItem car={item} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListFooterComponent={() => <SafeAreaBottom />}
      overrideProps={{
        contentContainerStyle: {
          flexGrow: 1,
          paddingTop: 16,
        },
      }}
      onEndReached={() => {
        if (hasMoreStockCars) {
          loadMoreStockCars();
        }
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get("window").height - headerHeight - 32,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <>
                <CarIcon
                  size={48}
                  color={colors.iconSecondary}
                  strokeWidth={1.5}
                />
                <Text
                  style={{ color: colors.textSecondary, ...typography.body2 }}
                >
                  在庫車両がありません
                </Text>
              </>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default ShopStockCarTab;
