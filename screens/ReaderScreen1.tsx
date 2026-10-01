import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContextType } from "../store/ThemeContext";
import {
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TextLayoutLine,
  View,
} from "react-native";
import { transformParagraph } from "../services/bookServices";
import { BookContext } from "../store/BookContext";
import { ChapterContext } from "../store/ChapterContext";
import { LibraryContext } from "../store/LibraryContext";
import { useTheme } from "../store/ThemeContext";
import { RootNavigationProp } from "../types/navigation";
import LoadingOverlay from "../util/LoadingOverlay";
import { PageItem, Pages, LeftoverText } from "../types/book";

const ReaderScreen = () => {
  const { screenDimensions } = useContext(LibraryContext);
  const { textsArray, nextChapter, previousChapter, updateCurrentChapter } =
    useContext(ChapterContext);
  const { shouldExitBook, resetShouldExitBook } = useContext(ChapterContext);
  const { currentBook } = useContext(BookContext);
  const renderCount = useRef(0);
  const [paginationCompleted, setPaginationCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageItem[]>([]);
  const [pagesArray, setPagesArray] = useState<Pages>([]);
  const [currReaderHeight, setCurrReaderHeight] = useState(0);
  const [textLayout, setTextLayout] = useState<TextLayoutLine[]>([]);
  const lastParagraphArray = useRef<string[]>([]);
  const lastParagraphData = useRef<PageItem>({ meta: "", tag: "p", text: "" });
  const textSeparationTriggered = useRef<boolean>(false);
  const currentIndex = useRef<number>(0);
  const leftoverText = useRef<LeftoverText>(null);
  const pageWidthRef = useRef<number>(0);
  const currentIndexRef = useRef<number>(0);
  const navigation: RootNavigationProp = useNavigation();
  const { theme }: ThemeContextType = useTheme();
  const MIN_VALID_HEIGHT = 1;

  // tagStyles[item?.tag
  useEffect(() => {
    if (shouldExitBook) {
      if (!currentBook) return;
      navigation.navigate("BookDetails", { bookData: currentBook });
      resetShouldExitBook();
      updateCurrentChapter(0);
    }
  }, [shouldExitBook]);

  useEffect(() => {
    // Figure out where page 1 should end.
    // Cutoff point is either:
    // 1. If contents of the chapter fit entirely on page1, then page1 cutoff point is at chapter end.
    // 2. If contents of chapter 1 don't entirely fit on page1, then page1 cutoff is where the contents no longer fit.
    if (currReaderHeight <= 800 && textsArray.length > renderCount.current) {
      console.log(renderCount.current);
      const idx = renderCount.current;
      setCurrentPage((prev) => [...prev, textsArray[idx]]);
      renderCount.current = idx + 1;
    }
    console.log(textsArray.length);
    console.log(textsArray);
    console.log(currReaderHeight);
  }, [currReaderHeight]);

  const emptySpaceForJustification = "\u202F".repeat(75);

  const updateLastParagraph = (
    idx: number,
    array: string[],
    lastParagraphData: PageItem,
    selection: string,
  ) => {
    const transformedLastParagraphArray1 = transformParagraph(array, idx);
    lastParagraphArray.current = transformedLastParagraphArray1;
    let text = "";
    if (selection === "a") {
      text = transformedLastParagraphArray1.slice(0, idx + 1).join(" ");
    } else if (selection === "b") {
      text = transformedLastParagraphArray1[idx];
    } else if (selection === "c") {
      text = transformedLastParagraphArray1.slice(0, idx + 1).join(" ");
    }
    const item = {
      meta: lastParagraphData?.meta,
      tag: lastParagraphData?.tag,
      text: text,
    };

    if (selection === "a") {
      setCurrentPage((prev) => {
        return [...prev?.slice(0, prev?.length - 1), item];
      });
    } else if (selection === "b" || selection === "c") {
      setCurrentPage((prev) => {
        const withoutLast = prev?.slice(0, prev?.length - 1);

        if (item?.text?.trim() === "") {
          return withoutLast;
        }

        return [...withoutLast, item];
      });
    }
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageWidth = pageWidthRef.current;
    if (!pageWidth) return;
    const x = e.nativeEvent.contentOffset.x;
    currentIndexRef.current = Math.round(x / pageWidth);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const vx = e.nativeEvent.velocity?.x ?? 0;

    if (currentIndexRef.current === pagesArray.length - 1 && vx < 0.5) {
      renderCount.current = 0;
      setPaginationCompleted(false);
      setPagesArray([]);
      setCurrentPage([]);
      nextChapter();
    }

    if (currentIndexRef.current === 0 && vx > 0.5) {
      renderCount.current = 0;
      setPaginationCompleted(false);
      setPagesArray([]);
      setCurrentPage([]);
      previousChapter();
    }
  };

  return (
    <View
      style={[
        styles.outerContainer,
        { backgroundColor: theme.colors.readerBg },
      ]}
    >
      <View
        style={{
          flex: 1,
          marginVertical: 30,
        }}
      >
        {paginationCompleted && (
          <FlatList
            data={pagesArray}
            onLayout={(e: LayoutChangeEvent) => {
              pageWidthRef.current = e.nativeEvent.layout.width;
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={(page) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 20,
                    // borderColor: "blue",
                    // borderWidth: 1,
                    marginTop: 30,
                    width: screenDimensions?.width,
                  }}
                  key={page?.index}
                >
                  {page.item.map((item, index) => {
                    return (
                      <Text key={index} style={theme.tagStyles[item?.tag]}>
                        {item?.text}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            scrollEnabled={true}
            removeClippedSubviews={false}
            initialNumToRender={pagesArray?.length ?? 0}
            maxToRenderPerBatch={pagesArray?.length ?? 0}
            windowSize={100}
            overScrollMode="always"
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
          />
        )}
        {!paginationCompleted && (
          <View
            style={{
              paddingHorizontal: 20,
              minHeight: 1,
              marginTop: 30,
            }}
            onLayout={(e: LayoutChangeEvent) => {
              const { height } = e.nativeEvent.layout;
              setCurrReaderHeight(height);
            }}
          >
            {currentPage.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={[
                    { opacity: 1, backgroundColor: "brown" },
                    theme.tagStyles[item?.tag],
                  ]}
                  onTextLayout={(
                    e: NativeSyntheticEvent<TextLayoutEventData>,
                  ) => {
                    setTextLayout(e.nativeEvent.lines);
                  }}
                >
                  {item?.text}
                </Text>
              );
            })}
          </View>
        )}
        {/* {!paginationCompleted && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <LoadingOverlay message="Loading..." theme={theme} />
          </View>
        )} */}
      </View>
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
