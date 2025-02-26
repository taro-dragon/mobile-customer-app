import { Shop } from "./Shop";

export type Client = {
  id: string;
  name: string;
  shops: Shop[];
  antiqueDealerLicenseNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  address3: string;
  imageUrls?: string[];
};
