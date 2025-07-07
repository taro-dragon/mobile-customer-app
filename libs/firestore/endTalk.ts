import firestore from "@react-native-firebase/firestore";

export const endTalk = async (talkId: string) => {
  await firestore().collection("talks").doc(talkId).update({
    status: "closed",
    isArchived: true,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });

  // システムメッセージを追加
  await firestore().collection("talks").doc(talkId).collection("messages").add({
    talkId,
    type: "system",
    text: "この問い合わせは終了しました",
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};
