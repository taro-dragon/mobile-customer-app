import React, { createContext, useContext, ReactNode } from "react";
import { Car } from "@/types/models/Car";
import useCarBids, { ExtendedBid } from "@/hooks/useFetchCarBids";
import { useStore } from "@/hooks/useStore";
import { Staff } from "@/types/firestore_schema/staff";
import useFetchStaffList from "@/hooks/staff/useFetchStafflist";
import { KeyedMutator } from "swr";

type StaffListContextType = {
  staffList: Staff[] | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<Staff[] | undefined>;
};

const StaffListContext = createContext<StaffListContextType | undefined>(
  undefined
);

export const useStaffListContext = () => {
  const context = useContext(StaffListContext);
  if (context === undefined) {
    throw new Error(
      "useStaffListContext must be used within a StaffListProvider"
    );
  }
  return context;
};

type StaffListProviderProps = {
  children: ReactNode;
};

export const StaffListProvider: React.FC<StaffListProviderProps> = ({
  children,
}) => {
  const { currentStore } = useStore();
  const { staffList, isLoading, isError, mutate } = useFetchStaffList(
    currentStore?.id || ""
  );

  const value = {
    staffList,
    isLoading,
    isError,
    mutate,
  };

  return (
    <StaffListContext.Provider value={value}>
      {children}
    </StaffListContext.Provider>
  );
};

export default StaffListProvider;
