import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type Talk = {
  id: string;
  userId: string; // ユーザーID
  carId: string; // 車両ID
  affiliateStoreId: string; // 加盟店ID
  staffIds: string[]; // 参加スタッフIDの配列（複数対応）
  sourceType: "buy_offer" | "bids" | "car_inquiry"; // チャットの発生源
  sourceId: string; // 発生源ID（買取オファーIDまたは一括査定依頼ID）
  sourceCarId?: string; // 車両ID
  status: "active" | "closed"; // チャットの状態
  lastMessage: string; // 最後のメッセージ
  isArchived: boolean; // チャットがアーカイブされているかどうか
  lastMessageAt: FirebaseFirestoreTypes.Timestamp; // 最後のメッセージ時間
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  // グループ機能の追加
  title?: string; // グループ名
  description?: string; // グループの説明
  settings?: {
    allowUserMessage: boolean;
    allowStaffMessage: boolean;
    notifyOnNewMessage: boolean;
  };
  // 査定関連の追加フィールド
  appraisalStatus?: "pending" | "in_progress" | "completed" | "cancelled";
  currentAppraisalPrice?: string;
  finalAppraisalPrice?: string;
  preferredInfo?: {
    preferredDates: {
      datetime: {
        seconds: number;
        nanoseconds: number;
      };
      priority: number;
    }[];
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    comment: string;
  };
  checkCurrentCarStatus?: {
    isAnswered: boolean;
    senderId: string;
    atSended: FirebaseFirestoreTypes.Timestamp;
  };
  appraisal?: {
    appraisalPrice: number;
    appraisalPriceNote: string;
    expiryDate: FirebaseFirestoreTypes.Timestamp;
    isOpened: boolean;
  };
};

export type InternalTalk = {
  id: string;
  name: string;
  photoUrl?: string;
  staffIds: string[];
  lastMessage: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  status: "active" | "closed"; // チャットの状態
};
