import FilterListItem from "@/components/filter/FilterListItem";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";

type MakerFilterScreenProps = {
  manufacturers: Manufacture[];
};

const MakerFilterScreen: React.FC<MakerFilterScreenProps> = ({
  manufacturers,
}) => {
  const router = useRouter();
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
          onPressed={() => {
            router.push("/bulkAppraisalBid/filter/model");
          }}
        />
      )}
    />
  );
};

export default MakerFilterScreen;
