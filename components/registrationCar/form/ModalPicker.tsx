import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/contexts/ThemeContext";
import { useFormContext, useController } from "react-hook-form";
import { X } from "lucide-react-native";

type PickerOption = {
  label: string;
  value: string | number;
};

type ModalPickerProps = {
  name: string;
  label: string;
  options: PickerOption[];
  required?: boolean;
};

const ModalPicker: React.FC<ModalPickerProps> = ({
  name,
  label,
  options,
  required = false,
}) => {
  const { colors, typography } = useTheme();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const currentError = errors[name];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  // react-hook-formのコントローラーを使用
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  // フォームの値が変更されたときに選択値を更新
  useEffect(() => {
    setSelectedValue(field.value);
  }, [field.value]);

  // 選択を確定する関数
  const confirmSelection = () => {
    if (selectedValue === undefined) {
      return;
    }
    setValue(name, selectedValue);
    setModalVisible(false);
  };

  // 選択をキャンセルする関数
  const cancelSelection = () => {
    setSelectedValue(watch(name));
    setModalVisible(false);
  };

  // 選択されている値のラベルを取得
  const getSelectedLabel = () => {
    if (!selectedValue) return null;
    const option = options.find((item) => item.value === selectedValue);
    return option ? option.label : null;
  };

  return (
    <View>
      <Text
        style={{
          color: colors.textPrimary,
          ...typography.heading3,
          marginBottom: 8,
        }}
      >
        {label} {required && <Text style={{ color: colors.primary }}>*</Text>}
      </Text>
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: currentError ? colors.error : "transparent",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: colors.textPrimary }}>
          {getSelectedLabel() || "選択してください"}
        </Text>
      </TouchableOpacity>
      {currentError && (
        <Text
          style={{ color: colors.error, ...typography.body2, marginTop: 4 }}
        >
          {currentError?.message as string}
        </Text>
      )}

      {/* モーダルピッカー */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.backgroundPrimary,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingTop: 16,
            }}
          >
            {/* モーダルヘッダー */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 8,
                position: "relative",
              }}
            >
              <TouchableOpacity onPress={cancelSelection}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textPrimary,
                }}
              >
                {label}
              </Text>
              <TouchableOpacity
                onPress={confirmSelection}
                disabled={selectedValue === ""}
              >
                <Text style={{ color: colors.primary }}>完了</Text>
              </TouchableOpacity>
            </View>

            {/* ピッカー */}
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={{
                backgroundColor: colors.backgroundPrimary,
                height: 200,
              }}
            >
              <Picker.Item label="---" enabled={false} value={undefined} />
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  color={colors.textPrimary}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPicker;
