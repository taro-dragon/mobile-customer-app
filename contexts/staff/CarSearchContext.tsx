import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
import firestore from "@react-native-firebase/firestore";
import { Shop } from "@/types/models/Shop";
import { Stock } from "@/types/firestore_schema/stock";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SortModal from "@/components/staff/search/SortModal";

export type ExtendedCar = Stock & {
  shop: Shop;
};

export type SortOption = {
  target: string;
  value: "asc" | "desc";
};

type StockCarContextType = {
  cars: ExtendedCar[];
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  hasMore: boolean;
  currentSort: SortOption;
  handlePresentModalPress: () => void;
  handleDismissModalPress: () => void;
  handleSortChange: (sortOption: SortOption) => void;
  loadMore: () => void;
  refresh: () => Promise<any>;
};

const StockCarsContext = createContext<StockCarContextType | undefined>(
  undefined
);

const LIMIT = 10;

const getKey = (
  pageIndex: number,
  previousPageData: any,
  filters: any,
  sort: SortOption
) => {
  if (previousPageData && !previousPageData.requests.length) return null;
  return [pageIndex, filters, sort];
};

const fetchStockCars = async ([pageIndex, filters, sort]: [
  number,
  any,
  SortOption
]) => {
  let query = firestore()
    .collection("stockCars")
    .orderBy(sort.target, sort.value)
    .limit(LIMIT);

  // Apply filters from form values
  if (filters.status) {
    query = query.where("status", "==", filters.status);
  }
  if (filters.maker) {
    query = query.where("maker", "==", filters.maker);
  }
  if (filters.model) {
    query = query.where("model", "==", filters.model);
  }
  if (filters.year) {
    query = query.where("year", "==", filters.year);
  }
  if (filters.grade) {
    query = query.where("grade", "==", filters.grade);
    query = query.where("modelNumber", "==", filters.modelNumber);
  }
  if (filters.prefecture) {
    query = query.where("prefecture", "==", filters.prefecture);
  }
  if (filters.sellTime) {
    query = query.where("sellTime", "==", filters.sellTime);
  }
  if (filters.highPrice) {
    query = query.where("totalPayment", ">=", filters.highPrice);
  }
  if (filters.lowPrice) {
    query = query.where("totalPayment", "<=", filters.lowPrice);
  }
  if (filters.repairStatus) {
    query = query.where("repairStatus", "==", filters.repairStatus);
  }
  if (filters.color) {
    query = query.where("color", "==", filters.color);
  }

  if (pageIndex > 0) {
    const lastDoc = await firestore()
      .collection("stockCars")
      .orderBy(sort.target, sort.value)
      .limit(LIMIT * pageIndex)
      .get();
    const lastVisible = lastDoc.docs[lastDoc.docs.length - 1];
    query = query.startAfter(lastVisible);
  }

  const snapshot = await query.get();
  const requests = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const stockCarData = doc.data();
      const shopData = await firestore()
        .collection("shops")
        .doc(stockCarData.storeId)
        .get();
      return {
        ...stockCarData,
        id: doc.id,
        shop: shopData.data(),
      } as ExtendedCar;
    })
  );

  return {
    requests,
    nextCursor: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const StockCarsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getValues } = useFormContext();
  const [currentSort, setCurrentSort] = useState<SortOption>({
    target: "createdAt",
    value: "desc",
  });

  const filters = getValues();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSortChange = useCallback(
    (sortOption: SortOption) => {
      setCurrentSort(sortOption);
      handleDismissModalPress();
    },
    [handleDismissModalPress]
  );

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, filters, currentSort),
      fetchStockCars,
      {
        revalidateFirstPage: true,
        revalidateAll: false,
        persistSize: true,
      }
    );

  const cars = data
    ? data.reduce(
        (acc, page) => [...acc, ...page.requests],
        [] as ExtendedCar[]
      )
    : [];

  const hasMore = data
    ? data[data.length - 1].requests.length === LIMIT
    : false;

  const loadMore = () => {
    if (!hasMore || isLoading || isValidating) return;
    setSize(size + 1);
  };

  const refresh = () => {
    return mutate();
  };

  const value = {
    cars,
    isLoading,
    error,
    isError: !!error,
    hasMore,
    currentSort,
    loadMore,
    refresh,
    handlePresentModalPress,
    handleDismissModalPress,
    handleSortChange,
  };

  return (
    <>
      <StockCarsContext.Provider value={value}>
        {children}
      </StockCarsContext.Provider>
      <SortModal
        handleDismissModalPress={handleDismissModalPress}
        handleSortChange={handleSortChange}
        currentSort={currentSort}
        bottomSheetModalRef={bottomSheetModalRef}
      />
    </>
  );
};

export const useStockCarsContext = () => {
  const context = useContext(StockCarsContext);
  if (context === undefined) {
    throw new Error(
      "useBulkAppraisalContext must be used within a BulkAppraisalProvider"
    );
  }
  return context;
};
