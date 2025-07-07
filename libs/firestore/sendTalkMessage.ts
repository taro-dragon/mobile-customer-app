import firestore from "@react-native-firebase/firestore";
import { Message } from "@/types/firestore_schema/messages";
import { Talk } from "@/types/firestore_schema/talks";

export type SendTalkMessageParams = {
  talkId: string;
  senderId: string;
  senderType: "user" | "staff";
  senderName?: string;
  text: string;
  type?:
    | "text"
    | "image"
    | "file"
    | "appraisalPrice"
    | "video"
    | "location"
    | "system";
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  // 査定関連
  appraisalPrice?: string;
  appraisalPriceNote?: string;
  isOfficialOffer?: boolean;
  // システムメッセージ
  systemAction?:
    | "appraisal_started"
    | "appraisal_completed"
    | "staff_joined"
    | "staff_left";
  systemData?: Record<string, any>;
};

export const sendTalkMessage = async (
  params: SendTalkMessageParams
): Promise<void> => {
  try {
    const messageData: Omit<Message, "id"> = {
      talkId: params.talkId,
      senderId: params.senderId,
      senderType: params.senderType,
      senderName: params.senderName,
      text: params.text,
      read: false,
      readBy: [params.senderId], // 送信者は既読状態
      createdAt: firestore.Timestamp.now(),
      type: params.type || "text",
      imageUrl: params.imageUrl,
      fileUrl: params.fileUrl,
      fileName: params.fileName,
      fileSize: params.fileSize,
      appraisalPrice: params.appraisalPrice,
      appraisalPriceNote: params.appraisalPriceNote,
      isOfficialOffer: params.isOfficialOffer,
      systemAction: params.systemAction,
      systemData: params.systemData,
    };

    await firestore().runTransaction(async (transaction) => {
      // メッセージを追加
      const messageRef = firestore()
        .collection("talks")
        .doc(params.talkId)
        .collection("messages")
        .doc();

      // Talkの最終メッセージを更新
      const talkRef = firestore().collection("talks").doc(params.talkId);

      transaction.set(messageRef, messageData);
      transaction.update(talkRef, {
        lastMessage: params.text,
        lastMessageAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      });

      // 査定価格が含まれる場合は更新
      if (params.appraisalPrice) {
        transaction.update(talkRef, {
          currentAppraisalPrice: params.appraisalPrice,
          appraisalStatus: "in_progress",
        });
      }

      // 正式オファーの場合は最終価格を更新
      if (params.isOfficialOffer && params.appraisalPrice) {
        transaction.update(talkRef, {
          finalAppraisalPrice: params.appraisalPrice,
          appraisalStatus: "completed",
        });
      }
    });
  } catch (error) {
    console.error("Error sending talk message:", error);
    throw error;
  }
};
