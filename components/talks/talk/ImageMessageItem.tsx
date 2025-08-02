import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Check, Download } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import ImageZoomModal from "./ImageZoomModal";

type ImageMessageItemProps = {
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
  senderName: string;
  avatarUrl?: string;
  readCount: number;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  imageUrl: string;
};

const ImageMessageItem: React.FC<ImageMessageItemProps> = ({
  isMe,
  bubbleColor,
  senderName,
  avatarUrl,
  readCount,
  createdAt,
  imageUrl,
}) => {
  const { colors } = useTheme();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const handleImagePress = () => {
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    setShowProgressModal(true);
    setDownloadProgress(0);

    try {
      const fileName = `image_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
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
              uri: avatarUrl,
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
              {senderName}
            </Text>
          )}

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePress}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: imageUrl || "" }}
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
            {readCount > 0 && isMe && (
              <Check size={12} color={colors.primary} />
            )}
            <TouchableOpacity onPress={handleDownload} disabled={isDownloading}>
              <Download size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>

      <ImageZoomModal
        visible={isImageModalVisible}
        imageUrl={imageUrl || ""}
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
