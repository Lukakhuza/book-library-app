import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useColorScheme, PixelRatio, useWindowDimensions } from "react-native";
import { darkTheme, lightTheme, Theme } from "../theme/index";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { tagStylesDark, tagStylesLight } from "../theme/tagStyles";

export type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  scale: any;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  scale: {
    ms: (size: number) => size,
    ws: (size: number) => size,
    hs: (size: number) => size,
    fs: (size: number) => size,
  },
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");
  const { width, height, fontScale: fntScale } = useWindowDimensions();
  // Width: 320dp → 430dp
  // Height: 568dp → 932dp
  let fontScale = 2;
  const baseWidth = 411.42857142857144;
  const baseHeight = 914.2857142857143;
  const physicalWidth = width * PixelRatio.get();
  const physicalHeight = height * PixelRatio.get();

  const ms = (size: number) => Math.round(size * fontScale * 0.5 + size * 0.5);
  const ws = (size: number) => Math.round((size * width) / baseWidth);
  const hs = (size: number) => Math.round((size * height) / baseHeight);
  const fs = (size: number) => Math.round(size * fontScale);

  // console.log(fs(15));
  const scale = {
    ms: ms,
    ws: ws,
    hs: hs,
    fs: fs,
  };

  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const theme = useMemo(() => {
    return isDark
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            bgApp: "#1C1A17",
            bgScreen: "#242018",
            bgCard: "#2E2A24",
            bgElevated: "#3A3228",
            bgInput: "#2E2A24",
            bgChip: "#3D372F",
            bgNotch: "#1C1A17",
            bgOverlay: "rgba(28,26,23,0.95)",
            textPrimary: "#F5EFE4",
            textSecondary: "#D8CBAD",
            textMuted: "#9E9585",
            textDisabled: "#6E6558",
            accentPrimary: "#D4A96A",
            accentDark: "#B8904F",
            accentDanger: "#C47A7A",
            accentSuccess: "#7AC47A",
            accentTag: "#B8904F",
            borderDefault: "#3D372F",
            borderCard: "#4A4035",
            borderDivider: "#322D27",
            readerBg: "#26221C",
            readerText: "#D8CBAD",
          },
          tagStyles: tagStylesDark,
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            bgApp: "#F5F0E8",
            bgScreen: "#e9e9e8",
            bgCard: "#ccc6bc",
            bgElevated: "#FDF9F3",
            bgInput: "#F0EBE1",
            bgChip: "#EDE5D8",
            bgNotch: "#F5F0E8",
            bgOverlay: "rgba(250,247,242,0.95)",
            textPrimary: "#1A1612",
            textSecondary: "#4A3F32",
            textMuted: "#7A6E62",
            textDisabled: "#A89E92",
            accentPrimary: "#B07830",
            accentDark: "#8C5E20",
            accentDanger: "#C04040",
            accentSuccess: "#3A8C3A",
            accentTag: "#8C5E20",
            borderDefault: "#DDD5C8",
            borderCard: "#E8DFD0",
            borderDivider: "#EDE5D8",
            readerBg: "#FDF8EF",
            readerText: "#3A3228",
          },
          tagStyles: tagStylesLight,
        };
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, scale }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export const useScale = () => useContext(ThemeContext).scale;
