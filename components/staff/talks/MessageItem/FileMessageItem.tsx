import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import {
  File,
  Download,
  Check,
  X,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  FileSpreadsheet,
  Presentation,
  Archive,
  FileCode,
  FileAudio,
  FileVideo,
  FileImage,
} from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import useGetFileIcon from "@/hooks/useGetFileIcon";

type FileMessageItemProps = {
  talk: TalkWithUser;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};

const FileMessageItem: React.FC<FileMessageItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const { colors, typography } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { FileIcon, fileIconColor } = useGetFileIcon(message.fileName || "");

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDownload = async () => {
    if (!message.fileUrl || !message.fileName) {
      Alert.alert("エラー", "ファイル情報が不完全です");
      return;
    }

    if (isDownloading) return; // 重複ダウンロードを防ぐ

    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setShowProgressModal(true);

      const fileUri = `${FileSystem.documentDirectory}${message.fileName}`;

      // 既存ファイルの確認
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        console.log("既存ファイルを削除:", fileUri);
        await FileSystem.deleteAsync(fileUri);
      }

      // ダウンロード進捗を監視するためのカスタムダウンロード
      const downloadResumable = FileSystem.createDownloadResumable(
        message.fileUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            (downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite) *
            100;
          setDownloadProgress(progress);
        }
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult && downloadResult.status === 200) {
        setDownloadProgress(100);

        // ファイルの存在確認
        const downloadedFileInfo = await FileSystem.getInfoAsync(
          downloadResult.uri
        );
        if (!downloadedFileInfo.exists) {
          throw new Error("ダウンロードしたファイルが見つかりません");
        }

        // ファイルを共有
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadResult.uri, {
            mimeType: "application/octet-stream",
            dialogTitle: `ファイルを共有: ${message.fileName}`,
          });
        } else {
          Alert.alert(
            "ダウンロード完了",
            `ファイルがダウンロードされました\n保存先: ${downloadResult.uri}`
          );
        }
      } else {
        throw new Error(
          `ダウンロードに失敗しました: ${downloadResult?.status}`
        );
      }
    } catch (error) {
      Alert.alert(
        "ダウンロードエラー",
        `ファイルのダウンロードに失敗しました\n${
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
          <TouchableOpacity
            style={[styles.fileContainer, isDownloading && { opacity: 0.7 }]}
            onPress={handleDownload}
            activeOpacity={0.7}
            disabled={isDownloading}
          >
            <View
              style={[
                styles.fileIconContainer,
                { backgroundColor: `${fileIconColor}20` },
              ]}
            >
              <FileIcon size={24} color={fileIconColor} />
            </View>
            <View style={styles.fileInfo}>
              <Text
                style={[
                  styles.fileName,
                  { color: colors.textPrimary },
                  typography.title5,
                ]}
                numberOfLines={2}
              >
                {message.fileName}
              </Text>
              {message.fileSize && (
                <Text
                  style={[
                    styles.fileSize,
                    { color: colors.textSecondary },
                    typography.body4,
                  ]}
                >
                  {formatFileSize(message.fileSize)}
                </Text>
              )}
            </View>
            {isDownloading ? (
              <View style={styles.downloadingContainer}>
                <Text
                  style={[styles.downloadingText, { color: colors.primary }]}
                >
                  {Math.round(downloadProgress)}%
                </Text>
              </View>
            ) : (
              <Download size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
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

      {/* ダウンロード進捗モーダル */}
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
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 40,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  fileInfo: {},
  fileName: {
    marginBottom: 2,
    flex: 1,
    maxWidth: 120,
  },
  fileSize: {
    fontSize: 12,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  downloadingContainer: {
    width: 40,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  downloadingText: {
    fontSize: 10,
    fontWeight: "500",
  },
});

export default FileMessageItem;
