import { useTheme } from "@/contexts/ThemeContext";
import { useBulkAppraisal } from "@/hooks/useBulkAppraisal";
import { Text, View } from "react-native";
import Button from "../common/Button";
import dayjs from "dayjs";
import React from "react";
import { sampleAppraisal } from "@/constants/SampleAppraisal";
import BidItem from "./BidItem";
import { ClipboardCheck } from "lucide-react-native";

const AppraisalSection = () => {
  const {
    isInProgressRequest,
    isDeadlineRequest,
    currentRequest,
    onRequestAppraisalPress,
    isCompletedRequest,
  } = useBulkAppraisal();
  const { colors, typography } = useTheme();
  if (isInProgressRequest) {
    return (
      <View
        style={{
          gap: 16,
          borderWidth: 1,
          borderColor: colors.borderPrimary,
          paddingHorizontal: 12,
          paddingVertical: 24,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClipboardCheck size={24} color={colors.primary} />
        <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
          一括査定中です
        </Text>
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={{ ...typography.body2, color: colors.textSecondary }}>
            査定締切までお待ちください
          </Text>
          <Text style={{ ...typography.body2, color: colors.textSecondary }}>
            査定締切時刻：
            {dayjs(currentRequest?.deadline?.toDate()).format(
              "YYYY/MM/DD HH:mm"
            )}
          </Text>
        </View>
      </View>
    );
  }
  if (isDeadlineRequest) {
    return (
      <>
        {sampleAppraisal.bids?.map((bid) => (
          <BidItem key={bid.id} bid={bid} />
        ))}
      </>
    );
  }
  if (isCompletedRequest) {
    return (
      <View
        style={{
          gap: 16,
          borderWidth: 1,
          borderColor: colors.borderPrimary,
          paddingHorizontal: 12,
          paddingVertical: 24,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
          一括査定は完了しました
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        gap: 16,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
        paddingHorizontal: 12,
        paddingVertical: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
        一括査定情報はまだありません
      </Text>
      <Button
        color={colors.primary}
        label="一括査定依頼をする"
        onPress={onRequestAppraisalPress}
        fullWidth
        isBorder
      />
    </View>
  );
};

export default AppraisalSection;
