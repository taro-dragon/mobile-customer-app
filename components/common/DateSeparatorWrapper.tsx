import React from "react";
import { View } from "react-native";
import { Message } from "@/types/firestore_schema/messages";
import { isSameDate } from "@/utils/dateUtils";
import DateSeparator from "@/components/staff/talks/MessageItem/DateSeparator";
import { InternalMessage } from "@/types/firestore_schema/internalMessage";

type DateSeparatorWrapperProps = {
  message: Message | InternalMessage;
  index: number;
  messages: Message[] | InternalMessage[];
  children: React.ReactNode;
};

const DateSeparatorWrapper: React.FC<DateSeparatorWrapperProps> = ({
  message,
  index,
  messages,
  children,
}) => {
  // inverted FlatListなので、最新のメッセージがindex 0になる
  const showDateSeparator = (() => {
    if (index === messages.length - 1) return true; // 一番古いメッセージ（画面の一番上）

    const currentMessage = message;
    const nextMessage = messages[index + 1];

    return !isSameDate(currentMessage.createdAt, nextMessage.createdAt);
  })();

  return (
    <View>
      {showDateSeparator && <DateSeparator timestamp={message.createdAt} />}
      {children}
    </View>
  );
};

export default DateSeparatorWrapper;
