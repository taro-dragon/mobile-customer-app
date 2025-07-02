import React, { useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import {
  Check,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DownloadProgressModal from "@/components/common/Modal/DownloadProgressModal";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const videoRef = useRef<Video>(null);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const handleMuteToggle = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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

      console.log("動画ダウンロード開始:", message.videoUrl);
      console.log("保存先:", fileUri);

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
          console.log(`動画ダウンロード進捗: ${progress.toFixed(1)}%`);
        }
      );

      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult && downloadResult.status === 200) {
        setDownloadProgress(100);
        console.log("動画ダウンロード完了:", downloadResult.uri);

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
      console.error("動画ダウンロードエラー:", error);
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
          <View style={styles.videoWrapper}>
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                source={{ uri: message.videoUrl || "" }}
                style={styles.video}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                shouldPlay={false}
                isMuted={isMuted}
              />

              {/* 動画コントロールオーバーレイ */}
              <View style={styles.videoControls}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPause}
                  activeOpacity={0.8}
                >
                  {isPlaying ? (
                    <Pause size={24} color={colors.white} />
                  ) : (
                    <Play size={24} color={colors.white} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.muteButton}
                  onPress={handleMuteToggle}
                  activeOpacity={0.8}
                >
                  {isMuted ? (
                    <VolumeX size={16} color={colors.white} />
                  ) : (
                    <Volume2 size={16} color={colors.white} />
                  )}
                </TouchableOpacity>
              </View>

              {/* 動画時間表示 */}
              {duration > 0 && (
                <View style={styles.timeOverlay}>
                  <Text style={[styles.timeText, { color: colors.white }]}>
                    {formatTime(position)} / {formatTime(duration)}
                  </Text>
                </View>
              )}
            </View>

            {/* ダウンロードボタン */}
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

          {/* 動画の長さ表示 */}
          {message.videoDuration && (
            <Text
              style={[styles.durationText, { color: colors.textSecondary }]}
            >
              動画の長さ: {formatTime(message.videoDuration * 1000)}
            </Text>
          )}

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
    right: 8,
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
});

export default VideoMessageItem;
