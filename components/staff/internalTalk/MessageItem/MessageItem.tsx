import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { InternalMessage } from "@/types/firestore_schema/internalMessage";
import { InternalTalk } from "@/types/firestore_schema/talks";
import { Text, View } from "react-native";
import FileMessageItem from "@/components/talks/talk/FileMessageItem";
import ImageMessageItem from "@/components/talks/talk/ImageMessageItem";
import VideoMessageItem from "@/components/talks/talk/VideoMessageItem";
import LocationItem from "@/components/talks/talk/LocationItem";
import TalkTextContent from "@/components/talks/talk/TalkTextContent";

type MessageItemProps = {
  message: InternalMessage;
  talk: InternalTalk;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, talk }) => {
  const { colors } = useTheme();
  const { staff, currentStoreStaffs } = useStore();

  const isMe = message.senderId === staff?.id;

  // 自分、他のスタッフ、ユーザーの3色に分ける
  const bubbleColor = isMe
    ? {
        backgroundColor: colors.backgroundInfo,
        borderColor: colors.borderInfo,
      }
    : {
        backgroundColor: colors.backgroundPrimary,
        borderColor: colors.borderPrimary,
      };

  const senderStaff =
    currentStoreStaffs.find((staff) => staff.id === message.senderId) || null;

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

  if (message.type === "file") {
    return (
      <FileMessageItem
        bubbleColor={bubbleColor}
        senderName={senderStaff?.name || ""}
        avatarUrl={senderStaff?.profileImageUrl}
        readCount={message.readBy?.length || 0}
        createdAt={message.createdAt}
        fileUrl={message.fileUrl || ""}
        fileName={message.fileName || "ファイル"}
        fileSize={message.fileSize || 0}
        isMe={isMe}
      />
    );
  }
  if (message.type === "image") {
    return (
      <ImageMessageItem
        bubbleColor={bubbleColor}
        senderName={senderStaff?.name || ""}
        avatarUrl={senderStaff?.profileImageUrl}
        readCount={message.readBy?.length || 0}
        createdAt={message.createdAt}
        imageUrl={message.imageUrl || ""}
        isMe={isMe}
      />
    );
  }
  if (message.type === "video") {
    return (
      <VideoMessageItem
        bubbleColor={bubbleColor}
        senderName={senderStaff?.name || ""}
        avatarUrl={senderStaff?.profileImageUrl}
        readCount={message.readBy?.length || 0}
        createdAt={message.createdAt}
        videoUrl={message.videoUrl || ""}
        fileName={message.fileName || "動画ファイル"}
        isMe={isMe}
      />
    );
  }
  if (message.type === "location") {
    return (
      <LocationItem
        bubbleColor={bubbleColor}
        senderName={senderStaff?.name || ""}
        avatarUrl={senderStaff?.profileImageUrl}
        readCount={message.readBy?.length || 0}
        createdAt={message.createdAt}
        location={
          message.location || {
            latitude: 0,
            longitude: 0,
            address: "",
          }
        }
        isMe={isMe}
      />
    );
  }
  return (
    <TalkTextContent
      isMe={isMe}
      bubbleColor={bubbleColor}
      senderName={senderStaff?.name || ""}
      messageText={message.text}
      avatarUrl={senderStaff?.profileImageUrl}
      readCount={message.readBy?.length || 0}
      createdAt={message.createdAt}
    />
  );
};

export default MessageItem;
