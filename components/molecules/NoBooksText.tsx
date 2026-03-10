import { View, Text, TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";
import NoBookSubText from "../atoms/NoBooksSubText";

type NoBooksTextProps = {
  textStyle?: TextStyle | TextStyle[];
  viewStyle?: ViewStyle;
  theme: Theme;
};

const NoBooksText = ({ theme }: NoBooksTextProps) => {
  const { ms } = useScale();
  return (
    <View
      style={[
        styles.container,
        { marginHorizontal: ms(15), marginBottom: ms(10) },
      ]}
    >
      <NoBookSubText theme={theme} text="You currently have no books." />
      <NoBookSubText theme={theme} text="Click below to explore:" />
    </View>
  );
};

export default NoBooksText;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
