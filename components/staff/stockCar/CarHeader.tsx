import ImageCarousel from "@/components/common/ImageCarousel";
import Tag from "@/components/common/Tag";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { Stock } from "@/types/firestore_schema/stock";
import { Car } from "@/types/models/Car";
import dayjs from "dayjs";
import { Clock, UserIcon } from "lucide-react-native";
import { View, Text } from "react-native";

type StockCarHeaderProps = {
  stock: Stock;
};
const StockCarHeader: React.FC<StockCarHeaderProps> = ({ stock }) => {
  const { colors, typography } = useTheme();
  const { currentStoreStaffs } = useStore();
  const carData = transformCarData(stock as unknown as Car);
  const imageOrder = ["front", "back", "left", "right", "interior"] as const;
  const basicImages = imageOrder
    .map((key) => stock?.images?.[key])
    .filter((url): url is string => Boolean(url));
  const additionalImages = Object.keys(stock?.images ?? {})
    .filter((key) => key.startsWith("otherPhoto"))
    .sort((a, b) => {
      // otherPhoto1, otherPhoto2, ... の順序でソート
      const aNum = parseInt(a.replace("otherPhoto", ""));
      const bNum = parseInt(b.replace("otherPhoto", ""));
      return aNum - bNum;
    })
    .map((key) => stock?.images?.[key as keyof typeof stock.images])
    .filter((url): url is string => Boolean(url));
  const carImages = [...basicImages, ...additionalImages];
  return (
    <View pointerEvents="box-none">
      <ImageCarousel images={carImages} />
      <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
        <View style={{ alignItems: "flex-start", gap: 4 }}>
          <Text style={{ ...typography.heading3, color: colors.primary }}>
            {carData.maker.name}
          </Text>
          <Text style={{ ...typography.title1, color: colors.textPrimary }}>
            {carData.model.name}
          </Text>
          {stock.status === "published" && <Tag color="info" label="公開中" />}
          {stock.status === "archived" && <Tag color="error" label="非公開" />}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1, gap: 4 }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 4,
                padding: 2,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
            >
              <Text
                style={{
                  ...typography.heading4,
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                支払総額
                <Text style={{ ...typography.body4, color: colors.white }}>
                  （税込）
                </Text>
              </Text>
            </View>
            <Text style={{ ...typography.title1, color: colors.primary }}>
              {(Number(stock.totalPayment) / 10000).toFixed(1)}
              <Text
                style={{
                  ...typography.heading5,
                  color: colors.textSecondary,
                }}
              >
                万円
              </Text>
            </Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <View
              style={{
                borderRadius: 4,
                padding: 2,
                borderWidth: 1,
                borderColor: colors.textSecondary,
              }}
            >
              <Text
                style={{
                  ...typography.heading4,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                本体価格
                <Text
                  style={{
                    ...typography.body4,
                    color: colors.textSecondary,
                  }}
                >
                  （税込）
                </Text>
              </Text>
            </View>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {(Number(stock.bodyPrice) / 10000).toFixed(1)}
              <Text
                style={{
                  ...typography.heading5,
                  color: colors.textSecondary,
                }}
              >
                万円
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Clock size={20} color={colors.textPrimary} />
            <Text style={{ ...typography.body4, color: colors.textSecondary }}>
              {dayjs(stock.updatedAt.toDate()).format("YYYY/MM/DD HH:mm")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <UserIcon size={20} color={colors.textPrimary} />
            <Text style={{ ...typography.body4, color: colors.textSecondary }}>
              {currentStoreStaffs.find((staff) => staff.id === stock.updatedBy)
                ?.name || "不明"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StockCarHeader;
