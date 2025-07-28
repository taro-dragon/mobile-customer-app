import Loader from "@/components/common/Loader";
import { useStockCarsContext } from "@/contexts/staff/CarSearchContext";
import SearchScreen from "@/screens/users/tabs/search";

const Search = () => {
  const { cars, showMore, isLastPage, refresh } = useStockCarsContext();
  if (cars.length === 0) {
    return <Loader />;
  }
  return (
    <SearchScreen
      cars={cars}
      showMore={showMore}
      isLastPage={isLastPage}
      refresh={refresh}
    />
  );
};

export default Search;
