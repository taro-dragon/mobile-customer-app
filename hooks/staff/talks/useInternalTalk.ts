import { useStore } from "@/hooks/useStore";
import fetchInternalTalk from "@/libs/fetcher/staff/fetchInternalTalk";
import { InternalMessage } from "@/types/firestore_schema/internalMessage";
import { InternalTalk } from "@/types/firestore_schema/talks";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";

const MESSAGES_PER_PAGE = 30;

const useInternalTalk = (): {
  internalTalk: InternalTalk | undefined;
  isInternalTalkLoading: boolean;
  internalTalkError: Error | null;
  messages: InternalMessage[];
  loading: boolean;
  sendMessage: () => Promise<void>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sending: boolean;
  setSending: React.Dispatch<React.SetStateAction<boolean>>;
  loadMoreMessages: () => Promise<void>;
  loadingMore: boolean;
} => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentStore, staff } = useStore();
  const shopId = currentStore?.id;
  const {
    data: internalTalk,
    isLoading: isInternalTalkLoading,
    error: internalTalkError,
  } = useSWR(
    id && shopId ? `internalTalk-${id}` : null,
    id && shopId ? () => fetchInternalTalk(shopId, id) : null
  );
  const [latestMessageTimestamp, setLatestMessageTimestamp] =
    useState<FirebaseFirestoreTypes.Timestamp | null>(null);

  const [messages, setMessages] = useState<InternalMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

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
        })) as InternalMessage[];

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
            } as InternalMessage;

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
      })) as InternalMessage[];

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
      const messageData: Omit<InternalMessage, "id"> = {
        talkId: id,
        senderId: staff.id,
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
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "メッセージの送信に失敗しました",
      });
    } finally {
      setSending(false);
    }
  };
  return {
    internalTalk,
    isInternalTalkLoading,
    internalTalkError,
    messages,
    loading,
    sendMessage,
    text,
    setText,
    sending,
    setSending,
    loadMoreMessages,
    loadingMore,
  };
};

export default useInternalTalk;
