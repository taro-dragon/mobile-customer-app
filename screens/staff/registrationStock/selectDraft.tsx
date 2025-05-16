import { useRef } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@/contexts/ThemeContext";
import { FileText, Trash2 } from "lucide-react-native";
import { StockDraft } from "@/hooks/staff/useFetchStockDrafts";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useRouter } from "expo-router";
import Divider from "@/components/common/Divider";
import { useFormContext } from "react-hook-form";
import { useStore } from "@/hooks/useStore";
import firestore from "@react-native-firebase/firestore";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import { KeyedMutator } from "swr";
import { useHeaderHeight } from "@react-navigation/elements";

type SelectDraftScreenProps = {
  StockDraft: StockDraft[];
  mutate: KeyedMutator<StockDraft[]>;
};

const SwipeableItem = ({
  onPress,
  onDelete,
  children,
}: {
  onPress: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}) => {
  const { colors } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = () => {
    return (
      <RectButton
        style={{
          backgroundColor: colors.error,
          justifyContent: "center",
          alignItems: "center",
          width: 80,
        }}
        onPress={() => {
          swipeableRef.current?.close();
          onDelete();
        }}
      >
        <Trash2 color={colors.white} size={24} />
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: 12,
          gap: 4,
          paddingVertical: 8,
          backgroundColor: colors.backgroundPrimary,
        }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Swipeable>
  );
};

const SelectDraftScreen: React.FC<SelectDraftScreenProps> = ({
  StockDraft,
  mutate,
}) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { reset } = useFormContext();
  const { currentStore } = useStore();
  const headerHeight = useHeaderHeight();

  const handleItemPress = (item: StockDraft) => {
    reset(item);
    router.push("/registrationStock/form");
  };

  const handleDelete = async (item: StockDraft) => {
    if (!item.id || !currentStore?.id) return;

    Alert.alert("下書きを削除", "この下書きを削除してもよろしいですか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "削除",
        style: "destructive",
        onPress: async () => {
          try {
            await firestore()
              .collection("shops")
              .doc(currentStore.id)
              .collection("stockDrafts")
              .doc(item.id)
              .delete();

            // リストを更新
            mutate();
          } catch (error) {
            console.error("Failed to delete draft:", error);
            Alert.alert("エラー", "削除に失敗しました");
          }
        },
      },
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlashList
        data={StockDraft}
        renderItem={({ item, index }) => {
          const car = transformCarData(item as unknown as Car);
          return (
            <SwipeableItem
              onPress={() => handleItemPress(item)}
              onDelete={() => handleDelete(item)}
            >
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Text
                  style={{ color: colors.textPrimary, ...typography.body2 }}
                >
                  {car.maker.name}
                </Text>
                <Text
                  style={{
                    color: colors.textPrimary,
                    ...typography.heading3,
                  }}
                >
                  {car.model.name}
                </Text>
              </View>
              <Text
                style={{ color: colors.textSecondary, ...typography.body3 }}
              >
                {car.year.year}
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                {car.grade.gradeName}
              </Text>
            </SwipeableItem>
          );
        }}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <View
            style={{
              height: Dimensions.get("window").height - headerHeight,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
              }}
            >
              <FileText
                size={48}
                color={colors.iconSecondary}
                strokeWidth={1.5}
              />
              <Text
                style={{ color: colors.textSecondary, ...typography.body2 }}
              >
                下書きがありません
              </Text>
            </View>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default SelectDraftScreen;
