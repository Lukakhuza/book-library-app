import { Text, View } from "react-native";
import { Theme } from "../../theme";

type Props = {
  text: string;
  theme: Theme;
};

export const SubHeading = ({ text, theme }: Props) => {
  return (
    <View>
      <Text
        style={{
          textTransform: "uppercase",
          fontFamily: "Roboto_700Bold",
          letterSpacing: 2,
          fontSize: 15,
          color: theme.colors.textMuted,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
