import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useStore } from "@/hooks/useStore";
import { Project } from "@/types/firestore_schema/project";
import { Car } from "@/types/models/Car";
import { Stock } from "@/types/firestore_schema/stock";
export type ExtendedProject = Project & {
  targetCarData?: Car;
  targetStockCarData?: Stock;
};

const fetchProject = async (id: string, storeId: string) => {
  try {
    const projectSnapshot = await firestore()
      .collection("shops")
      .doc(storeId)
      .collection("projects")
      .doc(id)
      .get();
    const projectData = projectSnapshot.data() as Project;
    if (!projectData) {
      return undefined;
    }
    const targetCarRef =
      projectData.type === "car_inquiry"
        ? firestore().collection("stockCars").doc(projectData.targetCarId)
        : firestore().collection("cars").doc(projectData.targetCarId);
    const targetCarSnapshot = await targetCarRef.get();
    if (projectData.type === "car_inquiry") {
      return {
        ...projectData,
        id: projectSnapshot.id,
        targetStockCarData: targetCarSnapshot.data() as Stock,
      };
    } else {
      return {
        ...projectData,
        id: projectSnapshot.id,
        targetCarData: targetCarSnapshot.data() as Car,
      };
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "案件情報の取得に失敗しました",
    });
    router.back();
    return undefined;
  }
};

const useFetchProject = (id: string) => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, mutate, isLoading } = useSWR(
    id && storeId ? `project-${storeId}-${id}` : null,
    () => (id && storeId ? fetchProject(id, storeId) : null),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    project: data as ExtendedProject | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchProject;
