import { SemanticColors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";

type ColorMode = "light" | "dark";
type SemanticColorKey = keyof typeof SemanticColors.light &
  keyof typeof SemanticColors.dark;

interface Theme {
  isDark: boolean;
  colors: typeof SemanticColors.light | typeof SemanticColors.dark;
  typography: typeof Typography;
  toggleTheme: () => void;
  getColor: (colorKey: SemanticColorKey) => string;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const theme: Theme = {
    isDark,
    colors: isDark ? SemanticColors.dark : SemanticColors.light,
    typography: Typography,
    toggleTheme: () => setIsDark((prev) => !prev),
    getColor: (colorKey: SemanticColorKey) => {
      const mode: ColorMode = isDark ? "dark" : "light";
      return SemanticColors[mode][colorKey];
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
