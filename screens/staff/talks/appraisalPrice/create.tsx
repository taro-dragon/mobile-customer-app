import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/registrationCar/form/TextInput";
import CreateAppraisalPriceHeader from "@/components/staff/talks/appraisalPrice/create/CreateAppraisalPriceheader";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { ScrollView, View } from "react-native";

type CreateAppraisalPriceScreenProps = {
  talk: TalkWithUser;
};

const CreateAppraisalPriceScreen: React.FC<CreateAppraisalPriceScreenProps> = ({
  talk,
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <CreateAppraisalPriceHeader talk={talk} />
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        <TextInput
          label="査定金額"
          name="appraisalPrice"
          placeholder="査定金額提示"
          keyboardType="numeric"
        />
        <TextInput
          label="査定金額に関する備考"
          name="appraisalPriceNote"
          placeholder="査定金額に関する備考"
          multiline
        />
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button label="送信" color={colors.primary} onPress={() => {}} />
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default CreateAppraisalPriceScreen;
