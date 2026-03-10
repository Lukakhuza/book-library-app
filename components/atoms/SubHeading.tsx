import { PixelRatio, Text, View, ViewStyle } from "react-native";
import { useWindowDimensions } from "react-native";
import { Dimensions } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type Props = {
  text: string;
  theme: Theme;
  style?: ViewStyle;
  fontScale?: number;
};

export const SubHeading = ({ text, theme, style, fontScale = 1 }: Props) => {
  // const { width, height } = Dimensions.get("screen");
  const { width, height } = useWindowDimensions();
  const physicalWidth = width * PixelRatio.get();
  const physicalHeight = height * PixelRatio.get();
  const { fs, ws, hs, ms } = useScale();

  return (
    <View>
      <Text
        style={[
          {
            textTransform: "uppercase",
            fontFamily: "Roboto_700Bold",
            letterSpacing: 2,
            fontSize: fs(15),
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
