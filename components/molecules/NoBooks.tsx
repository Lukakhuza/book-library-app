import { Pressable, StyleSheet, Text, View } from "react-native";
import { useScale } from "../../store/ThemeContext";
import NoBooksText from "./NoBooksText";
import { Theme } from "../../theme";

type Props = {
  theme: Theme;
  onExplore: () => void;
};

const NoBooks = ({ theme, onExplore }: Props) => {
  const { fs, ms } = useScale();
  const { bgCard, accentPrimary } = theme.colors;

  return (
    <View style={styles.container}>
      <NoBooksText theme={theme} />
      <View>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: bgCard,
              borderRadius: ms(15),
              borderWidth: ms(2),
              paddingHorizontal: ms(10),
              paddingVertical: ms(5),
            },
          ]}
          onPress={onExplore}
        >
          <Text
            style={{
              fontSize: fs(15),
              textTransform: "uppercase",
              color: accentPrimary,
            }}
          >
            Explore
          </Text>
        </Pressable>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
