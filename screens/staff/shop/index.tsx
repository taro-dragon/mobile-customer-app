import ImageCarousel from "@/components/common/ImageCarousel";
import { useTheme } from "@/contexts/ThemeContext";
import { Shop } from "@/types/models/Shop";
import { Clock, MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type ShopScreenProps = {
  shop: Shop;
};

const ShopScreen: React.FC<ShopScreenProps> = ({ shop }) => {
  const { colors, typography } = useTheme();
  return (
    <View>
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
    </View>
  );
};

export default ShopScreen;
