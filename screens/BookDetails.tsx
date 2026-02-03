import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Directory, Paths } from "expo-file-system";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";
import {
  deleteFromMyBooks,
  downloadBook,
  openBook,
} from "../services/bookServices";
import { wait } from "../util/helperFunctions";
// import { Colors } from "../constants/Colors";

const BookDetailsScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { bookImageUri, addToMyBooks, removeFromMyBooks, myBooks }: any =
    useContext(ReaderContext);

  const { bookData } = route.params;

  const downloaded = myBooks.some((book: any) => {
    return book._id === bookData._id;
  });

  const handleDownloadBook = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // Add book to the file system
      await downloadBook(bookData);
      // Update state
      addToMyBooks(bookData);
      navigation.navigate("App");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // Remove book from the file system.
      await deleteFromMyBooks(bookData.fileName);
      // Update state
      removeFromMyBooks(bookData.fileName);
      navigation.navigate("App");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadBook = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      // await wait(3000);
      // Generate epub file uri

      const data = await openBook(bookData.fileName);
      // console.log(data);
      navigation.navigate("Reader", { chapterData: data });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={[
        styles.outerContainer,
        {
          // alignItems: "center",
          // justifyContent: "center",
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          opacity: isLoading ? 0.5 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <Image
            source={{
              uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${bookData.coverKey}`,
            }}
            style={{ width: 270, height: 405, marginTop: 10 }}
            resizeMode="cover"
          />
          <View style={styles.bookInfo}>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Title:</Text>
              <Text numberOfLines={2}>{bookData.title}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Author:</Text>
              <Text numberOfLines={2}>{bookData.author}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Language:</Text>
              <Text>{bookData.language}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Published:</Text>
              <Text>{bookData.publishedYear}</Text>
            </View>
          </View>
          {!downloaded ? (
            <Pressable
              disabled={isLoading}
              style={styles.downloadButton}
              onPress={handleDownloadBook}
            >
              <Text style={styles.downloadButtonText}>Download</Text>
            </Pressable>
          ) : (
            <Pressable
              disabled={isLoading}
              style={styles.readButton}
              onPress={handleReadBook}
            >
              <Text style={styles.downloadButtonText}>Read Book</Text>
            </Pressable>
          )}
          <Pressable
            disabled={isLoading}
            style={styles.deleteButton}
            onPress={handleDeleteBook}
          >
            <Text style={styles.deleteButtonText}>Delete from My Books</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};
export default BookDetailsScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  header: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
  },
  label: {
    fontWeight: 900,
    marginRight: 25,
  },
  bookInfo: {
    marginTop: 15,
    marginHorizontal: 3,
  },
  bookInfoLine: {
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  downloadButton: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: "brown",
    borderRadius: 15,
    backgroundColor: "lightgray",
  },
  readButton: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "green",
  },
  deleteButton: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    backgroundColor: "red",
  },
  downloadButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    marginVertical: 7,
  },
  deleteButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    marginVertical: 7,
  },
});
