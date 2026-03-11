import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { ReaderContext } from "../store/ReaderContext";
import { Container } from "../components/atoms/Container";
import PressableIcon from "../components/atoms/PressableIcon";
import {
  deleteFromMyBooks,
  downloadBook,
  getXhtmlPath,
  openBook,
} from "../services/bookServices";
import { BookContext } from "../store/BookContext";
import { ChapterContext } from "../store/ChapterContext";
import { MyBooksContext } from "../store/MyBooksContext";
import { useTheme } from "../store/ThemeContext";
import { Book, BookRouteProps, OpenBookResult } from "../types/book";
import { RootNavigationProp } from "../types/navigation";
import LoadingOverlay from "../util/LoadingOverlay";

const BookDetailsScreen = ({ route }: BookRouteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { updateCurrentBook, currentBook } = useContext(BookContext);
  const { currentChapter } = useContext(ChapterContext);
  const navigation: RootNavigationProp = useNavigation();
  const { myBooks, addToMyBooks, removeFromMyBooks } =
    useContext(MyBooksContext);
  const { bookData } = route.params;
  const { theme, toggleTheme, isDark } = useTheme();

  const goHome = () => navigation.navigate("App");

  useEffect(() => {
    updateCurrentBook(bookData);
  }, [bookData]);

  const downloaded = myBooks.some((book: Book) => {
    return book?.book_id === currentBook?.book_id;
  });

  const handleDownloadBook = async () => {
    // if (isLoading) return;

    try {
      setIsLoading(true);
      setIsDownloading(true);
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
    // if (isLoading) return;

    try {
      setIsLoading(true);
      setIsDeleting(true);
      // Remove book from the file system.
      await deleteFromMyBooks(bookData.fileName);
      // Update state
      navigation.navigate("App");
      removeFromMyBooks(bookData.fileName);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadBook = async () => {
    // if (isLoading) return;
    try {
      setIsDisabled(true);
      // setIsLoading(true);
      // setReadingStarted(true);
      const result: OpenBookResult | undefined = await openBook(
        bookData.fileName,
      );
      if (!result) return;
      const { opfPath, spineHrefs, zip } = result;
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

  if (isLoading || isDeleting || isDownloading) {
    if (isDeleting) {
      return <LoadingOverlay message="Deleting Book..." theme={theme} />;
    }

    if (isDownloading) {
      return <LoadingOverlay message="Downloading Book..." theme={theme} />;
    }

    return <LoadingOverlay message="Loading..." theme={theme} />;
  }

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <PressableIcon
          theme={theme}
          onPress={goHome}
          ioniconIdentifier={isDark ? "home-outline" : "home"}
        />
        <PressableIcon
          theme={theme}
          onPress={toggleTheme}
          ioniconIdentifier={isDark ? "sunny-outline" : "sunny-sharp"}
        />
        <PressableIcon
          theme={theme}
          ioniconIdentifier={isDark ? "share-social-outline" : "share-social"}
        />
      </View>
      {currentBook && (
        <View style={styles.content}>
          <View
            style={{
              marginHorizontal: 15,
              marginBottom: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${currentBook.coverKey}`,
                }}
                style={{
                  width: 270,
                  height: 405,
                  marginTop: 10,
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.bookInfo}>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontFamily: "Roboto_700Bold",
                  fontSize: 25,
                  textAlign: "center",
                  marginVertical: 10,
                }}
                numberOfLines={2}
              >
                {currentBook.title}
              </Text>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontFamily: "GoogleSans_400Regular",
                  fontSize: 19,
                  textAlign: "center",
                  marginBottom: 10,
                }}
                numberOfLines={2}
              >
                {currentBook.author}
              </Text>
            </View>
            {!downloaded ? (
              <View>
                <Pressable
                  disabled={isLoading}
                  style={[
                    styles.downloadButton,
                    { backgroundColor: theme.colors.accentPrimary },
                  ]}
                  onPress={handleDownloadBook}
                >
                  <Text style={styles.downloadButtonText}>Download</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Pressable
                  disabled={isDisabled}
                  style={[
                    styles.readButton,
                    { backgroundColor: theme.colors.accentSuccess },
                  ]}
                  onPress={handleReadBook}
                >
                  {isDisabled ? (
                    <Text
                      style={[styles.downloadButtonText, { color: "purple" }]}
                    >
                      Loading...
                    </Text>
                  ) : (
                    <Text style={styles.downloadButtonText}>Read Book</Text>
                  )}
                </Pressable>
                <Pressable
                  disabled={isLoading}
                  style={[
                    styles.deleteButton,
                    {
                      borderColor: theme.colors.borderDefault,
                      backgroundColor: theme.colors.bgCard,
                    },
                  ]}
                  onPress={handleDeleteBook}
                >
                  <Text
                    style={[
                      styles.deleteButtonText,
                      { color: theme.colors.accentDanger },
                    ]}
                  >
                    Delete from My Books
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      )}
    </Container>
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
    // borderWidth: 3,
    // borderColor: "brown",
    borderRadius: 15,
  },
  readButton: {
    marginTop: 10,
    borderRadius: 15,
  },
  deleteButton: {
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 15,
  },
  downloadButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    marginVertical: 7,
  },
  deleteButtonText: {
    textAlign: "center",
    fontFamily: "GoogleSans_400Regular",

    fontSize: 17,
    fontWeight: 500,
    marginVertical: 7,
  },
});
