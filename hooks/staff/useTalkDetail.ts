import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Talk } from "@/types/firestore_schema/talks";
import { Message } from "@/types/firestore_schema/messages";

export type TalkDetail = Talk & {
  messages: Message[];
  appraisalHistory: Message[];
  staffMessages: Message[];
  userMessages: Message[];
};

export const useTalkDetail = (talkId: string, currentUserId: string) => {
  const [talk, setTalk] = useState<TalkDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MESSAGES_PER_PAGE = 30;

  // 初期データ読み込み
  useEffect(() => {
    if (!talkId) return;

    const loadInitialData = async () => {
      try {
        setLoading(true);

        // Talk情報を取得
        const talkDoc = await firestore().collection("talks").doc(talkId).get();

        if (!talkDoc.exists) {
          setError("トークが見つかりません");
          return;
        }

        const talkData = {
          id: talkDoc.id,
          ...talkDoc.data(),
        } as Talk;

        // 最新のメッセージを取得
        const messagesSnapshot = await firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .orderBy("createdAt", "desc")
          .limit(MESSAGES_PER_PAGE)
          .get();

        const messages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        // メッセージを分類
        const appraisalHistory = messages.filter(
          (msg) => msg.type === "appraisalPrice"
        );
        const staffMessages = messages.filter(
          (msg) => msg.senderType === "staff"
        );
        const userMessages = messages.filter(
          (msg) => msg.senderType === "user"
        );

        setTalk({
          ...talkData,
          messages,
          appraisalHistory,
          staffMessages,
          userMessages,
        });

        // さらに古いメッセージがあるかチェック
        if (messagesSnapshot.docs.length < MESSAGES_PER_PAGE) {
          setHasMoreMessages(false);
        }

        setError(null);
      } catch (err) {
        console.error("Error loading talk detail:", err);
        setError("トークの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [talkId]);

  // リアルタイムで新メッセージを監視
  useEffect(() => {
    if (!talkId || !talk) return;

    const unsubscribe = firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const latestMessage = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          } as Message;

          // 最新メッセージが既存のメッセージに含まれていない場合のみ追加
          setTalk((prev) => {
            if (!prev) return prev;

            const messageExists = prev.messages.some(
              (msg) => msg.id === latestMessage.id
            );

            if (!messageExists) {
              // メッセージを分類して更新
              const updatedMessages = [latestMessage, ...prev.messages];
              const updatedAppraisalHistory = updatedMessages.filter(
                (msg) => msg.type === "appraisalPrice"
              );
              const updatedStaffMessages = updatedMessages.filter(
                (msg) => msg.senderType === "staff"
              );
              const updatedUserMessages = updatedMessages.filter(
                (msg) => msg.senderType === "user"
              );

              return {
                ...prev,
                messages: updatedMessages,
                appraisalHistory: updatedAppraisalHistory,
                staffMessages: updatedStaffMessages,
                userMessages: updatedUserMessages,
                lastMessage: latestMessage.text,
                lastMessageAt: latestMessage.createdAt,
              };
            }
            return prev;
          });
        }
      });

    return () => unsubscribe();
  }, [talkId, talk]);

  // 古いメッセージを読み込む
  const loadMoreMessages = async () => {
    if (
      !talk ||
      loadingMore ||
      !hasMoreMessages ||
      talk.messages.length === 0
    ) {
      return;
    }

    try {
      setLoadingMore(true);

      const oldestMessage = talk.messages[talk.messages.length - 1];
      const messagesSnapshot = await firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .startAfter(oldestMessage.createdAt)
        .limit(MESSAGES_PER_PAGE)
        .get();

      const olderMessages = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      if (olderMessages.length > 0) {
        setTalk((prev) => {
          if (!prev) return prev;

          const updatedMessages = [...prev.messages, ...olderMessages];
          const updatedAppraisalHistory = updatedMessages.filter(
            (msg) => msg.type === "appraisalPrice"
          );
          const updatedStaffMessages = updatedMessages.filter(
            (msg) => msg.senderType === "staff"
          );
          const updatedUserMessages = updatedMessages.filter(
            (msg) => msg.senderType === "user"
          );

          return {
            ...prev,
            messages: updatedMessages,
            appraisalHistory: updatedAppraisalHistory,
            staffMessages: updatedStaffMessages,
            userMessages: updatedUserMessages,
          };
        });
      }

      if (messagesSnapshot.docs.length < MESSAGES_PER_PAGE) {
        setHasMoreMessages(false);
      }
    } catch (err) {
      console.error("Error loading more messages:", err);
      setError("メッセージの読み込みに失敗しました");
    } finally {
      setLoadingMore(false);
    }
  };

  // メッセージを既読にする
  const markMessageAsRead = async (messageId: string) => {
    try {
      await firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .doc(messageId)
        .update({
          read: true,
          readBy: firestore.FieldValue.arrayUnion(currentUserId),
        });
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  };

  // 査定価格を送信
  const sendAppraisalPrice = async (
    price: string,
    note?: string,
    isOfficial = false
  ) => {
    try {
      await firestore().runTransaction(async (transaction) => {
        const messageRef = firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .doc();

        const talkRef = firestore().collection("talks").doc(talkId);

        const messageData: Omit<Message, "id"> = {
          talkId,
          senderId: currentUserId,
          senderType: "staff",
          senderName: "スタッフ",
          text: `査定価格: ${price}円${note ? ` (${note})` : ""}`,
          read: false,
          readBy: [currentUserId],
          createdAt: firestore.Timestamp.now(),
          type: "appraisalPrice",
          appraisalPrice: price,
          appraisalPriceNote: note,
          isOfficialOffer: isOfficial,
        };

        transaction.set(messageRef, messageData);
        transaction.update(talkRef, {
          lastMessage: `査定価格: ${price}円`,
          lastMessageAt: firestore.Timestamp.now(),
          updatedAt: firestore.Timestamp.now(),
          currentAppraisalPrice: price,
          appraisalStatus: isOfficial ? "completed" : "in_progress",
          ...(isOfficial && { finalAppraisalPrice: price }),
        });
      });
    } catch (err) {
      console.error("Error sending appraisal price:", err);
      throw err;
    }
  };

  return {
    talk,
    loading,
    loadingMore,
    hasMoreMessages,
    error,
    loadMoreMessages,
    markMessageAsRead,
    sendAppraisalPrice,
  };
};
