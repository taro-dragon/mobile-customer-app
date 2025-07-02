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
import { uploadTalkFile } from "@/libs/firestore/uploadTalkFile";
import { Message } from "@/types/firestore_schema/messages";

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

      // 共通アップロード関数を利用
      await uploadTalkFile({
        talkId: talk.id,
        staffId: staff?.id ?? "",
        file,
        onProgress: setUploadProgress,
      });

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500); // 完了表示を少し表示
    } catch (error) {
      console.error("ファイル送信エラー:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onPressMedia = async () => {
    if (isUploading) return; // アップロード中は重複実行を防ぐ

    try {
      setUploadProgress(0);

      // 画像または動画を選択
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.8,
        videoMaxDuration: 60, // 動画の最大長を60秒に制限
      });

      if (result.canceled) {
        setUploadProgress(0);
        return;
      }

      const media = result.assets[0];
      if (!media) {
        setUploadProgress(0);
        return;
      }

      setIsUploading(true);
      setUploadProgress(10); // メディア選択完了

      // ファイル拡張子を取得
      const fileExtension = media.uri.split(".").pop()?.toLowerCase() || "mp4";
      const isVideo = media.type === "video";
      const fileName = `${Date.now()}_${
        isVideo ? "video" : "image"
      }.${fileExtension}`;
      const storagePath = `talks/${talk.id}/${
        isVideo ? "videos" : "images"
      }/${fileName}`;

      // Firebase Storageにアップロード
      const mediaRef = storage().ref().child(storagePath);
      const uploadTask = mediaRef.putFile(media.uri);

      // アップロード進捗を監視
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 80 + 10; // 10-90%
          setUploadProgress(progress);
        },
        (error) => {
          console.error("メディアアップロードエラー:", error);
          setIsUploading(false);
          setUploadProgress(0);
        },
        async () => {
          setUploadProgress(90); // アップロード完了
          const downloadURL = await mediaRef.getDownloadURL();

          // Firestoreにメッセージとして保存
          await firestore().runTransaction(async (transaction) => {
            const messageRef = firestore()
              .collection("talks")
              .doc(talk.id)
              .collection("messages")
              .doc();

            const talkRef = firestore().collection("talks").doc(talk.id);

            const messageData: Message = {
              id: messageRef.id,
              talkId: talk.id,
              text: isVideo ? "動画" : "画像",
              createdAt: firestore.Timestamp.now(),
              senderType: "staff",
              senderId: staff?.id || "",
              type: isVideo ? "video" : "image",
              read: false,
            };

            if (isVideo) {
              messageData.videoUrl = downloadURL;
              if (media.duration) {
                messageData.videoDuration = media.duration;
              }
            } else {
              messageData.imageUrl = downloadURL;
            }

            await transaction.set(messageRef, messageData);

            await transaction.update(talkRef, {
              lastMessage: isVideo ? "動画" : "画像",
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
      console.error("メディア送信エラー:", error);
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
          label: "メディア",
          icon: Image,
          onPress: onPressMedia,
          disabled: isUploading,
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            router.push(`/talks/${talk.id}/map`);
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
          label: "メディア",
          icon: Image,
          onPress: onPressMedia,
          disabled: isUploading,
        },
        {
          label: "位置情報",
          icon: MapPin,
          onPress: () => {
            router.push(`/talks/${talk.id}/map`);
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
