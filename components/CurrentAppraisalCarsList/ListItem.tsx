import { Car } from "@/types/models/Car";
import { View } from "react-native";

type ListItemProps = {
  car: Car;
};

const ListItem: React.FC<ListItemProps> = ({ car }) => {
  return <View></View>;
};

export default ListItem;
