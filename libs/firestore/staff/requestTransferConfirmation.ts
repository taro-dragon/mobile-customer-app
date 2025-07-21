import { Message } from "@/types/firestore_schema/messages";
import firestore from "@react-native-firebase/firestore";

export type submitData = {
  talkId: string;
  senderId: string;
  message: string;
};

export const requestTransferConfirmation = async ({
  talkId,
  senderId,
  message,
}: submitData): Promise<void> => {
  try {
    const talkRef = firestore().collection("talks").doc(talkId);
    const messageRef = talkRef.collection("messages").doc();
    const sendMessageData: Message = {
      talkId,
      senderId,
      senderType: "staff",
      text: message,
      type: "transferConfirmation",
      id: messageRef.id,
      createdAt: firestore.Timestamp.now(),
      readBy: [],
    };
    await messageRef.set(sendMessageData);
    await talkRef.update({
      lastMessage: message,
      lastMessageAt: firestore.Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};
