import { useMemo, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useStore } from "../useStore";

const useStaffTalkPanel = (talk: TalkWithUser) => {
  const router = useRouter();
  const { staff } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (isUploading) return; // アップロード中は重複実行を防ぐ

    try {
      setUploadProgress(0);

      // ファイルを選択
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // すべてのファイルタイプを許可
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setUploadProgress(0);
        return;
      }

      const file = result.assets[0];
      if (!file) {
        setUploadProgress(0);
        return;
      }

      // ファイルサイズチェック（50MB = 50 * 1024 * 1024 bytes）
      const maxFileSize = 50 * 1024 * 1024; // 50MB
      if (file.size && file.size > maxFileSize) {
        Toast.show({
          type: "error",
          text1: "エラー",
          text2: "ファイルサイズが50MBを超えています。",
        });
        setUploadProgress(0);
        return;
      }
      setIsUploading(true);
      setUploadProgress(10); // ファイル選択完了

      // Firebase Storageにアップロード
      const fileRef = storage()
        .ref()
        .child(`talks/${talk.id}/files/${Date.now()}_${file.name}`);

      const uploadTask = fileRef.putFile(file.uri);

      // アップロード進捗を監視
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 80 + 10; // 10-90%
          setUploadProgress(progress);
        },
        (error) => {
          console.error("ファイルアップロードエラー:", error);
          setIsUploading(false);
          setUploadProgress(0);
        },
        async () => {
          setUploadProgress(90); // アップロード完了
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

          setUploadProgress(100); // 完了
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 500); // 完了表示を少し表示
        }
      );
    } catch (error) {
      console.error("ファイル送信エラー:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onPressImage = async () => {
    if (isUploading) return; // アップロード中は重複実行を防ぐ

    try {
      setUploadProgress(0);

      // 画像を選択
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (result.canceled) {
        setUploadProgress(0);
        return;
      }

      const image = result.assets[0];
      if (!image) {
        setUploadProgress(0);
        return;
      }
      setIsUploading(true);
      setUploadProgress(10); // 画像選択完了

      // Firebase Storageにアップロード
      const imageRef = storage()
        .ref()
        .child(`talks/${talk.id}/images/${Date.now()}_image.jpg`);

      const uploadTask = imageRef.putFile(image.uri);

      // アップロード進捗を監視
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 80 + 10; // 10-90%
          setUploadProgress(progress);
        },
        (error) => {
          console.error("画像アップロードエラー:", error);
          setIsUploading(false);
          setUploadProgress(0);
        },
        async () => {
          setUploadProgress(90); // アップロード完了
          const downloadURL = await imageRef.getDownloadURL();

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
              text: "画像",
              imageUrl: downloadURL,
              createdAt: firestore.FieldValue.serverTimestamp(),
              senderType: "staff",
              senderId: staff?.id,
              type: "image",
              read: false,
            });

            await transaction.update(talkRef, {
              lastMessage: "画像",
              lastMessageAt: firestore.Timestamp.now(),
            });
          });

          setUploadProgress(100); // 完了
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 500); // 完了表示を少し表示
        }
      );
    } catch (error) {
      console.error("画像送信エラー:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const panel = useMemo(() => {
    if (talk.sourceType === "car_inquiry") {
      return [
        {
          label: "ファイル",
          icon: File,
          onPress: onPressFile,
          disabled: isUploading,
        },
        {
          label: "画像",
          icon: Image,
          onPress: onPressImage,
          disabled: isUploading,
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            console.log("位置情報");
          },
          disabled: isUploading,
        },
        {
          label: "来店日程調整",
          icon: Calendar,
          onPress: () => {
            console.log("日程調整");
          },
          disabled: isUploading,
        },
      ];
    } else {
      return [
        {
          label: "ファイル",
          icon: File,
          onPress: onPressFile,
          disabled: isUploading,
        },
        {
          label: "画像",
          icon: Image,
          onPress: onPressImage,
          disabled: isUploading,
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            console.log("位置情報");
          },
          disabled: isUploading,
        },
        {
          label: "現車確認依頼",
          icon: Car,
          onPress: () => {
            onPressCheckCurrentCar(talk.id);
          },
          disabled: isUploading,
        },
        {
          label: "査定金額提示",
          icon: DollarSign,
          onPress: () => {
            router.push(`/talks/${talk.id}/appraisalPrice/create`);
          },
          disabled: isUploading,
        },
      ];
    }
  }, [talk.sourceType, talk.id, isUploading]);

  return {
    panel,
    isUploading,
    uploadProgress,
  };
};

export default useStaffTalkPanel;
