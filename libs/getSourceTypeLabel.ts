export const getSourceTypeLabel = (
  sourceType: string
): {
  label: string;
  color: "info" | "success" | "warning" | "error" | "primary";
} => {
  switch (sourceType) {
    case "bids":
      return { label: "一括査定", color: "info" };
    case "buy_offer":
      return { label: "買取オファー", color: "success" };
    case "car_inquiry":
      return { label: "問い合わせ", color: "primary" };
    default:
      return { label: "不明", color: "error" };
  }
};
