import TalkItem from "@/components/talks/TalkItem";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { MessageSquare } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";

const Talk = () => {
  const { talks } = useStore();
  const { colors, typography } = useTheme();
  console.log(talks);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={talks}
        renderItem={({ item }) => <TalkItem talk={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            <MessageSquare
              size={48}
              color={colors.iconSecondary}
              strokeWidth={1.5}
            />
            <Text
              style={{ color: colors.textSecondary, ...typography.heading2 }}
            >
              トークがありません
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Talk;
