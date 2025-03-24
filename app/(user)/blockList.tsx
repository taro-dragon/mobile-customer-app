import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import { useFetchBlockList } from "@/hooks/useFetchBlockList";
import { useTheme } from "@/contexts/ThemeContext";
import { Store, X } from "lucide-react-native";
import Divider from "@/components/common/Divider";
import { useStore } from "@/hooks/useStore";

const BlockList = () => {
  const { blockList, isLoading, mutate } = useFetchBlockList();
  const { colors, typography } = useTheme();
  const { user } = useStore();

  // ブロック解除とUIの更新
  const removeBlock = useCallback(
    async (shopId: string) => {
      if (!user) return;
      Alert.alert("ブロック解除", "ブロックを解除しますか？", [
        { text: "キャンセル", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await firestore()
                .collection("users")
                .doc(user.id)
                .update({
                  blockIdList: firestore.FieldValue.arrayRemove(shopId),
                });
            } catch (error) {
              console.error("Error removing shop from block list:", error);
            }
          },
        },
      ]);
    },
    [user, mutate]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={blockList || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: 16,
              }}
            >
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{ ...typography.heading3, color: colors.textPrimary }}
                >
                  {item.shopName}
                </Text>
                <Text
                  style={{ ...typography.body3, color: colors.textSecondary }}
                >
                  {item.address1} {item.address2} {item.address3}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeBlock(item.id)}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={
          !blockList || blockList.length === 0
            ? { flex: 1 }
            : { paddingBottom: 20 }
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Store size={32} color={colors.textSecondary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              ブロックしている店舗がありません
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default BlockList;
