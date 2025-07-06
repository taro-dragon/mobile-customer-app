import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { formatMessageDate } from "@/utils/dateUtils";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type DateSeparatorProps = {
  timestamp: FirebaseFirestoreTypes.Timestamp;
  isOldest?: boolean;
};

const DateSeparator: React.FC<DateSeparatorProps> = ({
  timestamp,
  isOldest = false,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, isOldest && styles.oldestContainer]}>
      <View
        style={[styles.dateContainer, isOldest && styles.oldestDateContainer]}
      >
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          {formatMessageDate(timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  oldestContainer: {
    paddingVertical: 12,
  },
  oldestDateContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  dateText: {
    fontSize: 11,
    fontWeight: "500",
  },
});

export default DateSeparator;
