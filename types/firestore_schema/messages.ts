import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = {
  id: string;
  talkId: string;
  senderId: string; // ユーザーIDまたはスタッフID
  senderType: "user" | "staff"; // 送信者タイプ
  text: string;
  imageUrl?: string; // 画像URL（オプション）
  fileUrl?: string; // ファイルURL（オプション）
  fileName?: string; // ファイル名（オプション）
  fileSize?: number; // ファイルサイズ（オプション）
  read: boolean; // 既読状態
  createdAt: FirebaseFirestoreTypes.Timestamp;
  type?:
    | "image"
    | "file"
    | "currentCarCheckRequested"
    | "appraisalPrice"
    | "video"
    | "location";
  isAnswered?: boolean; //currentCarCheckRequestedの回答フラグ
  isOpened?: boolean; //appraisalPriceの開封フラグ
  appraisalPrice?: string; //appraisalPriceの査定金額
  appraisalPriceNote?: string; //appraisalPriceの査定金額のメモ
  videoUrl?: string; //videoのURL
  videoDuration?: number; //videoの再生時間
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
};
