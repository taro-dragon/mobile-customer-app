import { z } from "zod";

export const registrationBulkAppraisalBidSchema = z
  .object({
    minBid: z.number().min(1, "最低入札額は必須です"),
    maxBid: z.number().min(1, "最高入札額は必須です"),
    comment: z.string().min(1, "加盟店コメントは必須です"),
    managerStaffs: z.array(z.string()).min(1, "担当者は必須です"),
  })
  .refine((data) => data.maxBid > data.minBid, {
    message: "最高入札額は最低入札額より大きい必要があります",
    path: ["maxBid"],
  });

// Types
export type RegistrationBulkAppraisalBidFormData = z.infer<
  typeof registrationBulkAppraisalBidSchema
>;
