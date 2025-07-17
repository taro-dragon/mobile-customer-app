import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Calendar, CarIcon, Check } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CurrentCarCheckRequestItemProps = {
  talk: TalkWithUser;
  message: Message;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  isMe: boolean;
};
const CurrentCarCheckRequestItem: React.FC<CurrentCarCheckRequestItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const router = useRouter();
  const { colors, typography } = useTheme();

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
        <View
          style={[styles.calendarWrapper, { backgroundColor: colors.primary }]}
        >
          <CarIcon size={36} color={colors.white} />
        </View>
        <View style={styles.messageAreaWrapper}>
          <View style={styles.messageWrapper}>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              現車確認依頼
            </Text>
            <Text style={{ color: colors.textPrimary, ...typography.body3 }}>
              {message.text}
            </Text>
          </View>
          {message.isAnswered ? (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.borderSuccess,
                backgroundColor: colors.backgroundSuccess,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => router.push(`/talks/${talk.id}/carCheckRequest`)}
            >
              <Text
                style={{ color: colors.textSuccess, ...typography.heading3 }}
              >
                確認する
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.gray400,
                backgroundColor: colors.white,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.gray500, ...typography.heading3 }}>
                回答待ち
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {dayjs(message.createdAt.toDate()).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 10,
  },
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
    width: "60%",
    borderRadius: 18,
    overflow: "hidden",
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
  },
  calendarWrapper: {
    padding: 12,
    width: "100%",
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
  },
  messageWrapper: {
    gap: 4,
  },
  messageAreaWrapper: {
    padding: 12,
    gap: 12,
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

export default CurrentCarCheckRequestItem;
