import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { LibraryContext } from "../../store/LibraryContext";
import { Props } from "../../types/basic";
import { Colors } from "../../constants/colors";
import { ThemeContext, useTheme } from "../../store/ThemeContext";

export const Container = ({ children }: Props) => {
  const { safeAreaInsets: insets } = useContext(LibraryContext);
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bgScreen,
        paddingHorizontal: 23,
        paddingTop: insets.top,
      }}
    >
      {children}
    </View>
  );
};
