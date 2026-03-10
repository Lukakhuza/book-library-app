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
  const { fs, ms } = useScale();
  const { bgChip, accentPrimary } = theme.colors;

  return (
    <Pressable
      style={[
        {
          borderColor: "black",
          backgroundColor: bgChip,
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
        <Ionicons name={"moon-outline"} size={25} color={accentPrimary} />
      ) : (
        <Ionicons name={"sunny-outline"} size={25} color={accentPrimary} />
      )}

      <Text
        style={{
          color: accentPrimary,
          fontSize: fs(14),
          marginLeft: ms(5),
        }}
      >
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
};
