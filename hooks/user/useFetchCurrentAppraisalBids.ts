import useSWR from "swr";
import firestore from "@react-native-firebase/firestore";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Bid } from "@/types/firestore_schema/bids";

// 各bulkAppraisalRequestIdごとにbidをグループ化した型
export type BidsByRequestId = {
  [requestId: string]: Bid[];
};

const fetchCurrentAppraisalBids = async (
  bulkAppraisalRequests: BulkAppraisalRequest[]
): Promise<BidsByRequestId> => {
  try {
    // 空の配列の場合は早期リターン
    if (bulkAppraisalRequests.length === 0) {
      return {};
    }

    // 複数のbulkAppraisalRequestIdに対してクエリを実行
    const requestIds = bulkAppraisalRequests.map((request) => request.id);

    const bids = await firestore()
      .collection("bids")
      .where("bulkAppraisalRequestId", "in", requestIds)
      .get();

    // 各requestIdごとにbidをグループ化
    const bidsByRequestId: BidsByRequestId = {};

    // 初期化：全てのrequestIdに対して空配列を設定
    requestIds.forEach((requestId) => {
      bidsByRequestId[requestId] = [];
    });

    // bidを適切なrequestIdに振り分け
    bids.docs.forEach((doc) => {
      const data = doc.data();
      const bid: Bid = {
        id: doc.id,
        ...data,
      } as Bid;

      const requestId = bid.bulkAppraisalRequestId;
      if (requestId && bidsByRequestId[requestId]) {
        bidsByRequestId[requestId].push(bid);
      }
    });

    return bidsByRequestId;
  } catch (error) {
    console.error("Error fetching current appraisal bids:", error);
    return {};
  }
};

const useFetchCurrentAppraisalBids = (
  bulkAppraisalRequests: BulkAppraisalRequest[]
) => {
  const { data, error, isLoading } = useSWR(
    bulkAppraisalRequests.length > 0
      ? bulkAppraisalRequests.map(
          (request) => `bulkAppraisalRequest-${request.id}`
        )
      : null,
    () => fetchCurrentAppraisalBids(bulkAppraisalRequests),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      dedupingInterval: 5000, // 5秒間の重複リクエストを防ぐ
    }
  );

  return {
    data: data || {},
    error,
    isLoading,
    isError: !!error,
  };
};

export default useFetchCurrentAppraisalBids;
