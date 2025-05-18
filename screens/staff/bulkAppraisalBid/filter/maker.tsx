import FilterListItem from "@/components/filter/FilterListItem";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { FlashList } from "@shopify/flash-list";

type MakerFilterScreenProps = {
  manufacturers: Manufacture[];
};

const MakerFilterScreen: React.FC<MakerFilterScreenProps> = ({
  manufacturers,
}) => {
  return (
    <FlashList
      data={manufacturers}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.name}
          name="maker"
          value={item.manufacturerId}
        />
      )}
    />
  );
};

export default MakerFilterScreen;
