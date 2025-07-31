import { Typography } from "@/constants/Typography";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Shop } from "@/types/models/Shop";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Store = {
  stores: Shop[];
};

const ShopSelectScreen: React.FC<Store> = ({ stores }) => {
  const { colors } = useTheme();
  const { setCurrentStore, currentStore } = useStore();
  return (
    <FlashList
      data={stores}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      estimatedItemSize={81}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            setCurrentStore(item);
          }}
          style={{
            backgroundColor: colors.backgroundSecondary,
            padding: 16,
            borderRadius: 8,
            gap: 4,
            borderWidth: 1,
            borderColor:
              currentStore?.id === item.id
                ? colors.primary
                : colors.borderPrimary,
          }}
        >
          <Text
            style={{
              color:
                currentStore?.id === item.id
                  ? colors.primary
                  : colors.textPrimary,
              ...Typography.heading3,
            }}
          >
            {item.shopName}
          </Text>
          <Text style={{ color: colors.textSecondary, ...Typography.body3 }}>
            {item.address1} {item.address2} {item.address3}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ShopSelectScreen;
