import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";

import { Shop } from "@/types/models/Shop";
import { Stock } from "@/types/firestore_schema/stock";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useInfiniteHits, useInstantSearch } from "react-instantsearch-core";
import SortModal from "@/components/staff/search/SortModal";
import type { Hit as AlgoliaHit } from "instantsearch.js";

export type ExtendedCar = Stock & {
  shop: Shop;
};

export type StockHit = AlgoliaHit<Stock>;

export type SortOption = {
  target: string;
  value: "asc" | "desc";
};

type StockCarContextType = {
  cars: StockHit[];
  currentSort: SortOption;
  handlePresentModalPress: () => void;
  handleDismissModalPress: () => void;
  handleSortChange: (sortOption: SortOption) => void;
  showMore: () => void;
  isLoading: boolean;
};

const StockCarsContext = createContext<StockCarContextType | undefined>(
  undefined
);

export const StockCarsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getValues } = useFormContext();

  const { status } = useInstantSearch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const { items, showMore } = useInfiniteHits<StockHit>({
    escapeHTML: false,
  });

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

  const value = {
    cars: items,
    isLoading,
    showMore,
    currentSort,
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
