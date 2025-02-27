import { BulkAppraisalRequest } from "../firestore_schema/bulkAppraisalRequests";

export type BulkAppraisalSlice = {
  bulkAppraisalRequests: BulkAppraisalRequest[];
  loading: boolean;
  error: string | null;
  unsubscribe: (() => void) | undefined;

  // アクション
  fetchBulkAppraisalRequests: (userId: string) => void;
  createBulkAppraisalRequest: (
    carId: string,
    userId: string
  ) => Promise<string | null>;
  clearBulkAppraisalRequests: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};
