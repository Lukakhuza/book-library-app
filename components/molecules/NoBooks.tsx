import { Button, View, StyleSheet, Pressable, Text } from "react-native";
import NoBooksText from "../atoms/NoBooksText";
import { useScale } from "../../store/ThemeContext";

const NoBooks = ({ theme, onExplore }: any) => {
  const { fs, ms } = useScale();
  return (
    <View style={styles.container}>
      <NoBooksText theme={theme} />
      <View>
        <Pressable
          style={{
            // width: 200,
            backgroundColor: theme.colors.bgCard,
            // height: 50,
            // backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: ms(15),
            borderWidth: ms(2),
            paddingHorizontal: ms(10),
            paddingVertical: ms(5),
          }}
          onPress={onExplore}
        >
          <Text
            style={{
              fontSize: fs(15),
              textTransform: "uppercase",
              color: theme.colors.accentPrimary,
            }}
          >
            Explore
          </Text>
        </Pressable>
        {/* <Button
          title="Explore"
          color={theme.colors.bgCard}
          onPress={onExplore}
        /> */}
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
    // borderColor: "brown",
    // borderWidth: 2,
  },
});
