import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useScale } from "../../store/ThemeContext";
import { Theme } from "../../theme";

type Props = {
  text: string;
  customStyle?: ViewStyle;
  theme: Theme;
};

export const Header = ({ text, customStyle, theme }: Props) => {
  const { fs } = useScale();

  return (
    <View style={[styles.headerContainer, customStyle]}>
      <Text
        style={[
          styles.headerText,
          {
            color: theme.colors.textPrimary,
            fontSize: fs(28),
          },
        ]}
        numberOfLines={2}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "OpenSans_700Bold",
  },
  headerContainer: {
    justifyContent: "center",
  },
});
