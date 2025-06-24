import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { StateCreator } from "zustand";
import firestore from "@react-native-firebase/firestore";
import dayjs from "dayjs";
import { BulkAppraisalSlice } from "@/types/slices/BulkAppraisalSlice";
export const createBulkAppraisalSlice: StateCreator<
  BulkAppraisalSlice,
  [],
  [],
  BulkAppraisalSlice
> = (set, get) => ({
  bulkAppraisalRequests: [],
  loading: false,
  error: null,
  unsubscribe: undefined,

  fetchBulkAppraisalRequests: (userId: string) => {
    if (get().unsubscribe) {
      get().unsubscribe!();
    }

    set({ loading: true, error: null });

    const unsubscribe = firestore()
      .collection("bulkAppraisalRequests")
      .where("userId", "==", userId)
      .onSnapshot(
        (snapshot) => {
          set({
            bulkAppraisalRequests: snapshot.docs.map((doc) => {
              const data = doc.data() as BulkAppraisalRequest;
              return {
                ...data,
                id: doc.id,
              };
            }),
            loading: false,
          });
        },
        (error) => {
          console.error("Error fetching bulk appraisal requests:", error);
          set({ error: error.message, loading: false });
        }
      );

    set({ unsubscribe });
    return unsubscribe;
  },

  createBulkAppraisalRequest: async (carId: string, userId: string) => {
    try {
      set({ loading: true, error: null });

      // 既存のリクエストをチェック（同じ車両に対する未完了のリクエストがあれば作成しない）
      const existingRequests = await firestore()
        .collection("bulkAppraisalRequests")
        .where("carId", "==", carId)
        .where("userId", "==", userId)
        .where("status", "==", "in_progress")
        .get();

      if (!existingRequests.empty) {
        set({ loading: false });
        return existingRequests.docs[0].id; // 既存のリクエストIDを返す
      }
      const requestRef = firestore().collection("bulkAppraisalRequests").doc();
      const now = firestore.Timestamp.now();

      // 締切日を翌日の0時に設定
      const deadline = dayjs().add(1, "day").startOf("day").toDate();

      const newRequest: Omit<BulkAppraisalRequest, "id"> = {
        userId,
        carId,
        maker: "",
        model: "",
        year: "",
        grade: "",
        modelNumber: "",
        prefecture: "",
        mileage: 0,
        repairStatus: "",
        sellTime: "",
        status: "in_progress",
        deadline: firestore.Timestamp.fromDate(deadline),
        createdAt: now,
        updatedAt: now,
      };

      await requestRef.set({ id: requestRef.id, ...newRequest });
      set({ loading: false });
      return requestRef.id;
    } catch (error: any) {
      console.error("Error creating bulk appraisal request:", error);
      set({ error: error.message, loading: false });
      return null;
    }
  },

  clearBulkAppraisalRequests: () => {
    if (get().unsubscribe) {
      get().unsubscribe!();
    }
    set({ bulkAppraisalRequests: [], unsubscribe: undefined });
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
});
