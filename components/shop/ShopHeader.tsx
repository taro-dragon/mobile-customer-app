import { useTheme } from "@/contexts/ThemeContext";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { Image } from "expo-image";
import { Clock, MapPin } from "lucide-react-native";
import { useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

type ShopHeaderProps = {
  shop: AffiliateStore;
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const { colors, typography } = useTheme();
  return (
    <View>
      {shop.imageUrls && (
        <Carousel
          ref={ref}
          width={width}
          height={width}
          data={shop?.imageUrls}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              {shop.imageUrls && (
                <Image
                  source={{ uri: shop.imageUrls[index] }}
                  style={{ width: width, height: width }}
                  contentFit="cover"
                />
              )}
            </View>
          )}
        />
      )}

      <View style={{ gap: 8, padding: 16 }}>
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

export default ShopHeader;
