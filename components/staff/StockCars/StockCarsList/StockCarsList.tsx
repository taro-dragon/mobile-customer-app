import StockCarItem from "@/components/staff/StockCars/StockCarItem";
import { useStockCarsContext } from "@/contexts/staff/stockCars/StockCarsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stock } from "@/types/firestore_schema/stock";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { CarIcon } from "lucide-react-native";
import { Dimensions, RefreshControl, Text } from "react-native";
import { View } from "react-native";
import StockCarsItem from "./StockCarsItem";

type StockCarsListProps = {
  stockCars: Stock[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  mutate: () => void;
};

const StockCarsList: React.FC<StockCarsListProps> = ({
  stockCars,
  isLoading,
  hasMore,
  loadMore,
  mutate,
}) => {
  const { typography, colors } = useTheme();
  const headerHeight = useHeaderHeight();
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={stockCars}
        contentContainerStyle={{
          padding: 16,
        }}
        estimatedItemSize={126}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <StockCarsItem stockCar={item} />}
        onEndReached={() => {
          if (!hasMore) {
            loadMore();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              mutate();
            }}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              height: Dimensions.get("window").height - headerHeight - 32 - 56,
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
    </View>
  );
};

export default StockCarsList;
