import { Client } from "./Client";

export type Shop = {
  id: string;
  clientId: string;
  client?: Client;
  staffInfo?: {
    familyName: string;
    givenName: string;
    familyNameKana: string;
    givenNameKana: string;
    phoneNumber: string;
    email: string;
  };
  shopName: string;
  postalCode: string;
  address1: string;
  address2: string;
  address3: string;
  building?: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  email: string;
  businessHours?: string;
  description?: string;
  shopCatchCopy?: string;
  holiday?: string;
  imageUrls?: string[];
};
