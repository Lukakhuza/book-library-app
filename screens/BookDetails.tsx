import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Directory, Paths } from "expo-file-system";
// import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";
import {
  deleteFromMyBooks,
  downloadBook,
  getXhtmlPath,
  openBook,
} from "../services/bookServices";
import { wait } from "../util/helperFunctions";
import { MyBooksContext } from "../store/MyBooksContext";
import { BookContext } from "../store/BookContext";
import { ChapterContext } from "../store/ChapterContext";
import { RootNavigationProp } from "../types/navigation";
import { Book, BookRouteProps, OpenBookResult } from "../types/book";
import { LibraryContext } from "../store/LibraryContext";
// import { Colors } from "../constants/Colors";

const BookDetailsScreen = ({ route }: BookRouteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateCurrentBook, currentBook } = useContext(BookContext);
  const { currentChapter } = useContext(ChapterContext);
  const navigation: RootNavigationProp = useNavigation();
  const { myBooks, addToMyBooks, removeFromMyBooks } =
    useContext(MyBooksContext);
  const { bookData } = route.params;

  useEffect(() => {
    updateCurrentBook(bookData);
  }, [bookData]);

  const downloaded = myBooks.some((book: Book) => {
    return book._id === currentBook?._id;
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
      // setIsLoading(false);
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
      // setIsLoading(false);
    }
  };

  const handleReadBook = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const { opfPath, spineHrefs, zip }: OpenBookResult = await openBook(
        bookData.fileName,
      );
      const currentSpineIndex = currentChapter;
      const xhtmlPath = getXhtmlPath(opfPath, spineHrefs, currentSpineIndex);
      const xhtmlString: string | undefined = await zip
        .file(xhtmlPath)
        ?.async("string");
      if (!xhtmlString) return;
      navigation.navigate("Reader", { chapterData: xhtmlString });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#45453ef5", "#f85454ff"]}
      style={[
        styles.outerContainer,
        {
          // alignItems: "center",
          // justifyContent: "center",
          opacity: isLoading ? 0.5 : 1,
        },
      ]}
    >
      {currentBook && (
        <View style={styles.content}>
          <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
            <Image
              source={{
                uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${currentBook.coverKey}`,
              }}
              style={{ width: 270, height: 405, marginTop: 10 }}
              resizeMode="cover"
            />
            <View style={styles.bookInfo}>
              <View style={styles.bookInfoLine}>
                <Text style={styles.label}>Title:</Text>
                <Text numberOfLines={2}>{currentBook.title}</Text>
              </View>
              <View style={styles.bookInfoLine}>
                <Text style={styles.label}>Author:</Text>
                <Text numberOfLines={2}>{currentBook.author}</Text>
              </View>
              <View style={styles.bookInfoLine}>
                <Text style={styles.label}>Language:</Text>
                <Text>{currentBook.language}</Text>
              </View>
              <View style={styles.bookInfoLine}>
                <Text style={styles.label}>Published:</Text>
                <Text>{currentBook.publishedYear}</Text>
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
      )}
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
