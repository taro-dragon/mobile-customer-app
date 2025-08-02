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

      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
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
            style={styles.fileContainer}
            onPress={handleDownload}
            disabled={isDownloading}
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
                {(fileSize / 1024 / 1024).toFixed(1)} MB`
              </Text>
            </View>
            <Download size={16} color={colors.textSecondary} />
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
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
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
