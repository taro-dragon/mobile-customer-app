import Loader from "@/components/common/Loader";
import { useStockCarsContext } from "@/contexts/staff/CarSearchContext";
import SearchScreen from "@/screens/staff/tabs/search";
import { useInstantSearch } from "react-instantsearch-core";

const Search = () => {
  const { cars, showMore, isLastPage, refresh } = useStockCarsContext();
  const { status } = useInstantSearch();
  if (cars.length === 0 && (status === "loading" || status === "stalled")) {
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
