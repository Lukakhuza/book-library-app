import { Navigation } from "./Navigation";
import { useTheme } from "../store/ThemeContext";

export const ThemedNavigation = () => {
  const { theme, isDark }: any = useTheme();

  return <Navigation theme={theme} />;
};
