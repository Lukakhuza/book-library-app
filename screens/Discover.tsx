import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import { LibraryContext } from "../store/LibraryContext";

const DiscoverScreen = () => {
  const navigation: any = useNavigation();
  const { books }: any = useContext(LibraryContext);

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={styles.outerContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore Books</Text>
      </View>
      <FlatList
        data={books}
        columnWrapperStyle={styles.flatlistColumnWrapperStyle}
        contentContainerStyle={styles.flatlistContentContainerStyle}
        renderItem={(book) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("BookDetails", { bookData: book.item });
              }}
              style={styles.flatlistItem}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.flatlistItemText}
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
    </LinearGradient>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, paddingHorizontal: 15 },
  header: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistColumnWrapperStyle: { gap: 12, justifyContent: "flex-end" },
  flatlistContentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 15,
  },
  flatlistItem: {
    backgroundColor: "#4b4848ee",
    borderRadius: 20,
    flex: 1,
    width: "45%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
    // marginVertical: 10,
    paddingHorizontal: 8,
  },
  flatlistItemText: {
    textAlign: "center",
    color: "white",
    fontWeight: 500,
  },
  flatlistItemImage: { width: 90, height: 135, marginTop: 10 },
});
