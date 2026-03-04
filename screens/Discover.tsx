import { FlatList, Image, Pressable, StyleSheet, Text } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
// import { Colors } from "../constants/Colors";
import { Container } from "../components/atoms/Container";
import { Header } from "../components/atoms/Header";
import { LibraryContext } from "../store/LibraryContext";
import { useTheme } from "../store/ThemeContext";
import { AppNavigationProp } from "../types/navigation";

const DiscoverScreen = () => {
  const navigation: AppNavigationProp = useNavigation();
  const { books } = useContext(LibraryContext);
  const { theme } = useTheme();

  return (
    <Container>
      <Header
        text="Explore Books"
        customStyle={{ marginBottom: 5 }}
        theme={theme}
      />
      <FlatList
        data={books}
        bounces={false}
        overScrollMode="never"
        columnWrapperStyle={styles.flatlistColumnWrapperStyle}
        contentContainerStyle={styles.flatlistContentContainerStyle}
        renderItem={(book) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("BookDetails", { bookData: book.item });
              }}
              style={[
                styles.flatlistItem,
                { backgroundColor: theme.colors.bgElevated },
              ]}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[
                  styles.flatlistItemText,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {book.item.title}
              </Text>
              <Image
                source={{
                  uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${book.item.coverKey}`,
                }}
                style={styles.flatlistItemImage}
                resizeMode="cover"
              />
            </Pressable>
          );
        }}
        numColumns={2}
      />
    </Container>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, paddingHorizontal: 15 },
  // header: {
  //   fontSize: 20,
  //   fontWeight: 800,
  // },
  // headerContainer: {
  //   marginTop: 20,
  //   marginBottom: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  flatlistColumnWrapperStyle: { gap: 12, justifyContent: "flex-end" },
  flatlistContentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  flatlistItem: {
    flex: 1,
    width: "45%",
    alignItems: "center",
    justifyContent: "flex-end",
    // marginBottom: 10,
    // // marginVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    // width: width * 0.5,
    // alignItems: "center",
    // justifyContent: "flex-end",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
  },
  flatlistItemText: {
    textAlign: "center",
    color: "white",
    fontWeight: 500,
  },
  flatlistItemImage: { width: 90, height: 135, marginTop: 10 },
});
