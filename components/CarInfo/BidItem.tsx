import { useTheme } from "@/contexts/ThemeContext";
import { AppraisalBid } from "@/types/models/AppraisalBid";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Divider from "../common/Divider";
import Button from "../common/Button";
import { ChevronRight } from "lucide-react-native";
import { Rating } from "react-native-ratings";
import { useRouter } from "expo-router";
type BidItemProps = {
  bid: AppraisalBid;
};

const BidItem: React.FC<BidItemProps> = ({ bid }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        gap: 8,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
        padding: 12,
        borderRadius: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.push(`/shops/${bid.client.id}`);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
              {bid.client.name}
            </Text>
            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              {bid.client.address}
            </Text>
            <View>
              <Text style={{ ...typography.heading1, color: colors.primary }}>
                ¥{bid.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
        <ChevronRight size={24} color={colors.textSecondary} />
      </TouchableOpacity>
      <Divider />
      <View style={{ gap: 8, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button
            color={colors.primary}
            label="この店舗と連絡を取る"
            onPress={() => {
              console.log("買取オファーを見る");
            }}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
};

export default BidItem;
