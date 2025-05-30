import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import createRegistrationYear from "@/libs/createRegistrationYear";
import { View } from "react-native";

const RegistrationYearFilterScreen = () => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="minRegistrationYear"
            label="下限"
            options={createRegistrationYear()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ModalPicker
            name="maxRegistrationYear"
            label="上限"
            options={createRegistrationYear()}
          />
        </View>
      </View>
    </View>
  );
};

export default RegistrationYearFilterScreen;
