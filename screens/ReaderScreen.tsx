import { LibraryContext } from "../store/LibraryContext";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  TextLayoutEventData,
  NativeSyntheticEvent,
  TextLayoutLine,
  NativeScrollEvent,
  TextStyle,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { ReaderContext } from "../store/ReaderContext";
import LoadingOverlay from "../util/LoadingOverlay";
import { parseHTML } from "linkedom";
import { asArray, wait } from "../util/helperFunctions";
import { XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { resolveHref } from "../util/helperFunctions";
import { ScrollView } from "react-native";
import {
  transformParagraph,
  xmlStringToTextsArray,
} from "../services/bookServices";
import { ChapterContext } from "../store/ChapterContext";

type Tag = "p" | "h1" | "h2" | "h3" | "a";

type PageItem = {
  meta: Record<string, unknown>;
  text: string;
  tag: Tag;
};

type Page = PageItem[];
type Pages = Page[];

const ReaderScreen = () => {
  const { screenDimensions }: any = useContext(LibraryContext);
  const { textsArray, currentChapter, nextChapter, previousChapter } =
    useContext(ChapterContext);
  const iRef = useRef(0);
  const [paginationCompleted, setPaginationCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageItem[]>([]);
  const [pagesArray, setPagesArray] = useState<Pages>([]);
  const [currReaderHeight, setCurrReaderHeight] = useState(0);
  const [textLayout, setTextLayout] = useState<TextLayoutLine[]>([]);
  const lastParagraphArray = useRef<string[]>([]);
  const lastParagraphData = useRef({ meta: "", tag: "", text: "" });
  const textSeparationTriggered: any = useRef(false);
  const currentIndex = useRef(0);
  const leftoverText: any = useRef(null);
  const pageWidthRef = useRef(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // If textsArray doesn't contain chapter data, return.
    if (textsArray?.length === 0) return;
    // Ignore initial currReaderHeight of 0.
    if (currReaderHeight === 0) return;

    if (
      iRef.current > textsArray?.length - 1 &&
      lastParagraphData.current.text === ""
    ) {
      if (currReaderHeight <= 800 && !leftoverText?.current?.text) {
        // After paragraphs have been added to the last currentPage, add this currentPage data to pagesArray.
        setPagesArray((prev: any) => [...prev, currentPage]);
        // After all chapter data has been added to pagesArray, set PaginationCompleted to true so that FlatList can be rendered.
        setPaginationCompleted(true);
        return;
      }
    }

    // Keep adding data to current page until reader height is exceeded.
    if (currReaderHeight <= 800) {
      // If there is a leftover text from previous page, add that to the beginning of current page.
      if (leftoverText.current) {
        const currLeftover = leftoverText.current;
        setCurrentPage((prev: any) =>
          currLeftover?.text?.trim() === "" ? prev : [...prev, currLeftover],
        );
        leftoverText.current = null;
        // If there is no leftover text, simply add current paragraph to current page and update index:
      } else if (textSeparationTriggered?.current === false) {
        const idx = iRef.current;
        setCurrentPage((prev: any) => [...prev, textsArray[idx]]);
        iRef.current = idx + 1;
        // If there is a lastParagraph array:
      } else {
        // If last paragraph separation is already in the last stage and there is a an empty string separating
        // separating part that remains on current page and part that overflows to the next, then do:
        if (lastParagraphArray.current.includes("")) {
          // Add extra whitespace at the end for proper justification:
          const updatedCurrentPage = currentPage.map((item, index) =>
            index === currentPage.length - 1
              ? { ...item, text: item?.text + emptySpaceForJustification }
              : item,
          );

          // add updated current page to pages array:
          setPagesArray((prev: any) => [...prev, updatedCurrentPage]);

          // Get the index of where last paragraph was split, so that we can gather
          // the remaining part for the following page:
          const separationIndex = lastParagraphArray.current.indexOf("");

          let result = "";
          if (separationIndex !== -1) {
            result = lastParagraphArray.current
              .slice(separationIndex)
              .join(" ")
              ?.trim();
          }

          // Update leftover text for next page:
          leftoverText.current = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: result,
          };
          lastParagraphData.current = { meta: "", tag: "", text: "" };
          // Reset all variables that were specific to current page:
          lastParagraphArray.current = [];
          textSeparationTriggered.current = false;
          currentIndex.current = 0;
          setCurrentPage([]);
          // Remaining text of the current paragraph would be added to the beginning of next page.
        } else {
          // if after adding the last paragraph candidate text, the currReaderHeight is still less than
          // available height, then take the second half of the last paragraph array, split it in half
          // and add the first half of newly split string to the previous string.
          currentIndex.current += 1;
          const idx1 = currentIndex.current;
          updateLastParagraph(
            idx1,
            lastParagraphArray.current,
            lastParagraphData.current,
            "a",
          );
          textSeparationTriggered.current = true;
        }
      }
    } else {
      // If there is an overflow of last paragraph, create lastParagraph array
      // based on current last paragraph and splitIndex.
      if (leftoverText.current) {
        lastParagraphArray.current = leftoverText.current;
      } else if (lastParagraphArray.current.length === 0) {
        const lastParagraph: any = currentPage[currentPage?.length - 1];
        lastParagraphData.current = lastParagraph;
        const arr = [lastParagraph?.text];
        const idx3 = 0;
        updateLastParagraph(idx3, arr, lastParagraph, "b");
      } else {
        if (lastParagraphArray.current.includes("")) {
          // Save current page to pages array and reset everything.
          const updatedCurrentPage = currentPage.map((item, index) =>
            index === currentPage.length - 1
              ? { ...item, text: item?.text + emptySpaceForJustification }
              : item,
          );

          setPagesArray((prev: any) => [...prev, updatedCurrentPage]);

          const separationIndex = lastParagraphArray.current.indexOf("");

          let result = "";
          if (separationIndex !== -1) {
            result = lastParagraphArray.current
              .slice(separationIndex)
              .join(" ")
              ?.trim();
          }

          leftoverText.current = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: result,
          };
          lastParagraphArray.current = [];
          textSeparationTriggered.current = false;
          currentIndex.current = 0;
          setCurrentPage([]);
        } else {
          updateLastParagraph(
            currentIndex.current,
            lastParagraphArray.current,
            lastParagraphData.current,
            "c",
          );
        }
      }
      textSeparationTriggered.current = true;
    }
  }, [textsArray, currReaderHeight, textLayout]);

  const emptySpaceForJustification = "\u202F".repeat(75);

  const updateLastParagraph = (
    idx: number,
    array: any,
    lastParagraphData: any,
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
      setCurrentPage((prev: any) => {
        return [...prev?.slice(0, prev?.length - 1), item];
      });
    } else if (selection === "b" || selection === "c") {
      setCurrentPage((prev: any) => {
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
    // console.log(currentIndexRef.current);
  };

  // console.log(currentIndexRef.current);
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const vx = e.nativeEvent.velocity?.x ?? 0;

    if (currentIndexRef.current === pagesArray.length - 1 && vx < 0.5) {
      // console.log(vx);
      iRef.current = 0;
      setPaginationCompleted(false);
      setPagesArray([]);
      setCurrentPage([]);
      nextChapter();
    }

    // console.log(currentIndexRef.current, pagesArray.length, vx);
    if (currentIndexRef.current === 0 && vx > 0.5) {
      // console.log(vx);
      iRef.current = 0;
      setPaginationCompleted(false);
      setPagesArray([]);
      setCurrentPage([]);
      previousChapter();
    }
  };

  return (
    <View style={styles.outerContainer}>
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
                      <Text key={index} style={tagStyles[item?.tag]}>
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
                  style={[{ opacity: 0 }, tagStyles[item?.tag]]}
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
        {!paginationCompleted && (
          <View
            style={{
              // backgroundColor: "lightblue",
              // opacity: 1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <LoadingOverlay message="Loading..." />
          </View>
        )}
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
  flatlistItem: {
    overflow: "hidden",
  },
  flatlistItemText: {
    fontSize: 20,
    includeFontPadding: false, // 🔑
  },
  loadingOverlayContainer: {
    backgroundColor: "#0dcadb",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const tagStyles: Record<Tag, TextStyle> = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: 700,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  h2: {
    fontSize: 25,
    fontWeight: 700,
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  h3: { color: "orange" },
  a: { color: "brown" },
  p: {
    color: "purple",
    fontSize: 20,
    textAlign: "justify",
    marginBottom: 5,
  },
});
