import { View, Text, TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Theme } from "../../theme";

type NoBooksTextProps = {
  textStyle?: TextStyle | TextStyle[];
  viewStyle?: ViewStyle;
  theme: Theme;
};

const NoBooksText = ({ theme }: NoBooksTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.noBooksText, { color: theme.colors.textPrimary }]}>
        You currently have no books.
      </Text>
      <Text style={[styles.noBooksText, { color: theme.colors.textPrimary }]}>
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
    marginHorizontal: 15,
    marginBottom: 10,
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
  },
});
