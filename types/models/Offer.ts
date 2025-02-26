export type Offer = {
  clientId: string;
  maker: string;
  model: string;
  year: string;
  gread: string;
  pricing: {
    basePrice: number;
    discountMultipliers: {
      S: number;
      A: number;
      B: number;
      C: number;
    };
  };
  status: "pending" | "accepted" | "rejected";
  description: string;
  createdAt: string;
  updatedAt: string;
};
