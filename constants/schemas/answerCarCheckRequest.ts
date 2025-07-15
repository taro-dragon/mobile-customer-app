import { z } from "zod";

export const answerCarCheckRequestSchema = z
  .object({
    // 動的な日時フィールド（第一希望日時、第二希望日時など）
    preferredDates: z
      .array(
        z.object({
          datetime: z.date({
            required_error: "希望日時は必須です",
            invalid_type_error: "有効な日時を入力してください",
          }),
          priority: z.number().min(1, "優先順位は必須です"),
        })
      )
      .min(1, "少なくとも1つの希望日時を入力してください"),

    // 位置情報
    location: z.object({
      lat: z.number().min(-90).max(90, "有効な緯度を入力してください"),
      lng: z.number().min(-180).max(180, "有効な経度を入力してください"),
      address: z.string().min(1, "位置情報は必須です"),
    }),

    // その他の情報
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      // 日時の優先順位が重複していないかチェック
      const priorities = data.preferredDates.map((d) => d.priority);
      const uniquePriorities = new Set(priorities);
      return uniquePriorities.size === priorities.length;
    },
    {
      message: "日時の優先順位が重複しています",
      path: ["preferredDates"],
    }
  );

// Types
export type AnswerCarCheckRequestFormData = z.infer<
  typeof answerCarCheckRequestSchema
>;
