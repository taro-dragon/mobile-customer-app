import { z } from "zod";

// Main schema that includes all fields from all tabs
export const registrationStockSchema = z.object({
  // Basic info fields
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
  color: z.string(),
  description: z.string(),
});

// Simplified schema for draft saving (no required fields validation)
export const registrationStockDraftSchema = z.object({}).catchall(z.any());

// Types
export type RegistrationStockFormData = z.infer<typeof registrationStockSchema>;
