import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Calendar, Clock, MapPin } from "lucide-react-native";

type ShopItemProps = {
  item: AffiliateStore;
};

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.borderPrimary,
      }}
      onPress={() => router.push(`/shops/${item.id}`)}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          gap: 8,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {item.imageUrls.length > 0 ? (
            <Image
              source={{ uri: item.imageUrls[0] }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.gray200,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapPin size={24} color={colors.gray500} />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <Text
            style={[typography.heading3, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {item.shopName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MapPin size={12} color={colors.gray500} />
            <Text
              style={[typography.body3, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {item.address1}
              {item.address2}
              {item.address3}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Clock size={12} color={colors.gray500} />
            <Text
              style={[typography.body3, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item?.businessHours || "不定休"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Calendar size={12} color={colors.gray500} />
            <Text
              style={[typography.body3, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item?.holiday || "不定休"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopItem;
