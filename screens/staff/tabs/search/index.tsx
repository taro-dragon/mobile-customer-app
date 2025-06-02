import React from "react";
import StockCarItem from "@/components/staff/StockCars/StockCarItem";
import {
  ExtendedCar,
  useStockCarsContext,
} from "@/contexts/staff/CarSearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Slider } from "@miblanchard/react-native-slider";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { CarIcon, SortDesc } from "lucide-react-native";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Dimensions,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack } from "expo-router";

type SearchScreenProps = {
  cars: ExtendedCar[];
  loadMore: () => void;
  isLoading: boolean;
  refresh: () => void;
};

const SearchScreen: React.FC<SearchScreenProps> = ({
  cars,
  loadMore,
  refresh,
  isLoading,
}) => {
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();
  const { handlePresentModalPress, handleDismissModalPress } =
    useStockCarsContext();
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={handlePresentModalPress}>
              <SortDesc size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <FlashList
          data={cars}
          contentContainerStyle={{
            padding: 16,
          }}
          estimatedItemSize={126}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <StockCarItem car={item} />}
          onEndReached={loadMore}
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
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
        />
      </View>
    </>
  );
};

export default SearchScreen;
