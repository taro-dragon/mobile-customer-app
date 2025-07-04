import React from "react";
import SearchMap from "@/components/map/SearchMap";
import { useRouter, useLocalSearchParams } from "expo-router";
import firestore from "@react-native-firebase/firestore";

const TalkMap = () => {
  const router = useRouter();
  const { talkId } = useLocalSearchParams<{ talkId: string }>();

  const handleSubmit = async (lat: number, lng: number, address?: string) => {
    if (!talkId) {
      console.error("talkId is required");
      return;
    }

    try {
      await firestore().runTransaction(async (transaction) => {
        const messageRef = firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .doc();

        const talkRef = firestore().collection("talks").doc(talkId);

        // 位置情報メッセージを作成
        const locationMessage = {
          talkId,
          text: address || "位置情報",
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderType: "staff",
          type: "location",
          location: {
            latitude: lat,
            longitude: lng,
            address: address || "",
          },
          read: false,
        };

        await transaction.set(messageRef, locationMessage);

        // トークの最終メッセージを更新
        await transaction.update(talkRef, {
          lastMessage: address || "位置情報を送信しました",
          lastMessageAt: firestore.Timestamp.now(),
        });
      });

      router.back();
    } catch (error) {
      console.error("Failed to send location:", error);
    }
  };

  return <SearchMap submit={handleSubmit} />;
};

export default TalkMap;
