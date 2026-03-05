import { Text, View, ViewStyle } from "react-native";
import { Theme } from "../../theme";

type Props = {
  text: string;
  theme: Theme;
  style?: ViewStyle;
};

export const SubHeading = ({ text, theme, style }: Props) => {
  return (
    <View>
      <Text
        style={[
          {
            textTransform: "uppercase",
            fontFamily: "Roboto_700Bold",
            letterSpacing: 2,
            fontSize: 15,
            color: theme.colors.textMuted,
          },
          style,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
