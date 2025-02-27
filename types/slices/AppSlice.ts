export type AppSlice = {
  isAuthLoading: boolean;
  isAppReady: boolean;
  setIsAuthLoading: (loading: boolean) => void;
  setAppReady: (ready: boolean) => void;
};
