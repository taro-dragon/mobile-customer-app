import { z } from "zod";

export const registrationBuyOfferSchema = z
  .object({
    minPrice: z.number().min(1, "最低買取金額は必須です"),
    maxPrice: z.number().min(1, "最高買取金額は必須です"),
    description: z.string().optional(),
    maxContact: z.enum(["limited", "unlimited"]),
    maxContactCount: z.number().optional(),
    expiresAt: z
      .date()
      .min(new Date(), "有効期限は今日以降の日付でなければなりません"),
    managerStaffs: z.array(z.string()).min(1, "担当者は必須です"),
    grade: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    maker: z.string().optional(),
  })
  .refine((data) => data.maxPrice > data.minPrice, {
    message: "最高買取金額は最低買取金額より大きい必要があります",
    path: ["maxPrice"],
  })
  .refine(
    (data) => {
      if (data.maxContact === "limited") {
        return data.maxContactCount !== undefined && data.maxContactCount > 0;
      }
      return true;
    },
    {
      message: "問い合わせ上限回数を指定してください",
      path: ["maxContactCount"],
    }
  );

// Types
export type RegistrationBuyOfferFormData = z.infer<
  typeof registrationBuyOfferSchema
>;
