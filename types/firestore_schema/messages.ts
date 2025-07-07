import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Message = {
  id: string;
  talkId: string;
  senderId: string; // ユーザーIDまたはスタッフID
  senderType: "user" | "staff"; // 送信者タイプ
  senderName?: string; // 送信者名（表示用）
  text: string;
  imageUrl?: string; // 画像URL（オプション）
  fileUrl?: string; // ファイルURL（オプション）
  fileName?: string; // ファイル名（オプション）
  fileSize?: number; // ファイルサイズ（オプション）
  read: boolean; // 既読状態
  readBy?: string[]; // 既読したユーザー/スタッフIDの配列
  createdAt: FirebaseFirestoreTypes.Timestamp;
  type?:
    | "text"
    | "image"
    | "file"
    | "currentCarCheckRequested"
    | "appraisalPrice"
    | "video"
    | "location"
    | "system";
  isAnswered?: boolean; //currentCarCheckRequestedの回答フラグ
  isOpened?: boolean; //appraisalPriceの開封フラグ
  appraisalPrice?: string; //appraisalPriceの査定金額
  appraisalPriceNote?: string; //appraisalPriceの査定金額のメモ
  isOfficialOffer?: boolean; // 正式なオファーかどうか
  isAccepted?: boolean; // オファーが受け入れられたかどうか
  videoUrl?: string; //videoのURL
  videoDuration?: number; //videoの再生時間
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  // システムメッセージ用
  systemAction?:
    | "appraisal_started"
    | "appraisal_completed"
    | "staff_joined"
    | "staff_left";
  systemData?: Record<string, any>;
};
