import { useTheme } from "@/contexts/ThemeContext";
import { Controller, useFormContext } from "react-hook-form";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Check } from "lucide-react-native";

type OptionType = {
  label: string;
  value: string;
};

type SectionType = {
  title: string;
  options: OptionType[];
};

type CheckBoxProps = {
  name: string;
  label: string;
  options?: OptionType[];
  sections?: SectionType[];
  multiple?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  options,
  sections,
  multiple = true,
}) => {
  const { colors, typography } = useTheme();
  const { control } = useFormContext();

  const screenWidth = Dimensions.get("window").width;

  const availableWidth = screenWidth - 32; // 左右のパディングを16pxずつ引く

  const itemWidth = (availableWidth - 16) / 3; // 16pxは2つの間隔(8px * 2)

  const styles = StyleSheet.create({
    optionsContainer: {
      marginTop: 4,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      gap: 8,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      width: itemWidth,
      marginBottom: 8,
    },
    optionText: {
      ...typography.body1,
      textAlign: "center",
    },
    sectionContainer: {
      marginBottom: 16,
    },
    sectionTitle: {
      ...typography.body1,
      fontWeight: "600",
      color: colors.textSecondary,
      marginBottom: 8,
      marginTop: 8,
    },
  });

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const currentValues = Array.isArray(value)
            ? value
            : value
            ? [value]
            : [];

          const toggleOption = (optionValue: string) => {
            try {
              if (multiple) {
                if (currentValues.includes(optionValue)) {
                  onChange(currentValues.filter((val) => val !== optionValue));
                } else {
                  onChange([...currentValues, optionValue]);
                }
              } else {
                if (currentValues.includes(optionValue)) {
                  onChange(null);
                } else {
                  onChange(optionValue);
                }
              }
            } catch (error) {
              console.error("Error in toggleOption:", error);
            }
          };

          // オプションを表示する関数
          const renderOptions = (optionsList: OptionType[]) => (
            <View style={styles.optionsContainer}>
              {optionsList.map((option) => {
                const isSelected = currentValues.includes(option.value);
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionRow,
                      {
                        borderColor: isSelected
                          ? colors.primary
                          : colors.borderPrimary,
                        backgroundColor: "transparent",
                      },
                    ]}
                    onPress={() => toggleOption(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: isSelected
                            ? colors.primary
                            : colors.textPrimary,
                          fontWeight: isSelected ? "bold" : "normal",
                        },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {option.label}
                    </Text>
                    <Check
                      size={16}
                      color={isSelected ? colors.primary : "transparent"}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );

          return (
            <View>
              {options && renderOptions(options)}

              {sections &&
                sections.map((section, index) => (
                  <View
                    key={`section-${index}`}
                    style={styles.sectionContainer}
                  >
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {renderOptions(section.options)}
                  </View>
                ))}
            </View>
          );
        }}
      />
    </View>
  );
};

export default CheckBox;
