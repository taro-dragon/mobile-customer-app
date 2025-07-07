import React from "react";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useStore } from "@/hooks/useStore";
import TalkTextContent from "./TalkTextContent";
import CurrentCarCheckRequestItem from "./CurrentCarCheckRequestItem";
import AppraisalPriceItem from "./AppraisalPriceItem";
import FileMessageItem from "./FileMessageItem";
import ImageMessageItem from "./ImageMessageItem";
import VideoMessageItem from "./VideoMessageItem";
import LocationItem from "./LocationItem";
import { View, Text } from "react-native";

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

  if (message.type === "system") {
    return (
      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <View
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: "#6b7280", fontSize: 13 }}>{message.text}</Text>
        </View>
      </View>
    );
  }

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
  if (message.type === "appraisalPrice") {
    return (
      <AppraisalPriceItem
        bubbleColor={bubbleColor}
        talk={talk}
        message={message}
        isMe={isMe}
      />
    );
  }
  if (message.type === "file") {
    return (
      <FileMessageItem
        bubbleColor={bubbleColor}
        talk={talk}
        message={message}
        isMe={isMe}
      />
    );
  }
  if (message.type === "image") {
    return (
      <ImageMessageItem
        bubbleColor={bubbleColor}
        talk={talk}
        message={message}
        isMe={isMe}
      />
    );
  }
  if (message.type === "video") {
    return (
      <VideoMessageItem
        bubbleColor={bubbleColor}
        talk={talk}
        message={message}
        isMe={isMe}
      />
    );
  }
  if (message.type === "location") {
    return (
      <LocationItem
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

export default MessageItem;
