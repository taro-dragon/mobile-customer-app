import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { createContext, useContext } from "react";
import { useFormContext } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
import firestore from "@react-native-firebase/firestore";

type BulkAppraisalContextType = {
  requests: BulkAppraisalRequest[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => Promise<any>;
};

const BulkAppraisalContext = createContext<
  BulkAppraisalContextType | undefined
>(undefined);

const LIMIT = 10;

const getKey = (pageIndex: number, previousPageData: any, filters: any) => {
  if (previousPageData && !previousPageData.requests.length) return null;
  return [pageIndex, filters];
};

const fetchBulkAppraisalRequests = async ([pageIndex, filters]: [
  number,
  any
]) => {
  let query = firestore()
    .collection("bulkAppraisalRequests")
    .orderBy("createdAt", "desc")
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

  if (pageIndex > 0) {
    const lastDoc = await firestore()
      .collection("bulkAppraisalRequests")
      .orderBy("createdAt", "desc")
      .limit(LIMIT * pageIndex)
      .get();
    const lastVisible = lastDoc.docs[lastDoc.docs.length - 1];
    query = query.startAfter(lastVisible);
  }

  const snapshot = await query.get();
  const requests = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as BulkAppraisalRequest[];

  return {
    requests,
    nextCursor: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const BulkAppraisalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getValues } = useFormContext();
  const filters = getValues();

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, filters),
      fetchBulkAppraisalRequests,
      {
        revalidateFirstPage: true,
        revalidateAll: false,
        persistSize: true,
      }
    );

  const requests = data
    ? data.reduce(
        (acc, page) => [...acc, ...page.requests],
        [] as BulkAppraisalRequest[]
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
  console.log(error);

  const value = {
    requests,
    isLoading,
    isError: !!error,
    hasMore,
    loadMore,
    refresh,
  };

  return (
    <BulkAppraisalContext.Provider value={value}>
      {children}
    </BulkAppraisalContext.Provider>
  );
};

export const useBulkAppraisalContext = () => {
  const context = useContext(BulkAppraisalContext);
  if (context === undefined) {
    throw new Error(
      "useBulkAppraisalContext must be used within a BulkAppraisalProvider"
    );
  }
  return context;
};
