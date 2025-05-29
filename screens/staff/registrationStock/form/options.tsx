import { Text, View } from "react-native";
import OptionItem from "@/components/form/optionItem";
import { useTheme } from "@/contexts/ThemeContext";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import { FlashList } from "@shopify/flash-list";
import {
  categoryLabels,
  modalPickers,
  options,
} from "@/constants/stockOptions";

type SectionItem = {
  type: "option" | "modalPicker";
  category?: string;
  data: {
    name: string;
    label: string;
    options?: { label: string; value: string }[];
    required?: boolean;
  };
};

const RegistrationStockOptionsFormScreen = () => {
  const { colors, typography } = useTheme();
  const renderItem = ({ item }: { item: SectionItem }) => {
    if (item.type === "option") {
      if (item.data.name === "header") {
        return (
          <View style={{ paddingTop: 8 }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              {categoryLabels[item.category as keyof typeof categoryLabels]}
            </Text>
          </View>
        );
      }
      return <OptionItem name={item.data.name} label={item.data.label} />;
    }
    return (
      <ModalPicker
        name={item.data.name}
        label={item.data.label}
        options={item.data.options!}
        required={item.data.required!}
      />
    );
  };

  const sections: SectionItem[] = [
    ...modalPickers.map((picker) => ({
      type: "modalPicker" as const,
      data: {
        name: picker.name,
        label: picker.label,
        options: picker.options,
        required: picker.required,
      },
    })),
    ...Object.entries(options).flatMap(([category, items]) => [
      {
        type: "option" as const,
        category,
        data: { name: "header", label: category },
      },
      ...items.map((item) => ({
        type: "option" as const,
        category,
        data: item,
      })),
    ]),
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={sections}
        renderItem={renderItem}
        estimatedItemSize={50}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

export default RegistrationStockOptionsFormScreen;
