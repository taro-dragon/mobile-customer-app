import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Check, Download, X } from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";

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

  const handleImagePress = () => {
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
  };

  const handleDownload = async () => {
    if (!message.imageUrl) {
      Alert.alert("エラー", "画像URLが存在しません");
      return;
    }

    if (isDownloading) return; // 重複ダウンロードを防ぐ

    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setShowProgressModal(true);

      const timestamp = Date.now();
      const fileName = `image_${timestamp}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      console.log("画像ダウンロード開始:", message.imageUrl);
      console.log("保存先:", fileUri);

      // 既存ファイルの確認
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        console.log("既存ファイルを削除:", fileUri);
        await FileSystem.deleteAsync(fileUri);
      }

      // ダウンロード進捗を監視するためのカスタムダウンロード
      const downloadResumable = FileSystem.createDownloadResumable(
        message.imageUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            (downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite) *
            100;
          setDownloadProgress(progress);
          console.log(`画像ダウンロード進捗: ${progress.toFixed(1)}%`);
        }
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult && downloadResult.status === 200) {
        setDownloadProgress(100);
        console.log("画像ダウンロード完了:", downloadResult.uri);

        // ファイルの存在確認
        const downloadedFileInfo = await FileSystem.getInfoAsync(
          downloadResult.uri
        );
        if (!downloadedFileInfo.exists) {
          throw new Error("ダウンロードした画像が見つかりません");
        }

        // 画像を共有
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadResult.uri, {
            mimeType: "image/jpeg",
            dialogTitle: "画像を共有",
          });
        } else {
          Alert.alert(
            "ダウンロード完了",
            `画像がダウンロードされました\n保存先: ${downloadResult.uri}`
          );
        }
      } else {
        throw new Error(
          `画像ダウンロードに失敗しました: ${downloadResult?.status}`
        );
      }
    } catch (error) {
      console.error("画像ダウンロードエラー:", error);
      Alert.alert(
        "ダウンロードエラー",
        `画像のダウンロードに失敗しました\n${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
      setShowProgressModal(false);
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
              uri:
                talk.sourceCar?.images.front ||
                talk.sourceStockCar?.images.front,
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
          <View style={styles.imageWrapper}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImagePress}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: message.imageUrl }}
                style={styles.messageImage}
                contentFit="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.downloadButton,
                { backgroundColor: colors.primary },
                isDownloading && { opacity: 0.7 },
              ]}
              onPress={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Text style={[styles.downloadingText, { color: colors.white }]}>
                  {Math.round(downloadProgress)}%
                </Text>
              ) : (
                <Download size={16} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
              marginTop: 8,
            }}
          >
            {message.read && isMe && <Check size={12} color={colors.primary} />}
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(message.createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>

      {/* 画像拡大表示モーダル */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeImageModal}
          >
            <X size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalImageContainer}
            onPress={closeImageModal}
            activeOpacity={1}
          >
            <Image
              source={{ uri: message.imageUrl }}
              style={styles.modalImage}
              contentFit="contain"
            />
          </TouchableOpacity>
          {/* モーダル内のダウンロードボタン */}
          <TouchableOpacity
            style={[
              styles.modalDownloadButton,
              { backgroundColor: colors.primary },
              isDownloading && { opacity: 0.7 },
            ]}
            onPress={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Text style={[styles.modalDownloadText, { color: colors.white }]}>
                {Math.round(downloadProgress)}%
              </Text>
            ) : (
              <Download size={20} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </Modal>

      <DownloadProgressModal
        visible={showProgressModal}
        downloadProgress={downloadProgress}
        fileName={message.fileName || "ファイル"}
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
    maxWidth: "70%",
    padding: 8,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  imageWrapper: {
    position: "relative",
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  downloadButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  downloadingText: {
    fontSize: 10,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
  modalDownloadButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalDownloadText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ImageMessageItem;
