export type AppState = {
  isAuthLoading: boolean;
  isAppReady: boolean;
  setIsAuthLoading: (loading: boolean) => void;
  setAppReady: (ready: boolean) => void;
};
