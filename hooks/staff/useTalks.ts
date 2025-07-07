import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Talk } from "@/types/firestore_schema/talks";
import { Message } from "@/types/firestore_schema/messages";

export type TalkWithDetails = Talk & {
  latestMessages: Message[];
  unreadCount: number;
  appraisalHistory: Message[];
  staffMessages: Message[];
  userMessages: Message[];
};

export const useTalks = (shopId: string) => {
  const [talks, setTalks] = useState<TalkWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shopId) return;

    const unsubscribe = firestore()
      .collection("talks")
      .where("affiliateStoreId", "==", shopId)
      .where("status", "==", "active")
      .where("isArchived", "==", false)
      .orderBy("lastMessageAt", "desc")
      .onSnapshot(
        async (snapshot) => {
          try {
            const talksData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Talk[];

            // 各Talkの詳細情報を取得
            const talksWithDetails = await Promise.all(
              talksData.map(async (talk) => {
                // 最新のメッセージを取得（最新5件）
                const messagesSnapshot = await firestore()
                  .collection("talks")
                  .doc(talk.id)
                  .collection("messages")
                  .orderBy("createdAt", "desc")
                  .limit(5)
                  .get();

                const latestMessages = messagesSnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })) as Message[];

                // 未読メッセージ数を計算
                const unreadMessagesSnapshot = await firestore()
                  .collection("talks")
                  .doc(talk.id)
                  .collection("messages")
                  .where("read", "==", false)
                  .where("senderType", "==", "user")
                  .get();

                const unreadCount = unreadMessagesSnapshot.docs.length;

                // メッセージを分類
                const appraisalHistory = latestMessages.filter(
                  (msg) => msg.type === "appraisalPrice"
                );
                const staffMessages = latestMessages.filter(
                  (msg) => msg.senderType === "staff"
                );
                const userMessages = latestMessages.filter(
                  (msg) => msg.senderType === "user"
                );

                return {
                  ...talk,
                  latestMessages,
                  unreadCount,
                  appraisalHistory,
                  staffMessages,
                  userMessages,
                };
              })
            );

            setTalks(talksWithDetails);
            setError(null);
          } catch (err) {
            console.error("Error fetching talks:", err);
            setError("トークの取得に失敗しました");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error("Error in talks snapshot:", err);
          setError("トークの監視に失敗しました");
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [shopId]);

  // 査定ステータスでフィルタリング
  const getTalksByAppraisalStatus = (status: Talk["appraisalStatus"]) => {
    return talks.filter((talk) => talk.appraisalStatus === status);
  };

  // 未読メッセージがあるトークのみ取得
  const getUnreadTalks = () => {
    return talks.filter((talk) => talk.unreadCount > 0);
  };

  // 査定完了済みのトークのみ取得
  const getCompletedAppraisals = () => {
    return talks.filter((talk) => talk.appraisalStatus === "completed");
  };

  // 複数スタッフが参加しているトークのみ取得
  const getGroupTalks = () => {
    return talks.filter((talk) => talk.staffIds.length > 1);
  };

  return {
    talks,
    loading,
    error,
    getTalksByAppraisalStatus,
    getUnreadTalks,
    getCompletedAppraisals,
    getGroupTalks,
  };
};
