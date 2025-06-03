import Loader from "@/components/common/Loader";
import { useStockCarsContext } from "@/contexts/staff/CarSearchContext";
import SearchScreen from "@/screens/staff/tabs/search";

const Search = () => {
  const { cars, showMore, isLoading } = useStockCarsContext();
  if (isLoading) {
    return <Loader />;
  }
  return <SearchScreen cars={cars} showMore={showMore} />;
};

export default Search;
