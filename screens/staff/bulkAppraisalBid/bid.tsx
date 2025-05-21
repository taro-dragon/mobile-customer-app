import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";

const BulkAppraisalBidBidScreen: React.FC = () => {
  const { bulkAppraisalRequestsId, carId } = useLocalSearchParams();
  const { currentStore } = useStore();
  const router = useRouter();
  const { colors, typography } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      >
        <Text>{bulkAppraisalRequestsId}</Text>
        <Text>{carId}</Text>
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button
          color={colors.primary}
          label="入札する"
          onPress={() => router.back()}
        />
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default BulkAppraisalBidBidScreen;
