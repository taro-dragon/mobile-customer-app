import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const formatMessageDate = (
  timestamp: FirebaseFirestoreTypes.Timestamp
): string => {
  const date = timestamp.toDate();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (messageDate.getTime() === today.getTime()) {
    return "今日";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "昨日";
  } else {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

export const isSameDate = (
  timestamp1: FirebaseFirestoreTypes.Timestamp,
  timestamp2: FirebaseFirestoreTypes.Timestamp
): boolean => {
  const date1 = timestamp1.toDate();
  const date2 = timestamp2.toDate();

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
