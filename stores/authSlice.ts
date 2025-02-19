import { Client } from "@/types/models/Client";
import { Customer } from "@/types/models/Customer";
import { AuthSlice } from "@/types/slices/AuthSlice";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  customer: undefined,
  client: undefined,
  isAuthLoading: false,
  setCustomer: (customer: Customer) => set((state) => ({ ...state, customer })),
  editCustomer: (updatedCustomer: Customer) =>
    set((state) => ({
      ...state,
      customer: { ...state.customer, ...updatedCustomer },
    })),
  deleteCustomer: () => set((state) => ({ ...state, customer: undefined })),
  setClient: (client: Client) => set((state) => ({ ...state, client })),
  editClient: (updatedClient: Client) =>
    set((state) => ({
      ...state,
      client: { ...state.client, ...updatedClient },
    })),
  deleteClient: () => set((state) => ({ ...state, client: undefined })),
  setIsAuthLoading: (isAuthLoading: boolean) =>
    set((state) => ({
      ...state,
      isAuthLoading: isAuthLoading,
    })),
});
