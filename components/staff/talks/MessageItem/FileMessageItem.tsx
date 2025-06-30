import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { File, Download, Check } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDownload = async () => {
    if (!message.fileUrl || !message.fileName) return;

    try {
      const fileName = message.fileName;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // ファイルをダウンロード
      const downloadResult = await FileSystem.downloadAsync(
        message.fileUrl,
        fileUri
      );

      if (downloadResult.status === 200) {
        // ファイルを共有
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert("ダウンロード完了", "ファイルがダウンロードされました");
        }
      } else {
        Alert.alert("エラー", "ファイルのダウンロードに失敗しました");
      }
    } catch (error) {
      console.error("ファイルダウンロードエラー:", error);
      Alert.alert("エラー", "ファイルのダウンロードに失敗しました");
    }
  };

  return (
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
              talk.sourceCar?.images.front || talk.sourceStockCar?.images.front,
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
          style={styles.fileContainer}
          onPress={handleDownload}
          activeOpacity={0.7}
        >
          <View style={styles.fileIconContainer}>
            <File size={24} color={colors.primary} />
          </View>
          <View style={styles.fileInfo}>
            <Text
              style={[
                styles.fileName,
                { color: colors.textPrimary },
                typography.body2,
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
          <Download size={20} color={colors.primary} />
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
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  fileInfo: {
    flex: 1,
    gap: 2,
  },
  fileName: {
    fontWeight: "500",
  },
  fileSize: {
    fontSize: 12,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
});

export default FileMessageItem;
