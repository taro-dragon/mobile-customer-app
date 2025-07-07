import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Check, Download } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import { useVideoPlayer, VideoView } from "expo-video";
import useFetchStaffName from "@/hooks/staff/useFetchStaffName";

type VideoMessageItemProps = {
  talk: TalkWithUser;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};

const VideoMessageItem: React.FC<VideoMessageItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const { colors } = useTheme();
  const { staffName } = useFetchStaffName(message.senderId);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);

  // expo-videoの新しいAPIを使用
  const player = useVideoPlayer(message.videoUrl || "");

  const handleDownload = async () => {
    if (!message.videoUrl) {
      Alert.alert("エラー", "動画URLが存在しません");
      return;
    }

    if (isDownloading) return; // 重複ダウンロードを防ぐ

    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setShowProgressModal(true);

      const timestamp = Date.now();
      const fileName = `video_${timestamp}.mp4`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // 既存ファイルの確認
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        console.log("既存ファイルを削除:", fileUri);
        await FileSystem.deleteAsync(fileUri);
      }

      // ダウンロード進捗を監視するためのカスタムダウンロード
      const downloadResumable = FileSystem.createDownloadResumable(
        message.videoUrl,
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
          throw new Error("ダウンロードした動画が見つかりません");
        }

        // 動画を共有
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadResult.uri, {
            mimeType: "video/mp4",
            dialogTitle: "動画を共有",
          });
        } else {
          Alert.alert(
            "ダウンロード完了",
            `動画がダウンロードされました\n保存先: ${downloadResult.uri}`
          );
        }
      } else {
        throw new Error(
          `動画ダウンロードに失敗しました: ${downloadResult?.status}`
        );
      }
    } catch (error) {
      Alert.alert(
        "ダウンロードエラー",
        `動画のダウンロードに失敗しました\n${
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
          {message.senderType === "staff" && !isMe && (
            <Text style={[styles.staffName, { color: colors.textSecondary }]}>
              {staffName}
            </Text>
          )}
          <View style={styles.videoWrapper}>
            <TouchableOpacity style={styles.videoContainer} activeOpacity={0.8}>
              <VideoView
                player={player}
                style={styles.video}
                allowsFullscreen
                allowsPictureInPicture={false}
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
      <DownloadProgressModal
        visible={showProgressModal}
        downloadProgress={downloadProgress}
        fileName={message.fileName || "動画ファイル"}
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
  videoWrapper: {
    position: "relative",
  },
  videoContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: 250,
    height: 180,
    borderRadius: 12,
  },
  videoControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  muteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  timeOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
  durationText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  staffName: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
});

export default VideoMessageItem;
