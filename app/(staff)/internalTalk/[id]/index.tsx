import { useTheme } from "@/contexts/ThemeContext";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import DateSeparatorWrapper from "@/components/common/DateSeparatorWrapper";
import MessageInput from "@/components/staff/internalTalks/MessageInput";
import { InternalMessage } from "@/types/firestore_schema/internalMessage";
import MessageItem from "@/components/staff/internalTalk/MessageItem/MessageItem";
import useInternalTalk from "@/hooks/staff/talks/useInternalTalk";

const InternalTalkDetail = () => {
  const { colors } = useTheme();
  const {
    internalTalk,
    isInternalTalkLoading,
    messages,
    loading,
    sendMessage,
    text,
    setText,
    sending,
    loadMoreMessages,
    loadingMore,
  } = useInternalTalk();
  const flatListRef = useRef<FlatList>(null);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const scrillToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  if (isInternalTalkLoading || loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!internalTalk) {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text>トークが見つかりません</Text>
      </View>
    );
  }

  const handleSendMessage = async () => {
    await sendMessage();
    setTimeout(() => {
      scrillToTop();
    }, 100);
  };

  const renderMessageWithDateSeparator = ({
    item,
    index,
  }: {
    item: InternalMessage;
    index: number;
  }) => {
    return (
      <DateSeparatorWrapper message={item} index={index} messages={messages}>
        <MessageItem message={item} talk={internalTalk} />
      </DateSeparatorWrapper>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageWithDateSeparator}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text
                style={[
                  styles.loadingMoreText,
                  { color: colors.textSecondary },
                ]}
              >
                読み込み中...
              </Text>
            </View>
          ) : null
        }
      />
      <MessageInput
        sendMessage={handleSendMessage}
        sending={sending}
        text={text}
        setText={setText}
        isOpenPanel={isOpenPanel}
        setIsOpenPanel={setIsOpenPanel}
        talk={internalTalk}
        scrillToTop={scrillToTop}
      />
      <SafeAreaBottom color={colors.backgroundPrimary} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    fontSize: 16,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
  },
  messageContainer: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginVertical: 2,
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  otherUserMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F2F2F7",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default InternalTalkDetail;
