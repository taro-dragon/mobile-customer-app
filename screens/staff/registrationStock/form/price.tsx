import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import TextInput from "@/components/registrationCar/form/TextInput";
import {
  industrySalesOptions,
  legalRepairOptions,
} from "@/constants/registrationStockOptions";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";

const RegistrationStockPriceFormScreen = () => {
  const { watch } = useFormContext();
  const legalRepair = watch("legalRepair");
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
    >
      <View style={{ padding: 16, gap: 16 }}>
        <TextInput
          label="車両本体価格"
          name="bodyPrice"
          keyboardType="numeric"
          isRequired
          unit="円"
        />
        <TextInput
          label="支払い総額"
          name="totalPayment"
          keyboardType="numeric"
          isRequired
          unit="円"
        />
        <ModalPicker
          name="legalRepair"
          label="法定整備"
          options={legalRepairOptions}
          required={true}
        />
        {legalRepair === "repaired" && (
          <TextInput
            label="法定整備説明"
            name="legalRepairDescription"
            multiline
          />
        )}
      </View>
    </ScrollView>
  );
};

export default RegistrationStockPriceFormScreen;
