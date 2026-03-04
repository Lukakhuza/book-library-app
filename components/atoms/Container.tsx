import { useContext } from "react";
import { StatusBar, View } from "react-native";
import { LibraryContext } from "../../store/LibraryContext";
import { useTheme } from "../../store/ThemeContext";
import { Props } from "../../types/basic";

export const Container = ({ children }: Props) => {
  const { safeAreaInsets: insets } = useContext(LibraryContext);
  const { theme, isDark, toggleTheme } = useTheme();
  console.log(theme.colors.bgScreen);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bgScreen,
        paddingHorizontal: 23,
        paddingTop: insets.top,
      }}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
};
