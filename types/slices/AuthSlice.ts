import { Client } from "../models/Client";
import { Customer } from "../models/Customer";

export type AuthSlice = {
  customer?: Customer;
  client?: Client;
  isAuthLoading: boolean;
  setCustomer: (customer: Customer) => void;
  editCustomer: (customer: Customer) => void;
  deleteCustomer: () => void;
  setClient: (client: Client) => void;
  editClient: (client: Client) => void;
  deleteClient: () => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
};
