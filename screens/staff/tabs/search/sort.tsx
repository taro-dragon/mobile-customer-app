import { sortOptions } from "@/constants/searchOptions";
import { useTheme } from "@/contexts/ThemeContext";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

const SortScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <FlashList
        data={sortOptions}
        renderItem={({ item }) => <Text>{item.label}</Text>}
      />
    </View>
  );
};

export default SortScreen;
