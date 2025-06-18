import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import { mileageOptions } from "@/constants/searchOptions";
import { View } from "react-native";

const MileageFilterScreen = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="minMileage"
            label="下限"
            options={mileageOptions}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="maxMileage"
            label="上限"
            options={mileageOptions}
          />
        </View>
      </View>
    </View>
  );
};

export default MileageFilterScreen;
