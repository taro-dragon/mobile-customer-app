import { Shop } from "./Shop";

export type Client = {
  id: string;
  name: string;
  shops: Shop[];
  antiqueDealerLicenseNumber: string;
  imageUrls?: string[];
};
