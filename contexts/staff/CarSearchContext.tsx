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
import { useInfiniteHits, useConfigure } from "react-instantsearch-core";
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
  isLastPage: boolean;
};

const StockCarsContext = createContext<StockCarContextType | undefined>(
  undefined
);

export const StockCarsProvider: React.FC<{
  children: React.ReactNode;
  currentSort: SortOption;
  setCurrentSort: (sort: SortOption) => void;
}> = ({ children, currentSort, setCurrentSort }) => {
  const { watch } = useFormContext();

  const formValues = watch();

  const buildAlgoliaFilters = useCallback(() => {
    const filters: string[] = [];

    filters.push("status:published");

    if (formValues.maker) {
      filters.push(`maker:${formValues.maker}`);
    }

    if (formValues.model) {
      filters.push(`model:${formValues.model}`);
    }

    if (formValues.year) {
      filters.push(`year:${formValues.year}`);
    }

    if (formValues.grade) {
      filters.push(`grade:${formValues.grade}`);
    }

    if (formValues.prefecture) {
      filters.push(`prefecture:${formValues.prefecture}`);
    }

    if (formValues.minPrice || formValues.maxPrice) {
      const priceFilter = [];
      if (formValues.minPrice) {
        const priceValue = formValues.isTotalPayment
          ? "totalPayment"
          : "bodyPrice";
        priceFilter.push(`${priceValue} >= ${formValues.minPrice}`);
      }
      if (formValues.maxPrice) {
        const priceValue = formValues.isTotalPayment
          ? "totalPayment"
          : "bodyPrice";
        priceFilter.push(`${priceValue} <= ${formValues.maxPrice}`);
      }
      if (priceFilter.length > 0) {
        filters.push(priceFilter.join(" AND "));
      }
    }

    if (formValues.minMileage || formValues.maxMileage) {
      const mileageFilter = [];
      if (formValues.minMileage) {
        mileageFilter.push(`mileage >= ${formValues.minMileage}`);
      }
      if (formValues.maxMileage) {
        mileageFilter.push(`mileage <= ${formValues.maxMileage}`);
      }
      if (mileageFilter.length > 0) {
        filters.push(mileageFilter.join(" AND "));
      }
    }

    if (formValues.minRegistrationYear || formValues.maxRegistrationYear) {
      const registrationFilter = [];
      if (formValues.minRegistrationYear) {
        registrationFilter.push(
          `firstRegistrationYear >= ${formValues.minRegistrationYear}`
        );
      }
      if (formValues.maxRegistrationYear) {
        registrationFilter.push(
          `firstRegistrationYear <= ${formValues.maxRegistrationYear}`
        );
      }
      if (registrationFilter.length > 0) {
        filters.push(registrationFilter.join(" AND "));
      }
    }

    return filters.join(" AND ");
  }, [formValues]);

  // Algoliaの設定を適用
  useConfigure({
    filters: buildAlgoliaFilters(),
    hitsPerPage: 20,
  });

  const { items, showMore, isLastPage } = useInfiniteHits<StockHit>({
    escapeHTML: false,
  });
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
    [setCurrentSort, handleDismissModalPress]
  );

  const value = {
    cars: items,
    showMore,
    isLastPage,
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
