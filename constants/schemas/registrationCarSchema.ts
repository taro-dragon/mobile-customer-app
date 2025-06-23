import { z } from "zod";

export const registrationCarSchema = z.object({
  maker: z.string(),
  model: z.string(),
  year: z.string(),
  grade: z.string(),
  modelNumber: z.string(),
  front: z.string().min(1, "正面写真は必須です"),
  back: z.string().min(1, "背面写真は必須です"),
  left: z.string().min(1, "左側写真は必須です"),
  right: z.string().min(1, "右側写真は必須です"),
  interior: z.string().min(1, "内装写真は必須です"),
  other1: z.string().optional(),
  other2: z.string().optional(),
  other3: z.string().optional(),
  other4: z.string().optional(),
  other5: z.string().optional(),
  other6: z.string().optional(),
  firstRegistrationYear: z.union([
    z.string().min(1, "初年度登録年を選択してください"),
    z.number().min(1, "初年度登録年を選択してください"),
  ]),
  color: z.string().min(1, "車体色を選択してください"),
  description: z.string().optional(),
});

export type RegistrationCarFormData = z.infer<typeof registrationCarSchema>;
