import { useMemo } from "react";
import { useRouter } from "expo-router";
import {
  Calendar,
  Car,
  DollarSign,
  File,
  Image,
  MapPin,
} from "lucide-react-native";
import firestore from "@react-native-firebase/firestore";

import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useStore } from "../useStore";

const useStaffTalkPanel = (talk: TalkWithUser) => {
  const router = useRouter();
  const { staff } = useStore();
  const onPressCheckCurrentCar = async (talkId: string) => {
    await firestore().runTransaction(async (transaction) => {
      const messageRef = await firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .doc();
      const talkRef = await firestore().collection("talks").doc(talkId);
      await transaction.set(messageRef, {
        talkId,
        text: "現車確認依頼",
        createdAt: firestore.FieldValue.serverTimestamp(),
        senderType: "staff",
        senderId: staff?.id,
        type: "currentCarCheckRequested",
        read: false,
        isAnswered: false,
      });
      await transaction.update(talkRef, {
        lastMessage: "現車確認依頼",
        lastMessageAt: firestore.Timestamp.now(),
      });
    });
  };
  const panel = useMemo(() => {
    if (talk.sourceType === "car_inquiry") {
      return [
        {
          label: "ファイル",
          icon: File,
          onPress: () => {
            console.log("ファイル");
          },
        },
        {
          label: "画像",
          icon: Image,
          onPress: () => {
            console.log("画像");
          },
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            console.log("位置情報");
          },
        },
        {
          label: "来店日程調整",
          icon: Calendar,
          onPress: () => {
            console.log("日程調整");
          },
        },
      ];
    } else {
      return [
        {
          label: "ファイル",
          icon: File,
          onPress: () => {
            console.log("ファイル");
          },
        },
        {
          label: "画像",
          icon: Image,
          onPress: () => {
            console.log("画像");
          },
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            console.log("位置情報");
          },
        },
        {
          label: "現車確認依頼",
          icon: Car,
          onPress: () => {
            onPressCheckCurrentCar(talk.id);
          },
        },
        {
          label: "査定金額提示",
          icon: DollarSign,
          onPress: () => {
            console.log("査定金額提示");
          },
        },
      ];
    }
  }, [talk.sourceType]);
  return panel;
};

export default useStaffTalkPanel;
