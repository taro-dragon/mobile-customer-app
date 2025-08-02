import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Message } from "@/types/firestore_schema/messages";
import { useStore } from "@/hooks/useStore";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Toast from "react-native-toast-message";
import DateSeparatorWrapper from "@/components/common/DateSeparatorWrapper";
import MessageInput from "@/components/staff/internalTalks/MessageInput";

const MESSAGES_PER_PAGE = 30;

const InternalTalkDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, typography } = useTheme();
  const { staff, currentStore, internalTalks } = useStore();
  const talk = internalTalks.find((talk) => talk.id === id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 最新のメッセージのタイムスタンプを追跡
  const [latestMessageTimestamp, setLatestMessageTimestamp] =
    useState<FirebaseFirestoreTypes.Timestamp | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadInitialMessages = async () => {
      try {
        setLoading(true);

        // 最新のメッセージを取得
        const messagesRef = firestore()
          .collection("shops")
          .doc(currentStore?.id || "")
          .collection("talks")
          .doc(id)
          .collection("messages")
          .orderBy("createdAt", "desc")
          .limit(MESSAGES_PER_PAGE);

        const snapshot = await messagesRef.get();
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        setMessages(messagesData);

        // 最新メッセージのタイムスタンプを保存
        if (messagesData.length > 0) {
          setLatestMessageTimestamp(messagesData[0].createdAt);
        }

        // さらに古いメッセージがあるかチェック
        if (snapshot.docs.length < MESSAGES_PER_PAGE) {
          setHasMoreMessages(false);
        }
      } catch (error) {
        console.error("Error loading initial messages:", error);
        Toast.show({
          type: "error",
          text1: "メッセージの読み込みに失敗しました",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessages();
  }, [id, currentStore?.id]);

  useEffect(() => {
    if (!id || !currentStore?.id) return;

    const unsubscribe = firestore()
      .collection("shops")
      .doc(currentStore.id)
      .collection("talks")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot(
        (snapshot) => {
          if (!snapshot.empty) {
            const latestMessage = snapshot.docs[0];
            const messageData = {
              id: latestMessage.id,
              ...latestMessage.data(),
            } as Message;

            // 新しいメッセージが追加された場合のみ更新
            if (
              !latestMessageTimestamp ||
              messageData.createdAt.toMillis() >
                latestMessageTimestamp.toMillis()
            ) {
              setMessages((prevMessages) => {
                // 既存のメッセージをチェック
                const exists = prevMessages.some(
                  (msg) => msg.id === messageData.id
                );
                if (!exists) {
                  return [messageData, ...prevMessages];
                }
                return prevMessages;
              });
              setLatestMessageTimestamp(messageData.createdAt);
            }
          }
        },
        (error) => {
          console.error("Error listening to messages:", error);
        }
      );

    return () => unsubscribe();
  }, [id, currentStore?.id, latestMessageTimestamp]);

  const loadMoreMessages = async () => {
    if (
      !id ||
      loadingMore ||
      !hasMoreMessages ||
      messages.length === 0 ||
      !currentStore?.id
    )
      return;
    try {
      setLoadingMore(true);

      const oldestMessage = messages[messages.length - 1];
      const messagesRef = firestore()
        .collection("shops")
        .doc(currentStore.id)
        .collection("talks")
        .doc(id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .startAfter(oldestMessage.createdAt)
        .limit(MESSAGES_PER_PAGE);

      const snapshot = await messagesRef.get();
      const olderMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      if (olderMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...olderMessages]);
      }

      // さらに古いメッセージがない場合はフラグを更新
      if (snapshot.docs.length < MESSAGES_PER_PAGE) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
      Toast.show({
        type: "error",
        text1: "メッセージの読み込みに失敗しました",
      });
    } finally {
      setLoadingMore(false);
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || !staff || !id || !currentStore?.id) return;

    setSending(true);
    try {
      const messageData: Omit<Message, "id"> = {
        talkId: id,
        senderId: staff.id,
        senderType: "staff",
        senderName: staff.name,
        text: text.trim(),
        readBy: [staff.id],
        createdAt: firestore.Timestamp.now(),
        type: "text",
      };

      await firestore().runTransaction(async (transaction) => {
        const talkRef = firestore()
          .collection("shops")
          .doc(currentStore.id)
          .collection("talks")
          .doc(id);
        const messageRef = talkRef.collection("messages").doc();

        transaction.set(messageRef, messageData);
        transaction.update(talkRef, {
          lastMessage: text.trim(),
          updatedAt: firestore.Timestamp.now(),
        });
      });
      setText("");

      // メッセージ送信後に最新までスクロール
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
      Toast.show({
        type: "error",
        text1: "メッセージの送信に失敗しました",
      });
    } finally {
      setSending(false);
    }
  };

  const renderMessageWithDateSeparator = ({
    item,
    index,
  }: {
    item: Message;
    index: number;
  }) => {
    const isCurrentUser = item.senderId === staff?.id;
    return (
      <DateSeparatorWrapper message={item} index={index} messages={messages}>
        <View
          style={[
            styles.messageContainer,
            isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              {
                color: isCurrentUser
                  ? colors.backgroundPrimary
                  : colors.textPrimary,
              },
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              {
                color: isCurrentUser
                  ? colors.backgroundPrimary
                  : colors.textSecondary,
              },
            ]}
          >
            {new Date(item.createdAt.toMillis()).toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </DateSeparatorWrapper>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!talk) {
    return (
      <View style={styles.container}>
        <Text>トークが見つかりません</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Messages List */}
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
        sendMessage={sendMessage}
        sending={sending}
        text={text}
        setText={setText}
        isOpenPanel={isOpenPanel}
        setIsOpenPanel={setIsOpenPanel}
        talk={talk}
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
