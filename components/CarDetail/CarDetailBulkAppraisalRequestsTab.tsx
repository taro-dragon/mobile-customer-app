import React, { useCallback } from "react";
import { Gavel } from "lucide-react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { ActivityIndicator, Text, View } from "react-native";
import { useCarBidsContext } from "@/contexts/CarBidsContext";
import BidItem from "../CarInfo/BidItem";
import { useStore } from "@/hooks/useStore";
import { useLocalSearchParams } from "expo-router";
import { ExtendedBid } from "@/hooks/useFetchCarBids";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import dayjs from "dayjs";

type CarDetailBulkAppraisalRequestsTabProps = {
  bulkAppraisalRequest?: BulkAppraisalRequest;
  handleRequestBulkAppraisal: () => void;
};

const CarDetailBulkAppraisalRequestsTab: React.FC<
  CarDetailBulkAppraisalRequestsTabProps
> = ({ handleRequestBulkAppraisal, bulkAppraisalRequest }) => {
  const { bids, isLoading, hasMore, loadMore } = useCarBidsContext();
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, typography } = useTheme();
  const car = cars.find((car) => car.id === id);

  const renderItem = useCallback(
    ({ item }: { item: ExtendedBid }) => <BidItem bid={item} />,
    []
  );
  const keyExtractor = useCallback((item: ExtendedBid) => item.id, []);

  const ListEmptyComponent = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Gavel size={48} color={colors.iconSecondary} strokeWidth={1.5} />
        {bulkAppraisalRequest?.status === "in_progress" ? (
          <View
            style={{ gap: 8, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                ...typography.heading2,
                color: colors.textSecondary,
              }}
            >
              一括査定が進行中です
            </Text>
            <Text
              style={{
                ...typography.body3,
                color: colors.textSecondary,
              }}
            >
              査定終了時刻：
              {dayjs(bulkAppraisalRequest.deadline.toDate()).format(
                "YYYY/MM/DD HH:mm"
              )}
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={{
                ...typography.heading2,
                color: colors.textSecondary,
              }}
            >
              一括査定をしていません
            </Text>
            <Button
              label="一括査定を依頼する"
              onPress={handleRequestBulkAppraisal}
              color={colors.primary}
            />
          </>
        )}
      </View>
    ),
    [colors, handleRequestBulkAppraisal, typography]
  );

  if (isLoading) {
    return (
      <Tabs.ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Tabs.ScrollView>
    );
  }

  return (
    <Tabs.FlatList
      data={bids}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={5}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default CarDetailBulkAppraisalRequestsTab;
