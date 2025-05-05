import { create } from "zustand";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { createAuthSlice } from "@/stores/authSlice";
import { createCarSlice } from "@/stores/carSlice";
import { CarSlice } from "@/types/slices/CarSlice";
import { AppSlice } from "@/types/slices/AppSlice";
import { createAppSlice } from "@/stores/appSlice";
import { createBulkAppraisalSlice } from "@/stores/bulkAppraisalSlice";
import { BulkAppraisalSlice } from "@/types/slices/BulkAppraisalSlice";
import { createTalkSlice } from "@/stores/talkSlice";
import { StaffTalkSlice, TalkSlice } from "@/types/slices/TalkSlice";
import { createStoreSlice } from "@/stores/staff/storeSlice";
import { StoreSlice } from "@/types/slices/staff/storeSlice";
import { createCurrentStoreSlice } from "@/stores/staff/currentStoreSlice";
import { CurrentStoreSlice } from "@/types/slices/staff/currentStoreSlice";
import { createStaffTalkSlice } from "@/stores/staff/talkSlice";
export const useStore = create<
  AuthSlice &
    CarSlice &
    AppSlice &
    BulkAppraisalSlice &
    TalkSlice &
    StoreSlice &
    CurrentStoreSlice &
    StaffTalkSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCarSlice(...a),
  ...createAppSlice(...a),
  ...createBulkAppraisalSlice(...a),
  ...createTalkSlice(...a),
  ...createStoreSlice(...a),
  ...createCurrentStoreSlice(...a),
  ...createStaffTalkSlice(...a),
}));
