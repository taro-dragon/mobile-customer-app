import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  color?: string;
};

const SafeAreaBottom: React.FC<Props> = ({ color }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: insets.bottom, backgroundColor: color }} />
  );
};

export default SafeAreaBottom;
