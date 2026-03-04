import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, ViewStyle } from "react-native";
import { Theme } from "../../theme";

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
  return (
    <Pressable
      style={[
        {
          borderColor: "black",
          backgroundColor: theme.colors.bgChip,
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
          // justifyContent: "space-between",
          width: 95,
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
          paddingHorizontal: 10,
        }}
      >
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
};
