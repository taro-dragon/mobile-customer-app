export type Offer = {
  clientId: string;
  vehicle: {
    maker: string;
    model: string;
    year: number;
    gread: string;
  };
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
