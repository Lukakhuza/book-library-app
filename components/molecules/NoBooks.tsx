import { Button, View, StyleSheet } from "react-native";
import NoBooksText from "../atoms/NoBooksText";

const NoBooks = ({ theme, onExplore }: any) => {
  return (
    <View style={styles.container}>
      <NoBooksText theme={theme} />
      <View>
        <Button
          title="Explore"
          color={theme.colors.bgCard}
          onPress={onExplore}
        />
      </View>
    </View>
  );
};

export default NoBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
