export const BidStatus = [
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

export type BidStatus = "in_progress" | "deadline" | "completed";

export const BidStatusLabel: Record<BidStatus, string> = {
  in_progress: "受付中",
  deadline: "査定締切",
  completed: "査定完了",
} as const;
