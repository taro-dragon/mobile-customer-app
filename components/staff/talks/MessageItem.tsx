import React from "react";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import dayjs from "dayjs";
import { Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";

type MessageItemProps = {
  message: Message;
  talk: TalkWithUser;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, talk }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const isUser = message.senderType === "user";
  const userBubbleColor = !isUser
    ? {
        backgroundColor: colors.backgroundInfo,
        borderColor: colors.borderInfo,
      }
    : {
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.borderPrimary,
      };
  return (
    <View
      style={[
        styles.messageContainer,
        !isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {isUser && (
        <TouchableOpacity
          onPress={() => router.push(`/bulkAppraisalCars/${talk.carId}`)}
        >
          <Image
            source={{
              uri:
                talk.sourceCar?.images.front ||
                talk.sourceStockCar?.images.front,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.messageBubble,
          !isUser ? styles.userBubble : styles.otherBubble,
          {
            backgroundColor: userBubbleColor.backgroundColor,
            borderColor: userBubbleColor.borderColor,
            borderWidth: 1,
          },
        ]}
      >
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
          {message.read && !isUser && (
            <Check size={12} color={colors.primary} />
          )}
          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
            {dayjs(message.createdAt.toDate()).format("HH:mm")}
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
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

export default MessageItem;
