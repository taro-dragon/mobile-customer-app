import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Message } from "@/types/firestore_schema/messages";
import dayjs from "dayjs";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useFetchStaffName from "@/hooks/staff/useFetchStaffName";

type SystemMessageItemProps = {
  talk: TalkWithUser;
  message: Message;
  isMe: boolean;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
};

const SystemMessageItem: React.FC<SystemMessageItemProps> = ({
  talk,
  message,
  isMe,
  bubbleColor,
}) => {
  const { colors } = useTheme();
  const { staffName } = useFetchStaffName(message.senderId);

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
      return isMe ? "自分" : staffName;
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
          styles.messageBubble,
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
        <Text style={[styles.messageText, { color: colors.textPrimary }]}>
          {message.text}
        </Text>
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
  messageBubble: {
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
  messageText: {
    fontSize: 15,
  },
  senderName: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

export default SystemMessageItem;
