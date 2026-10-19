import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { useCallback, useContext, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BookContext } from "../store/BookContext";
import { MyBooksContext } from "../store/MyBooksContext";
import { darkTheme } from "../theme";
import { BookState } from "../types/book";
import LoadingOverlay from "../util/LoadingOverlay";
import { RootStackProp } from "../types/navigation";

const ReaderScreen = () => {
  const navigation = useNavigation<RootStackProp>();
  const { myBooksState, updateMyBooksState } = useContext(MyBooksContext);
  const { currentBookObject, currentBook } = useContext(BookContext);
  const { goNext, goPrevious, currentLocation } = useReader();
  const currentLoc = useRef({
    cfi: "",
    location: 0,
    progress: 0,
  });

  const handleLocationChange = useMemo(
    () =>
      debounce(async (currentLocation: any) => {
        const { cfi, location, percentage: progress } = currentLocation.start;
        currentLoc.current = {
          cfi,
          location,
          progress,
        };
        console.log(currentLoc.current);
      }, 3000),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        const { cfi, location, progress } = currentLoc.current;
        const bookState: BookState = {
          cfi: cfi,
          location: location,
          progress: progress,
          updated_at: Date.now(),
        };
        updateMyBooksState(currentBook!.book_id, bookState);
      };
    }, [currentBook]),
  );

  if (!currentBookObject)
    return <LoadingOverlay theme={darkTheme} message="Loading..." />;

  return (
    <View>
      <View
        style={{
          backgroundColor: "lightblue",
          height: "20%",
          marginTop: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => goPrevious()}>
          <Text>Previous Page</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (currentBook) {
              navigation.navigate("BookDetails", {
                bookData: currentBook,
              });
            } else {
              navigation.navigate("Tabs", { screen: "Home" });
            }
          }}
        >
          <Text>My Books</Text>
        </Pressable>
        <Pressable onPress={() => goNext()}>
          <Text>Next Page</Text>
        </Pressable>
      </View>
      <Reader
        src={currentBookObject}
        fileSystem={useFileSystem}
        initialLocation={
          myBooksState.get(currentBook!.book_id)?.cfi || undefined
        }
        width={"100%"}
        height={700}
        onLocationChange={(_total: number, currentLocation: any) => {
          handleLocationChange(currentLocation);
        }}
      />
    </View>
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center" as const,
    fontSize: 20,
    fontWeight: "600" as const,
  },
  flatlistItem: {
    overflow: "hidden",
  },
  flatlistItemText: {
    fontSize: 20,
    includeFontPadding: false, // 🔑
  },
});

// const tagStyles: Record<Tag, TextStyle> = StyleSheet.create({});
