// import { Navigation } from "./Navigation";
// import { useTheme } from "../store/ThemeContext";
// import { DefaultTheme, DarkTheme } from "@react-navigation/native";
// import { Theme } from "../theme";

// type ThemeData = {
//   theme: Theme;
//   isDark: boolean;
//   toggleTheme: () => void;
// };

// export const ThemedNavigation = () => {
//   const { theme, isDark }: ThemeData = useTheme();

//   const MyLightTheme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       bgApp: "#F5F0E8",
//       bgScreen: "#e9e9e8",
//       bgCard: "#ccc6bc",
//       bgElevated: "#FDF9F3",
//       bgInput: "#F0EBE1",
//       bgChip: "#EDE5D8",
//       bgNotch: "#F5F0E8",
//       bgOverlay: "rgba(250,247,242,0.95)",
//       textPrimary: "#1A1612",
//       textSecondary: "#4A3F32",
//       textMuted: "#7A6E62",
//       textDisabled: "#A89E92",
//       accentPrimary: "#B07830",
//       accentDark: "#8C5E20",
//       accentDanger: "#C04040",
//       accentSuccess: "#3A8C3A",
//       accentTag: "#8C5E20",
//       borderDefault: "#DDD5C8",
//       borderCard: "#E8DFD0",
//       borderDivider: "#EDE5D8",
//       readerBg: "#FDF8EF",
//       readerText: "#3A3228",
//     },
//   };

//   const MyDarkTheme = {
//     ...DarkTheme,
//     colors: {
//       ...DarkTheme.colors,
//       bgApp: "#1C1A17",
//       bgScreen: "#242018",
//       bgCard: "#2E2A24",
//       bgElevated: "#3A3228",
//       bgInput: "#2E2A24",
//       bgChip: "#3D372F",
//       bgNotch: "#1C1A17",
//       bgOverlay: "rgba(28,26,23,0.95)",
//       textPrimary: "#F5EFE4",
//       textSecondary: "#D8CBAD",
//       textMuted: "#9E9585",
//       textDisabled: "#6E6558",
//       accentPrimary: "#D4A96A",
//       accentDark: "#B8904F",
//       accentDanger: "#C47A7A",
//       accentSuccess: "#7AC47A",
//       accentTag: "#B8904F",
//       borderDefault: "#3D372F",
//       borderCard: "#4A4035",
//       borderDivider: "#322D27",
//       readerBg: "#26221C",
//       readerText: "#D8CBAD",
//     },
//   };

//   return <Navigation theme={isDark ? MyDarkTheme : MyLightTheme} />;
// };
