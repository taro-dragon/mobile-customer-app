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
  setCustomer: (customer: Customer) => set({ customer }),
  editCustomer: (updatedCustomer: Customer) =>
    set((state) => ({
      customer: { ...state.customer, ...updatedCustomer },
    })),
  deleteCustomer: () => set({ customer: undefined }),
  setClient: (client: Client) => set({ client }),
  editClient: (updatedClient: Client) =>
    set((state) => ({
      client: { ...state.client, ...updatedClient },
    })),
  deleteClient: () => set({ client: undefined }),
  setIsAuthLoading: (isAuthLoading: boolean) =>
    set(() => ({
      isAuthLoading: isAuthLoading,
    })),
});
