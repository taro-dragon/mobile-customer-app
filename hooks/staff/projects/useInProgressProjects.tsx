import { useStore } from "@/hooks/useStore";
import { Project } from "@/types/firestore_schema/project";
import { Car } from "@/types/models/Car";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;
export type ExtendProject = Project & {
  car: Car;
};

const fetchInProgressProjects = async (
  storeId: string,
  lastDoc?: any
): Promise<{ data: Project[]; lastDoc: any; hasMore: boolean }> => {
  console.log("storeId", storeId);
  try {
    let query = firestore()
      .collection("shops")
      .doc(storeId)
      .collection("projects")
      .where("status", "==", "in_progress")
      .orderBy("updatedAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();

    const data: Project[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const projectType = doc.data().projectType;
        const targetId = doc.data().targetId;

        return {
          id: doc.id,
          ...doc.data(),
        } as Project;
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

const useInProgressProjects = () => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, size, setSize, isValidating, isLoading, mutate } =
    useSWRInfinite(
      (pageIndex: number, previousPageData: any) => {
        if (!storeId) return null;
        const key =
          pageIndex === 0
            ? [`inProgressProjects-${storeId}`, storeId, null]
            : !previousPageData?.hasMore
            ? null
            : [
                `inProgressProjects-${storeId}`,
                storeId,
                previousPageData.lastDoc,
              ];
        return key;
      },
      ([_, storeId, lastDoc]: [string, string, any]) =>
        fetchInProgressProjects(storeId, lastDoc),
      {
        revalidateOnMount: true,
        revalidateOnFocus: false,
      }
    );

  const projects: Project[] = data ? data.flatMap((page) => page.data) : [];
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

export default useInProgressProjects;
