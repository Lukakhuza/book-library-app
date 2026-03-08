import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type CustomStyles = {
  viewStyle?: ViewStyle;
  onPress: () => void;
  theme: Theme;
  isDark: boolean;
};

export const ThemeSwitchButton = ({
  viewStyle,
  onPress,
  theme,
  isDark,
}: CustomStyles) => {
  const { fs } = useScale();
  return (
    <Pressable
      style={[
        {
          borderColor: "black",
          backgroundColor: theme.colors.bgChip,
          borderWidth: 1,
          alignItems: "center",
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: "row",
        },
        viewStyle,
      ]}
      onPress={onPress}
    >
      {isDark ? (
        <Ionicons
          name={"moon-outline"}
          size={25}
          color={theme.colors.accentPrimary}
        />
      ) : (
        <Ionicons
          name={"sunny-outline"}
          size={25}
          color={theme.colors.accentPrimary}
        />
      )}

      <Text
        style={{
          color: "#D4A96A",
          // paddingLeft: 10,
          fontSize: fs(14),
          marginLeft: 5,
          // borderColor: "blue",

          // borderWidth: 1,
        }}
      >
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
};
