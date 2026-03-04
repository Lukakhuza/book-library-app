import { Text, View } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  text: string;
  theme: any;
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
