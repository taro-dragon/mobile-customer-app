import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = {
  id: string;
  chatId: string; // チャットID
  senderId: string; // 送信者ID（ユーザーまたはスタッフ）
  senderType: "user" | "staff"; // 送信者タイプ
  content: string; // メッセージ内容
  attachmentUrls: string[]; // 添付ファイルURL
  isRead: boolean; // 既読かどうか
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
