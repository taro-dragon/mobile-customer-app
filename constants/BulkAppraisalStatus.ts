export const BulkAppraisalStatus = [
  {
    label: "受付中",
    value: "in_progress",
  },
  {
    label: "査定締切",
    value: "deadline",
  },
  {
    label: "査定完了",
    value: "completed",
  },
];

export type BulkAppraisalStatus = "in_progress" | "deadline" | "completed";

export const BulkAppraisalStatusLabel: Record<BulkAppraisalStatus, string> = {
  in_progress: "受付中",
  deadline: "査定締切",
  completed: "査定完了",
} as const;
