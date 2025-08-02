import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { InternalMessage } from "@/types/firestore_schema/internalMessage";
import { Message } from "@/types/firestore_schema/messages";
import { InternalTalk } from "@/types/firestore_schema/talks";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { Check } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TalkTextContentProps = {
  isMe: boolean;
  bubbleColor: {
    backgroundColor: string;
    borderColor: string;
  };
  senderName: string;
  messageText: string;
  avatarUrl?: string;
  readCount: number;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
const TalkTextContent: React.FC<TalkTextContentProps> = ({
  isMe,
  bubbleColor,
  senderName,
  messageText,
  avatarUrl,
  readCount,
  createdAt,
}) => {
  const { colors } = useTheme();

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
            uri: avatarUrl,
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
            {senderName}
          </Text>
        )}
        <Text style={[styles.messageText, { color: colors.textPrimary }]}>
          {messageText}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          {readCount > 0 && isMe && (
            <Check size={12} color={colors.textSuccess} />
          )}
          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
            {dayjs(createdAt.toDate()).format("HH:mm")}
          </Text>
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

export default TalkTextContent;
