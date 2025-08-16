import React, { useState } from "react";
import StockCarItem from "@/components/staff/StockCars/StockCarItem";
import {
  StockHit,
  useStockCarsContext,
} from "@/contexts/staff/CarSearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { CarIcon } from "lucide-react-native";
import MultiFAB from "@/components/buttons/MultiFAB";

import { Dimensions, Text, View } from "react-native";
import { router } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";

type SearchScreenProps = {
  cars: StockHit[];
  showMore: () => void;
  isLastPage: boolean;
  refresh: () => void;
};

const SearchScreen: React.FC<SearchScreenProps> = ({
  cars,
  showMore,
  isLastPage,
  refresh,
}) => {
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  const { handlePresentModalPress } = useStockCarsContext();

  const fabItems = [
    {
      icon: "SlidersHorizontal" as const,
      onPress: () => {
        router.push("/search/filter");
      },
      label: "絞り込み",
    },
    {
      icon: "SortDesc" as const,
      onPress: handlePresentModalPress,
      label: "並び替え",
    },
  ];

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlashList
        data={cars}
        contentContainerStyle={{
          padding: 16,
        }}
        estimatedItemSize={126}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <StockCarItem car={item} />}
        onEndReached={() => {
          if (!isLastPage) {
            showMore();
          }
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              <CarIcon
                size={48}
                color={colors.iconSecondary}
                strokeWidth={1.5}
              />
              <Text
                style={{ color: colors.textSecondary, ...typography.body2 }}
              >
                対象の車両がありません
              </Text>
            </View>
          </View>
        )}
      />
      <MultiFAB items={fabItems} mainIcon="Filter" />
    </View>
  );
};

export default SearchScreen;
