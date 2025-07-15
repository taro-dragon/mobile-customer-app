import { z } from "zod";

export const answerCarCheckRequestSchema = z
  .object({
    // 動的な日付フィールド（第一希望日時、第二希望日時など）
    preferredDates: z
      .array(
        z.object({
          date: z.date({
            required_error: "日付は必須です",
            invalid_type_error: "有効な日付を入力してください",
          }),
          time: z.string().min(1, "時間は必須です"),
          priority: z.number().min(1, "優先順位は必須です"),
        })
      )
      .min(1, "少なくとも1つの希望日時を入力してください"),

    // 位置情報
    location: z.object({
      lat: z.number().min(-90).max(90, "有効な緯度を入力してください"),
      lng: z.number().min(-180).max(180, "有効な経度を入力してください"),
      address: z.string().optional(),
    }),

    // その他の情報
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      // 日付の優先順位が重複していないかチェック
      const priorities = data.preferredDates.map((d) => d.priority);
      const uniquePriorities = new Set(priorities);
      return uniquePriorities.size === priorities.length;
    },
    {
      message: "日付の優先順位が重複しています",
      path: ["preferredDates"],
    }
  );

// Types
export type AnswerCarCheckRequestFormData = z.infer<
  typeof answerCarCheckRequestSchema
>;
