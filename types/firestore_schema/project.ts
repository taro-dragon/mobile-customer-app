export type Project = {
  id: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
  status: "in_progress" | "completed";
  targetId: string;
  maker: string;
  model: string;
  year: string;
  grade: string;
  modelNumber: string;
  type: "buy_offer" | "bids" | "car_inquiry";
  shopId: string;
  targetCarId: string;
  managerStaffs: string[];
};
