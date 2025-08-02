import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type InternalMessage = {
  id: string;
  talkId: string;
  senderId: string; // はスタッフID
  text: string;
  imageUrl?: string; // 画像URL（オプション）
  fileUrl?: string; // ファイルURL（オプション）
  fileName?: string; // ファイル名（オプション）
  fileSize?: number; // ファイルサイズ（オプション）
  readBy?: string[]; // 既読したユーザー/スタッフIDの配列
  createdAt: FirebaseFirestoreTypes.Timestamp;
  type?: "text" | "image" | "file" | "video" | "location" | "system";
  videoUrl?: string; //videoのURL
  videoDuration?: number; //videoの再生時間
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  systemAction?:
    | "appraisal_started"
    | "appraisal_completed"
    | "staff_joined"
    | "staff_left";
};
