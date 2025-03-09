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
import { TalkSlice } from "@/types/slices/TalkSlice";

export const useStore = create<
  AuthSlice & CarSlice & AppSlice & BulkAppraisalSlice & TalkSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCarSlice(...a),
  ...createAppSlice(...a),
  ...createBulkAppraisalSlice(...a),
  ...createTalkSlice(...a),
}));
