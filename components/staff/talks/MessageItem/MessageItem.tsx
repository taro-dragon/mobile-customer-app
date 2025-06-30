import React from "react";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { useStore } from "@/hooks/useStore";
import TalkTextContent from "./TalkTextContent";
import CurrentCarCheckRequestItem from "./CurrentCarCheckRequestItem";
import AppraisalPriceItem from "./AppraisalPriceItem";
import FileMessageItem from "./FileMessageItem";

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
