import { useTheme } from "@/contexts/ThemeContext";
import { AppraisalBid } from "@/types/models/AppraisalBid";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Divider from "../common/Divider";
import Button from "../common/Button";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useBulkAppraisal } from "@/hooks/useBulkAppraisal";
import Card from "../common/Card";
import { ExtendedBid } from "@/hooks/useFetchCarBids";
type BidItemProps = {
  bid: ExtendedBid;
};

const BidItem: React.FC<BidItemProps> = ({ bid }) => {
  const { colors, typography } = useTheme();
  const { isDeadlineRequest } = useBulkAppraisal();
  const router = useRouter();
  return (
    <Card>
      <View
        style={{
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push(`/shops/${bid.affiliateStoreId}`);
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
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                {bid.affiliateStore.shopName}
              </Text>
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                {bid.affiliateStore.address1}
                {bid.affiliateStore.address2}
                {bid.affiliateStore.address3}
              </Text>
              <View>
                <Text style={{ ...typography.heading1, color: colors.primary }}>
                  ¥{bid.price.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
          <ChevronRight size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <Divider />
        {isDeadlineRequest && (
          <View style={{ gap: 8, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                color={colors.primary}
                label="この店舗と連絡を取る"
                isBorder
                onPress={() => {
                  console.log("買取オファーを見る");
                }}
                fullWidth
              />
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};

export default BidItem;
