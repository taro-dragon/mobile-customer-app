import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Car } from "@/types/models/Car";
import { Text, View } from "react-native";

type Props = {
  offer: BuyOffer;
};

const OffersListItem: React.FC<Props> = ({ offer }) => {
  const { typography, colors } = useTheme();
  const carData = transformCarData(offer as unknown as Car);
  return (
    <View>
      <Text>{carData.model.name}</Text>
    </View>
  );
};

export default OffersListItem;
