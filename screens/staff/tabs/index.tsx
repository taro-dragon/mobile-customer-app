import { Text, TouchableOpacity, View } from "react-native";
import { useLogout } from "@/hooks/staff/useLogout";

const StaffIndexScreen = () => {
  const { logout } = useLogout();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StaffIndexScreen;
