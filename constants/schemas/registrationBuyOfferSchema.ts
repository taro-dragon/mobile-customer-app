import { z } from "zod";

export const registrationBuyOfferSchema = z
  .object({
    minPrice: z.number().min(1, "最低買取金額は必須です"),
    maxPrice: z.number().min(1, "最高買取金額は必須です"),
    comment: z.string(),
  })
  .refine((data) => data.maxPrice > data.minPrice, {
    message: "最高買取金額は最低買取金額より大きい必要があります",
    path: ["maxPrice"],
  });

// Types
export type RegistrationBuyOfferFormData = z.infer<
  typeof registrationBuyOfferSchema
>;
