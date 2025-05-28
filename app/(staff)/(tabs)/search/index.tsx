import Loader from "@/components/common/Loader";
import { useStockCarsContext } from "@/contexts/staff/CarSearchContext";
import SearchScreen from "@/screens/staff/tabs/search";

const Search = () => {
  const { cars, loadMore, isLoading, refresh } = useStockCarsContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <SearchScreen
      cars={cars}
      loadMore={loadMore}
      isLoading={isLoading}
      refresh={refresh}
    />
  );
};

export default Search;
