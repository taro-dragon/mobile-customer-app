import { useStore } from "@/hooks/useStore";
import { Project } from "@/types/firestore_schema/project";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";
import { ExtendProject } from "./useInProgressProjects";

const PAGE_SIZE = 20;

const fetchCompletedProjects = async (
  storeId: string,
  lastDoc?: any
): Promise<{ data: ExtendProject[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("shops")
      .doc(storeId)
      .collection("projects")
      .where("status", "==", "completed")
      .orderBy("updatedAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const data: ExtendProject[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const projectType = doc.data().projectType;
        const targetId = doc.data().targetId;
        if (projectType === "buy_offer") {
          const targetCarRef = await firestore()
            .collection("cars")
            .doc(targetId)
            .get();
          const targetCarData = targetCarRef.data();
          return {
            id: doc.id,
            ...doc.data(),
            car: targetCarData,
          } as ExtendProject;
        } else if (projectType === "bid") {
          const targetCarRef = await firestore()
            .collection("cars")
            .doc(targetId)
            .get();
          const targetCarData = targetCarRef.data();
          return {
            id: doc.id,
            ...doc.data(),
            car: targetCarData,
          } as ExtendProject;
        } else {
          const targetCarRef = await firestore()
            .collection("stockCars")
            .doc(targetId)
            .get();
          const targetCarData = targetCarRef.data();
          return {
            id: doc.id,
            ...doc.data(),
            car: targetCarData,
          } as ExtendProject;
        }
      })
    );
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    const hasMore = snapshot.docs.length === PAGE_SIZE;
    return {
      data,
      lastDoc: lastDocument,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

const useCompletedProjects = () => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, size, setSize, isValidating, isLoading, mutate } =
    useSWRInfinite(
      (pageIndex: number, previousPageData: any) => {
        if (!storeId) return null;
        const key =
          pageIndex === 0
            ? [`completedProjects-${storeId}`, storeId, null]
            : !previousPageData?.hasMore
            ? null
            : [
                `completedProjects-${storeId}`,
                storeId,
                previousPageData.lastDoc,
              ];
        return key;
      },
      ([_, storeId, lastDoc]: [string, string, any]) =>
        fetchCompletedProjects(storeId, lastDoc),
      {
        revalidateFirstPage: false,
        revalidateAll: false,
        revalidateOnMount: true,
        revalidateOnFocus: false,
      }
    );

  const projects: ExtendProject[] = data
    ? data.flatMap((page) => page.data)
    : [];
  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;

  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    projects,
    error,
    isLoading,
    isValidating,
    hasMore,
    loadMore,
    mutate,
  };
};

export default useCompletedProjects;
