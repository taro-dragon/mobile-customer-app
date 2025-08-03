import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Download, Check } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import useGetFileIcon from "@/hooks/useGetFileIcon";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

type FileMessageItemProps = {
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
  senderName: string;
  avatarUrl?: string;
  readCount: number;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  fileUrl: string;
  fileName: string;
  fileSize: number;
};

const FileMessageItem: React.FC<FileMessageItemProps> = ({
  isMe,
  bubbleColor,
  senderName,
  avatarUrl,
  readCount,
  createdAt,
  fileUrl,
  fileName,
  fileSize,
}) => {
  const { colors, typography } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { FileIcon, fileIconColor } = useGetFileIcon(fileName || "");

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDownload = async () => {
    if (!fileUrl) return;

    setIsDownloading(true);
    setShowProgressModal(true);
    setDownloadProgress(0);

    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // 既存のファイルがある場合は削除
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(fileUri);
        }
      } catch (error) {
        console.log("既存ファイルの削除に失敗:", error);
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileUri,
        {},
        (downloadProgress) => {
          // プログレス計算の改善
          if (downloadProgress.totalBytesExpectedToWrite > 0) {
            const progress =
              downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite;

            // プログレスを0-100の範囲に制限し、小数点以下を適切に処理
            const clampedProgress = Math.min(Math.max(progress, 0), 1);
            const percentageProgress = Math.round(clampedProgress * 100);

            setDownloadProgress(percentageProgress);
          } else {
            // totalBytesExpectedToWriteが0の場合は、書き込みバイト数から推定
            const estimatedProgress = Math.min(
              downloadProgress.totalBytesWritten / (fileSize || 1),
              0.95 // 95%まで表示し、完了時に100%にする
            );
            const percentageProgress = Math.round(estimatedProgress * 100);
            setDownloadProgress(percentageProgress);
          }
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (result && result.uri) {
        setDownloadProgress(100);

        await Sharing.shareAsync(result.uri);
        setTimeout(() => {
          setIsDownloading(false);
          setShowProgressModal(false);
          setDownloadProgress(0);
        }, 100);
      } else {
        throw new Error("ダウンロードが完了しませんでした");
      }
    } catch (error) {
      console.error("Download failed:", error);
      Toast.show({
        type: "error",
        text1: "ダウンロードに失敗しました",
        text2: "ネットワーク接続を確認してください",
      });
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
          {!isMe && (
            <Text style={[styles.senderName, { color: colors.textSecondary }]}>
              {senderName}
            </Text>
          )}

          <View style={styles.fileContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                flex: 1,
              }}
            >
              <View style={styles.fileIconContainer}>
                <FileIcon size={24} color={fileIconColor} />
              </View>
              <View style={styles.fileInfo}>
                <Text
                  style={[
                    styles.fileName,
                    { color: colors.textPrimary },
                    typography.body1,
                  ]}
                  numberOfLines={2}
                >
                  {fileName}
                </Text>
                <Text
                  style={[
                    styles.fileSize,
                    { color: colors.textSecondary },
                    typography.body4,
                  ]}
                >
                  {formatFileSize(fileSize)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleDownload}
                disabled={isDownloading}
                style={{
                  padding: 8,
                  borderRadius: 100,
                  backgroundColor: colors.backgroundSecondary,
                }}
              >
                <Download size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

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
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>

      <DownloadProgressModal
        visible={showProgressModal}
        downloadProgress={downloadProgress}
        fileName={fileName || "ファイル"}
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
    maxWidth: "60%",
    flex: 1,
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
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
    flex: 1,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontWeight: "500",
    marginBottom: 2,
  },
  fileSize: {
    opacity: 0.7,
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

export default FileMessageItem;
