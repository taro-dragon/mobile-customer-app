import React from "react";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet } from "react-native";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useStore } from "@/hooks/useStore";
import TalkTextContent from "./TalkTextContent";
import CurrentCarCheckRequestItem from "./CurrentCarCheckRequestItem";

type MessageItemProps = {
  message: Message;
  talk: TalkWithUser;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, talk }) => {
  const { colors } = useTheme();
  const { staff } = useStore();

  const isMe = message.senderId === staff?.id;
  const bubbleColor = isMe
    ? {
        backgroundColor: colors.backgroundInfo,
        borderColor: colors.borderInfo,
      }
    : {
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.borderPrimary,
      };
  if (message.type === "currentCarCheckRequested") {
    return (
      <CurrentCarCheckRequestItem
        bubbleColor={bubbleColor}
        talk={talk}
        message={message}
        isMe={isMe}
      />
    );
  }
  return (
    <TalkTextContent
      isMe={isMe}
      bubbleColor={bubbleColor}
      talk={talk}
      message={message}
    />
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
