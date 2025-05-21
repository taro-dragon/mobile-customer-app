import { BulkAppraisalStatus } from "@/constants/BulkAppraisalStatus";

export type Offer = {
  clientId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  pricing: {
    basePrice: number;
    discountMultipliers: {
      S: number;
      A: number;
      B: number;
      C: number;
    };
  };
  status: BulkAppraisalStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
};
