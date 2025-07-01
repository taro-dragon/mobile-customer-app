import firestore from "@react-native-firebase/firestore";
import { uploadFile } from "@/libs/uploadFile";

export type UploadTalkFileParams = {
  talkId: string;
  staffId: string;
  file: { uri: string; name: string; size?: number };
  onProgress?: (progress: number) => void;
};

export const uploadTalkFile = async ({
  talkId,
  staffId,
  file,
  onProgress,
}: UploadTalkFileParams): Promise<void> => {
  // Firebase Storageへアップロード（汎用関数利用）
  const path = `talks/${talkId}/files/${Date.now()}_${file.name}`;
  const downloadURL = await uploadFile({ path, file, onProgress });

  // Firestoreにメッセージとして保存
  await firestore().runTransaction(async (transaction) => {
    const messageRef = firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .doc();
    const talkRef = firestore().collection("talks").doc(talkId);

    await transaction.set(messageRef, {
      talkId,
      text: `ファイル: ${file.name}`,
      fileUrl: downloadURL,
      fileName: file.name,
      fileSize: file.size,
      createdAt: firestore.FieldValue.serverTimestamp(),
      senderType: "staff",
      senderId: staffId,
      type: "file",
      read: false,
    });

    await transaction.update(talkRef, {
      lastMessage: `ファイル: ${file.name}`,
      lastMessageAt: firestore.Timestamp.now(),
    });
  });
  onProgress?.(100);
};
