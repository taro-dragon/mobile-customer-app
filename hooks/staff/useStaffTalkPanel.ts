import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  Calendar,
  Car,
  DollarSign,
  File,
  Image,
  MapPin,
  Send,
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
import { submitCheckCurrentCar } from "@/cloudFunctions/staff/talk/submitCheckCurrentCar";
import { useTheme } from "@/contexts/ThemeContext";
import { useModal } from "@/contexts/ModalContext";
import { requestTransferConfirmation } from "@/libs/firestore/staff/requestTransferConfirmation";

const useStaffTalkPanel = (
  talk: TalkWithUser,
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { staff } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const { showModal, hideModal } = useModal();
  const [uploadProgress, setUploadProgress] = useState(0);
  const sentCheckCurrentCar = useMemo(() => {
    return !!talk.checkCurrentCarStatus;
  }, [talk.checkCurrentCarStatus]);
  const sentAppraisalPrice = useMemo(() => {
    return !!talk.appraisal;
  }, [talk.appraisal]);

  const onPressCheckCurrentCar = async (talkId: string) => {
    try {
      showModal("送信中");
      await submitCheckCurrentCar({
        talkId,
        shopId: talk.affiliateStoreId,
      });
      Toast.show({
        type: "success",
        text1: "現車確認依頼を送信しました",
      });
      setIsOpenPanel(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "現車確認依頼に失敗しました",
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
    } finally {
      hideModal();
    }
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
              readBy: [],
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

  const onPressTransferConfirmation = async () => {
    try {
      await requestTransferConfirmation({
        talkId: talk.id,
        senderId: staff?.id || "",
        message: "買取金額の振込を実行しました。確認をお願いします",
      });
      Toast.show({
        type: "success",
        text1: "振込確認依頼を送信しました",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "振込確認依頼に失敗しました",
        text2: error instanceof Error ? error.message : "不明なエラー",
      });
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
          iconColor: colors.textSuccess,
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
          label: sentCheckCurrentCar ? "確認依頼済" : "現車確認依頼",
          icon: Car,
          onPress: () => {
            onPressCheckCurrentCar(talk.id);
          },
          disabled: isUploading || sentCheckCurrentCar,
          iconColor: colors.textSuccess,
        },
        {
          label: sentAppraisalPrice ? "金額提示済" : "正式査定金額",
          icon: DollarSign,
          onPress: () => {
            router.push(`/talks/${talk.id}/appraisalPrice/create`);
          },
          disabled: isUploading || sentAppraisalPrice,
          iconColor: colors.textWarning,
        },
        {
          label: "振込確認依頼",
          icon: Send,
          onPress: onPressTransferConfirmation,
          disabled: isUploading,
          iconColor: colors.textInfo,
        },
      ];
    }
  }, [
    talk.sourceType,
    talk.id,
    isUploading,
    sentCheckCurrentCar,
    sentAppraisalPrice,
  ]);

  return {
    panel,
    isUploading,
    uploadProgress,
  };
};

export default useStaffTalkPanel;
