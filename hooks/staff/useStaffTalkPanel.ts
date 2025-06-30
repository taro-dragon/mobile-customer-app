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
import storage from "@react-native-firebase/storage";
import * as DocumentPicker from "expo-document-picker";

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

  const onPressFile = async () => {
    try {
      // ファイルを選択
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // すべてのファイルタイプを許可
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      if (!file) {
        return;
      }

      // Firebase Storageにアップロード
      const fileRef = storage()
        .ref()
        .child(`talks/${talk.id}/files/${Date.now()}_${file.name}`);

      await fileRef.putFile(file.uri);
      const downloadURL = await fileRef.getDownloadURL();

      // Firestoreにメッセージとして保存
      await firestore().runTransaction(async (transaction) => {
        const messageRef = firestore()
          .collection("talks")
          .doc(talk.id)
          .collection("messages")
          .doc();

        const talkRef = firestore().collection("talks").doc(talk.id);

        await transaction.set(messageRef, {
          talkId: talk.id,
          text: `ファイル: ${file.name}`,
          fileUrl: downloadURL,
          fileName: file.name,
          fileSize: file.size,
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderType: "staff",
          senderId: staff?.id,
          type: "file",
          read: false,
        });

        await transaction.update(talkRef, {
          lastMessage: `ファイル: ${file.name}`,
          lastMessageAt: firestore.Timestamp.now(),
        });
      });
    } catch (error) {
      console.error("ファイル送信エラー:", error);
    }
  };

  const panel = useMemo(() => {
    if (talk.sourceType === "car_inquiry") {
      return [
        {
          label: "ファイル",
          icon: File,
          onPress: onPressFile,
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
          onPress: onPressFile,
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
            router.push(`/talks/${talk.id}/appraisalPrice/create`);
          },
        },
      ];
    }
  }, [talk.sourceType, talk.id]);

  return panel;
};

export default useStaffTalkPanel;
