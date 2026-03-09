import { View, Text, TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type NoBooksTextProps = {
  textStyle?: TextStyle | TextStyle[];
  viewStyle?: ViewStyle;
  theme: Theme;
};

const NoBooksText = ({ theme }: NoBooksTextProps) => {
  const { fs, hs, ms, ws } = useScale();
  return (
    <View
      style={[
        styles.container,
        { marginHorizontal: ms(15), marginBottom: ms(10) },
      ]}
    >
      <Text
        style={[
          styles.noBooksText,
          {
            color: theme.colors.textPrimary,
            fontSize: fs(18),
            marginVertical: ms(5),
            marginHorizontal: ms(5),
          },
        ]}
      >
        You currently have no books.
      </Text>
      <Text
        style={[
          styles.noBooksText,
          {
            color: theme.colors.textPrimary,
            fontSize: fs(18),
            marginVertical: ms(5),
            marginHorizontal: ms(5),
          },
        ]}
      >
        Click below to explore:
      </Text>
    </View>
  );
};

export default NoBooksText;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontWeight: 600,
  },
});
