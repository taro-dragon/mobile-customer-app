import { useTheme } from "@/contexts/ThemeContext";
import { options, modalPickers } from "@/constants/stockOptions";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { Check } from "lucide-react-native";
import { Stock } from "@/types/firestore_schema/stock";

type OptionTabProps = {
  stock: Stock;
};

const OptionTab: React.FC<OptionTabProps> = ({ stock }) => {
  const { colors, typography } = useTheme();

  const renderOptionItem = (optionName: string, label: string) => {
    const isEnabled = stock[optionName as keyof Stock] === true;
    return (
      <View
        key={optionName}
        style={[
          styles.optionItem,
          { borderColor: isEnabled ? colors.primary : colors.borderPrimary },
        ]}
      >
        <Text
          style={[
            typography.body2,
            {
              color: isEnabled ? colors.primary : colors.textSecondary,
              fontWeight: isEnabled ? "bold" : "normal",
            },
          ]}
        >
          {label}
        </Text>
        {isEnabled && <Check size={16} color={colors.primary} />}
      </View>
    );
  };

  const renderModalPickerItem = (pickerName: string, label: string) => {
    const value = stock[pickerName as keyof Stock] as string;
    const hasValue =
      value && value !== "なし" && value !== "" && value !== "none";

    // 対応するpickerオプションを見つけて、valueに対応するlabelを取得
    const pickerOptions =
      modalPickers.find((picker) => picker.name === pickerName)?.options || [];
    const selectedOption = pickerOptions.find(
      (option) => option.value === value
    );
    const displayLabel = selectedOption?.label || "なし";

    return (
      <View
        key={pickerName}
        style={[
          styles.optionItem,
          { borderColor: hasValue ? colors.primary : colors.borderPrimary },
        ]}
      >
        <Text
          style={[
            typography.body2,
            {
              color: hasValue ? colors.primary : colors.textSecondary,
            },
          ]}
        >
          {label}: {displayLabel}
        </Text>
      </View>
    );
  };

  const renderCategory = (categoryKey: string) => {
    const categoryOptions = options[categoryKey as keyof typeof options];
    return (
      <View key={categoryKey} style={styles.category}>
        <View style={styles.optionsContainer}>
          {categoryOptions.map((option) =>
            renderOptionItem(option.name, option.label)
          )}
        </View>
      </View>
    );
  };

  return (
    <Tabs.ScrollView style={{ backgroundColor: colors.backgroundPrimary }}>
      <View style={styles.container}>
        {Object.keys(options).map(renderCategory)}

        <View style={styles.category}>
          <Text
            style={[
              typography.heading2,
              { color: colors.textPrimary, marginBottom: 8 },
            ]}
          >
            その他のオプション
          </Text>
          <View style={styles.optionsContainer}>
            {modalPickers.map((picker) =>
              renderModalPickerItem(picker.name, picker.label)
            )}
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  category: {
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default OptionTab;
