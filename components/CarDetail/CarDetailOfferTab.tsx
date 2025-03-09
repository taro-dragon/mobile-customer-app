import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { Tabs } from "react-native-collapsible-tab-view";
import CarOfferItem from "./CarOfferItem";
import { ActivityIndicator, Text, View } from "react-native";
import { Book } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "../common/Button";

const CarDetailOfferTab = () => {
  const { offers, hasMore, loadMore } = useCarOfferContext();
  const { colors, typography } = useTheme();
  return (
    <Tabs.FlatList
      data={offers}
      renderItem={({ item }) => <CarOfferItem offer={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Book size={48} color={colors.iconSecondary} strokeWidth={1.5} />
          <Text
            style={{
              ...typography.heading2,
              color: colors.textSecondary,
            }}
          >
            買取オファーがありません
          </Text>
          <Button
            label="一括査定を依頼する"
            onPress={() => {}}
            color={colors.primary}
          />
        </View>
      }
    />
  );
};

export default CarDetailOfferTab;
