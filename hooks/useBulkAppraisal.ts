import { useLocalSearchParams } from "expo-router";
import { useStore } from "./useStore";
import { useState } from "react";
import { useRegistrationGuard } from "./useRegistrationGuard";
import { Alert } from "react-native";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";

export const useBulkAppraisal = (): {
  currentRequest: BulkAppraisalRequest | undefined;
  isRequesting: boolean;
  onRequestAppraisalPress: () => void;
  hasActiveRequest: boolean;
  isCompletedRequest: boolean;
  isInProgressRequest: boolean;
  isDeadlineRequest: boolean;
} => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequests, user, createBulkAppraisalRequest } =
    useStore();
  const guard = useRegistrationGuard();
  const [isRequesting, setIsRequesting] = useState(false);
  const hasActiveRequest = bulkAppraisalRequests.some(
    (request) => request.carId === id && request.status
  );

  const isInProgressRequest = bulkAppraisalRequests.some(
    (request) => request.carId === id && request.status === "in_progress"
  );
  const isDeadlineRequest = bulkAppraisalRequests.some(
    (request) => request.carId === id && request.status === "deadline"
  );

  const isCompletedRequest = bulkAppraisalRequests.some(
    (request) => request.carId === id && request.status === "completed"
  );

  const currentRequest = bulkAppraisalRequests.find(
    (request) => request.carId === id
  );

  const onRequestAppraisalPress = guard(async () => {
    if (!user?.id || !id) return;

    // 既に一括査定リクエストがある場合
    if (hasActiveRequest) {
      Alert.alert(
        "一括査定依頼済み",
        "この車両はすでに一括査定依頼を出しています。",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      setIsRequesting(true);
      const requestId = await createBulkAppraisalRequest(id, user.id);
      setIsRequesting(false);

      if (requestId) {
        Alert.alert(
          "一括査定依頼完了",
          "一括査定依頼を送信しました。査定結果をお待ちください。",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      setIsRequesting(false);
      Alert.alert(
        "エラー",
        "一括査定依頼の送信に失敗しました。もう一度お試しください。",
        [{ text: "OK" }]
      );
    }
  });
  return {
    currentRequest,
    isRequesting,
    onRequestAppraisalPress,
    hasActiveRequest,
    isCompletedRequest,
    isInProgressRequest,
    isDeadlineRequest,
  };
};
