import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { View } from "react-native";
import CarOfferItem from "../CarDetail/CarOfferItem";

const OfferSection = () => {
  const { offers } = useCarOfferContext();
  return (
    <View>
      {offers.slice(0, 3).map((offer) => (
        <CarOfferItem key={offer.id} offer={offer} />
      ))}
    </View>
  );
};

export default OfferSection;
