import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import ColorItem from "./ColorItem";
import { useTheme } from "@/contexts/ThemeContext";

const ColorSelect = () => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: colors.textPrimary,
          ...typography.heading3,
          paddingHorizontal: 16,
        }}
      >
        車体色
        <Text style={{ color: colors.error }}>*</Text>
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      >
        <ColorItem color="white" label="ホワイト系" bgColor="#FFFFFF" />
        <ColorItem color="black" label="ブラック系" bgColor="#000000" />
        <ColorItem color="silver" label="シルバー系" bgColor="#C0C0C0" />
        <ColorItem color="red" label="レッド系" bgColor="#FF0000" />
        <ColorItem color="orange" label="オレンジ系" bgColor="#FFA500" />
        <ColorItem color="green" label="グリーン系" bgColor="#008000" />
        <ColorItem color="blue" label="ブルー系" bgColor="#0000FF" />
        <ColorItem color="brown" label="ブラウン系" bgColor="#8B4513" />
        <ColorItem color="yellow" label="イエロー系" bgColor="#FFFF00" />
        <ColorItem color="pink" label="ピンク系" bgColor="#FFC0CB" />
        <ColorItem color="purple" label="パープル系" bgColor="#800080" />
        <ColorItem color="gold" label="ゴールド系" bgColor="#FFD700" />
        <ColorItem color="gray" label="グレー系" bgColor="#808080" />
        <ColorItem color="perl" label="パール系" bgColor="#F5F5F5" />
        <ColorItem
          color="other"
          label="その他"
          bgColor={colors.backgroundPrimary}
        />
      </ScrollView>
    </View>
  );
};

export default ColorSelect;
