import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import { useStore } from "@/hooks/useStore";
import BuyIndexScreen from "@/screens/users/tabs/buy";
import { useRouter } from "expo-router";
import { Car, CarIcon, List, User } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomerIndex = () => {
  const router = useRouter();
  const guard = useRegistrationGuard();
  const { cars } = useStore();
  return <BuyIndexScreen />;
};

export default CustomerIndex;
