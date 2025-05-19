import FilterListItem from "@/components/filter/FilterListItem";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

type MakerFilterScreenProps = {
  manufacturers: Manufacture[];
};

const MakerFilterScreen: React.FC<MakerFilterScreenProps> = ({
  manufacturers,
}) => {
  const router = useRouter();
  const { resetField } = useFormContext();
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
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="maker"
          value={undefined}
          onPressed={() => {
            resetField("maker");
            resetField("model");
            resetField("year");
            resetField("grade");
            router.dismissAll();
          }}
        />
      }
    />
  );
};

export default MakerFilterScreen;
