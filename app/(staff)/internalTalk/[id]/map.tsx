import React from "react";
import SearchMap from "@/components/map/SearchMap";
import { useRouter, useLocalSearchParams } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { useStore } from "@/hooks/useStore";

const TalkMap = () => {
  const router = useRouter();
  const { staff, currentStore } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleSubmit = async (lat: number, lng: number, address?: string) => {
    if (!id || !currentStore) {
      console.error("talkId is required");
      return;
    }

    try {
      await firestore().runTransaction(async (transaction) => {
        const messageRef = firestore()
          .collection("shops")
          .doc(currentStore.id)
          .collection("talks")
          .doc(id)
          .collection("messages")
          .doc();

        const talkRef = firestore()
          .collection("shops")
          .doc(currentStore.id)
          .collection("talks")
          .doc(id);

        // 位置情報メッセージを作成
        const locationMessage = {
          talkId: id,
          text: address || "位置情報",
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderType: "staff",
          senderId: staff?.id,
          type: "location",
          location: {
            latitude: lat,
            longitude: lng,
            address: address || "",
          },
          readBy: [],
        };

        await transaction.set(messageRef, locationMessage);

        // トークの最終メッセージを更新
        await transaction.update(talkRef, {
          lastMessage: address || "位置情報を送信しました",
          updatedAt: firestore.Timestamp.now(),
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
