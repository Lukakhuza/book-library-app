import { StyleSheet, Text } from "react-native";
import { useScale } from "../../store/ThemeContext";
import { Theme } from "../../theme";

type Props = {
  theme: Theme;
  text: string;
};

const NoBookSubText = ({ theme, text }: Props) => {
  const { fs, ms } = useScale();
  const { textPrimary } = theme.colors;
  return (
    <Text
      style={[
        styles.textStyle,
        {
          color: textPrimary,
          fontSize: fs(18),
          marginVertical: ms(5),
          marginHorizontal: ms(5),
        },
      ]}
    >
      {text}
    </Text>
  );
};

export default NoBookSubText;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontWeight: 600,
  },
});
