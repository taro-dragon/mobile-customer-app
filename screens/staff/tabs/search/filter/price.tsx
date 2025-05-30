import OptionItem from "@/components/form/optionItem";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";

import { priceOptions } from "@/constants/searchOptions";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

const PriceFilterScreen = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="minPrice"
            label="下限"
            options={priceOptions}
            required={true}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="maxPrice"
            label="上限"
            options={priceOptions}
            required={true}
          />
        </View>
      </View>
      <OptionItem name="isTotalPayment" label="支払総額を対象にする" />
    </View>
  );
};

export default PriceFilterScreen;
