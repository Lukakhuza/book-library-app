import { Text, View } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  text: string;
};

export const SubHeading = ({ text }: Props) => {
  return (
    <View>
      <Text
        style={{
          textTransform: "uppercase",
          fontFamily: "Roboto_700Bold",
          letterSpacing: 2,
          fontSize: 15,
          color: Colors.dark.textMuted,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
