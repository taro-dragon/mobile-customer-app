import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Check, Download } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import ImageZoomModal from "./ImageZoomModal";

type ImageMessageItemProps = {
  talk: TalkWithUser;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};

const ImageMessageItem: React.FC<ImageMessageItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const { colors } = useTheme();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);

  // アバター画像のURLを決定
  const getAvatarUrl = () => {
    if (message.senderType === "staff") {
      // スタッフのプロフィール画像は都度fetchするため、デフォルト画像を使用
      return ""; // デフォルト画像が表示される
    } else {
      return (
        talk.sourceCar?.images.front || talk.sourceStockCar?.images.front || ""
      ); // 車両画像
    }
  };

  // 送信者名を取得
  const getSenderName = () => {
    if (message.senderType === "staff") {
      if (isMe) {
        return "自分";
      } else {
        // talkオブジェクトからスタッフ情報を取得
        const staff = talk.staffs?.get(message.senderId);
        return staff ? staff.name : "不明なスタッフ";
      }
    } else {
      // talkオブジェクトからユーザー情報を取得
      return talk.user
        ? `${talk.user.familyName} ${talk.user.givenName}`
        : "不明なユーザー";
    }
  };

  const handleImagePress = () => {
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
  };

  const handleDownload = async () => {
    if (!message.imageUrl) return;

    setIsDownloading(true);
    setShowProgressModal(true);
    setDownloadProgress(0);

    try {
      const fileName = `image_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      const downloadResumable = FileSystem.createDownloadResumable(
        message.imageUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (result && result.uri) {
        await Sharing.shareAsync(result.uri);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
      setShowProgressModal(false);
      setDownloadProgress(0);
    }
  };

  return (
    <>
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.userMessage : styles.otherMessage,
        ]}
      >
        {!isMe && (
          <Image
            source={{
              uri: getAvatarUrl(),
            }}
            style={styles.avatar}
          />
        )}
        <View
          style={[
            styles.bubble,
            isMe ? styles.userBubble : styles.otherBubble,
            {
              backgroundColor: bubbleColor.backgroundColor,
              borderColor: bubbleColor.borderColor,
              borderWidth: 1,
            },
          ]}
        >
          {/* 送信者名表示 */}
          {!isMe && (
            <Text style={[styles.senderName, { color: colors.textSecondary }]}>
              {getSenderName()}
            </Text>
          )}

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePress}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: message.imageUrl || "" }}
              style={styles.image}
              contentFit="cover"
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
              marginTop: 4,
            }}
          >
            {message.read && isMe && <Check size={12} color={colors.primary} />}
            <TouchableOpacity onPress={handleDownload} disabled={isDownloading}>
              <Download size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(message.createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>

      <ImageZoomModal
        visible={isImageModalVisible}
        imageUrl={message.imageUrl || ""}
        onRequestClose={() => setIsImageModalVisible(false)}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
        colors={colors}
      />

      <DownloadProgressModal
        visible={showProgressModal}
        downloadProgress={downloadProgress}
        fileName="画像"
      />
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  bubble: {
    maxWidth: "85%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 4,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  senderName: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
});

export default ImageMessageItem;
