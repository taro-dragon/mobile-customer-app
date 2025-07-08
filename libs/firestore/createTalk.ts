import firestore from "@react-native-firebase/firestore";
import { Talk } from "@/types/firestore_schema/talks";
import { Message } from "@/types/firestore_schema/messages";

export type CreateTalkParams = {
  userId: string;
  carId: string;
  affiliateStoreId: string;
  staffIds: string[];
  sourceType: "buyOffer" | "bids" | "car_inquiry";
  sourceId: string;
  title?: string;
  description?: string;
};

export const createTalk = async (params: CreateTalkParams): Promise<string> => {
  try {
    const talkRef = firestore().collection("talks").doc();
    const talkId = talkRef.id;
    // 車両情報を取得してタイトルを生成
    let title = params.title;
    if (!title) {
      try {
        const carDoc = await firestore()
          .collection("cars")
          .doc(params.carId)
          .get();
        if (carDoc.exists()) {
          const carData = carDoc.data();
          title = `一括査定 - ${carData?.maker || ""} ${carData?.model || ""}`;
        } else {
          title = "一括査定";
        }
      } catch (error) {
        title = "一括査定";
      }
    }

    const talkData: Omit<Talk, "id"> = {
      userId: params.userId,
      carId: params.carId,
      affiliateStoreId: params.affiliateStoreId,
      staffIds: params.staffIds,
      sourceType: params.sourceType,
      sourceId: params.sourceId,
      status: "active",
      lastMessage: "一括査定を開始しました",
      isArchived: false,
      lastMessageAt: firestore.Timestamp.now(),
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
      title,
      description: params.description,
      settings: {
        allowUserMessage: true,
        allowStaffMessage: true,
        notifyOnNewMessage: true,
      },
      appraisalStatus: "pending",
    };

    // システムメッセージを作成
    const systemMessage: Omit<Message, "id"> = {
      talkId,
      senderId: "system",
      senderType: "staff",
      senderName: "システム",
      text: "一括査定を開始しました",
      read: false,
      readBy: [],
      createdAt: firestore.Timestamp.now(),
      type: "system",
      systemAction: "appraisal_started",
      systemData: {
        staffCount: params.staffIds.length,
        sourceType: params.sourceType,
      },
    };

    // バッチでTalkとシステムメッセージを作成
    const batch = firestore().batch();

    // Talkを作成
    batch.set(talkRef, talkData);

    // システムメッセージを追加
    const messageRef = firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .doc();
    batch.set(messageRef, systemMessage);

    await batch.commit();

    return talkId;
  } catch (error) {
    console.error("Error creating talk:", error);
    throw error;
  }
};
