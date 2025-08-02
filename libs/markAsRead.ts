import firestore from "@react-native-firebase/firestore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

/**
 * メッセージを既読にする
 * @param talkId トークID
 * @param messageId メッセージID
 * @param userId ユーザーID
 */
export const markMessageAsRead = async (
  userId: string,
  talkDocRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
) => {
  try {
    const messageRef = talkDocRef.collection("messages").doc();
    const messageDoc = await messageRef.get();
    if (!messageDoc.exists) {
      throw new Error("Message not found");
    }

    const messageData = messageDoc.data();
    const readBy = messageData?.readBy || [];

    // 既に既読済みでない場合のみ追加
    if (!readBy.includes(userId)) {
      await messageRef.update({
        readBy: [...readBy, userId],
      });
    }

    // トークの未読カウントを更新
    await updateTalkUnreadCount(userId, talkDocRef);
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

/**
 * トーク内の全メッセージを既読にする
 * @param talkId トークID
 * @param userId ユーザーID
 */
export const markAllMessagesAsRead = async (
  userId: string,
  talkDocRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
) => {
  try {
    const messagesRef = talkDocRef.collection("messages");
    const unreadMessagesSnapshot = await messagesRef
      .where("readBy", "not-in", [[userId]])
      .get();

    const batch = firestore().batch();
    unreadMessagesSnapshot.docs.forEach((doc) => {
      const messageData = doc.data();
      const readBy = messageData.readBy || [];
      batch.update(doc.ref, {
        readBy: [...readBy, userId],
      });
    });

    await batch.commit();

    // トークの未読カウントを更新
    await updateTalkUnreadCount(userId, talkDocRef);
  } catch (error) {
    throw error;
  }
};

/**
 * トークの未読カウントを更新
 * @param talkId トークID
 * @param userId ユーザーID
 */
export const updateTalkUnreadCount = async (
  userId: string,
  talkDocRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
) => {
  try {
    const messagesRef = talkDocRef.collection("messages");

    const unreadSnapshot = await messagesRef
      .where("readBy", "not-in", [[userId]])
      .get();

    const unreadCount = unreadSnapshot.docs.length;

    // トークドキュメントを更新
    await talkDocRef.update({
      [`unreadCounts.${userId}`]: unreadCount,
      [`lastReadAt.${userId}`]: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating talk unread count:", error);
    throw error;
  }
};

/**
 * 新しいメッセージが送信された時の未読カウント更新
 * @param talkId トークID
 * @param senderId 送信者ID
 */
export const updateUnreadCountOnNewMessage = async (
  senderId: string,
  talkDocRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
) => {
  try {
    const talkDoc = await talkDocRef.get();

    if (!talkDoc.exists) return;

    const talkData = talkDoc.data();
    const unreadCounts = talkData?.unreadCounts || {};
    const staffIds = talkData?.staffIds || [];
    const userId = talkData?.userId;

    // 全参加者の未読カウントを更新
    const updateData: any = {};

    // スタッフの未読カウントを更新
    staffIds.forEach((staffId: string) => {
      if (staffId !== senderId) {
        const currentCount = unreadCounts[staffId] || 0;
        updateData[`unreadCounts.${staffId}`] = currentCount + 1;
      }
    });

    // ユーザーの未読カウントを更新（送信者がスタッフの場合）
    if (senderId !== userId) {
      const currentCount = unreadCounts[userId] || 0;
      updateData[`unreadCounts.${userId}`] = currentCount + 1;
    }

    if (Object.keys(updateData).length > 0) {
      await talkDocRef.update(updateData);
    }
  } catch (error) {
    console.error("Error updating unread count on new message:", error);
    throw error;
  }
};

/**
 * 未読メッセージ数を取得
 * @param talkId トークID
 * @param userId ユーザーID
 */
export const getUnreadMessageCount = async (
  userId: string,
  talkDocRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
): Promise<number> => {
  try {
    const messagesRef = talkDocRef.collection("messages");

    const unreadSnapshot = await messagesRef
      .where("readBy", "not-in", [[userId]])
      .get();

    return unreadSnapshot.docs.length;
  } catch (error) {
    return 0;
  }
};
