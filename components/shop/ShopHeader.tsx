import { useTheme } from "@/contexts/ThemeContext";
import { Clock, MapPin, Store } from "lucide-react-native";
import { Dimensions, Text, View } from "react-native";
import ShopInfoSection from "./ShopInfoTab";
import { ShopWithManagementCompany } from "@/hooks/useFetchShop";
import ImageCarousel from "../common/ImageCarousel";

type ShopHeaderProps = {
  shop: ShopWithManagementCompany;
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
  const { colors, typography } = useTheme();
  const width = Dimensions.get("window").width;
  return (
    <View pointerEvents="box-none">
      {shop.imageUrls ? (
        <ImageCarousel images={shop.imageUrls} />
      ) : (
        <View
          style={{
            width: width,
            height: width,
            backgroundColor: colors.gray200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Store size={48} color={colors.textSecondary} />
        </View>
      )}

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
      <ShopInfoSection shop={shop} />
    </View>
  );
};

export default ShopHeader;
