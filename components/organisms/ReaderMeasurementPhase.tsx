import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { ReaderContext } from "../../store/ReaderContext";
import LoadingOverlay from "../../util/LoadingOverlay";
import { parseHTML } from "linkedom";
import { asArray } from "../../util/helperFunctions";
import { XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { resolveHref } from "../../util/helperFunctions";
import { ScrollView } from "react-native";
import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import { paginateText, paginateText2 } from "../../services/bookServices";

const ReaderMeasurementPhase = (data: any) => {
  const {
    chapter,
    pages,
    lineProps,
    properties,
    readerDimensions,
    screenDimensions,
    updateReaderDimensions,
    textLayouts,
    updateTextLayouts,
    updatePages,
    readerIsReady,
    contentSizeRef,
    layoutReadyRef,
    containerWidthRef,
    debounceRef,
    textLayoutsRef,
    checkLayoutReady,
  }: any = useContext(ReaderContext);

  const [textsArray, setTextsArray] = useState([]);
  const iRef = useRef(0);
  const [paginationCompleted, setPaginationCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>([]);
  const [pagesArray, setPagesArray] = useState<any>([]);
  const [currReaderHeight, setCurrReaderHeight] = useState(0);
  const [textLayout, setTextLayout] = useState([]);
  const lastParagraphArray = useRef([]);
  const lastParagraphData = useRef({ meta: "", tag: "", text: "" });
  const textSeparationTriggered: any = useRef(false);
  const currentIndex = useRef(0);
  const leftoverText: any = useRef(null);
  const lastTriggeredRef = useRef(false);
  const pageWidthRef = useRef(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (textsArray?.length === 0) return;
    if (currReaderHeight === 0) return;

    if (iRef.current > textsArray.length - 1) {
      setPagesArray((prev: any) => [...prev, currentPage]);
      setPaginationCompleted(true);
      return;
    }

    if (currReaderHeight <= 800) {
      if (leftoverText.current) {
        const currLeftover = leftoverText.current;
        // setCurrentPage((prev: any) => [...prev, currLeftover]);
        setCurrentPage((prev: any) =>
          currLeftover.text.trim() === "" ? prev : [...prev, currLeftover],
        );
        leftoverText.current = null;
      } else if (textSeparationTriggered?.current === false) {
        const idx = iRef.current;
        setCurrentPage((prev: any) => [...prev, textsArray[idx]]);

        iRef.current = idx + 1;
      } else {
        if (lastParagraphArray.current.includes("")) {
          // Add extra whitespace at the end for proper justification:
          const updatedCurrentPage = currentPage.map((item, index) =>
            index === currentPage.length - 1
              ? { ...item, text: item.text + emptySpaceForJustification }
              : item,
          );

          setPagesArray((prev: any) => [...prev, updatedCurrentPage]);

          const separationIndex = lastParagraphArray.current.indexOf("");

          let result = "";
          if (separationIndex !== -1) {
            result = lastParagraphArray.current
              .slice(separationIndex)
              .join(" ")
              .trim();
          }

          leftoverText.current = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: result,
          };
          // lastParagraphArray.slice(0, currentIndex.current + 1).join(" ");
          // const text = transformedLastParagraphArray1
          //   .slice(0, idx1 + 1)
          //   .join(" ");
          lastParagraphArray.current = [];
          textSeparationTriggered.current = false;
          currentIndex.current = 0;
          setCurrentPage([]);
          // Remaining text of the current paragraph would be added to the beginning of next page.
        } else {
          currentIndex.current += 1;
          const idx1 = currentIndex.current;
          textSeparationTriggered.current = true;
          // Transform last paragraph array:
          const transformedLastParagraphArray1 = transformParagraph(
            lastParagraphArray.current,
            idx1,
          );
          lastParagraphArray.current = transformedLastParagraphArray1;
          // setLastParagraphArray(transformedLastParagraphArray1);
          const text = transformedLastParagraphArray1
            .slice(0, idx1 + 1)
            .join(" ");
          const item = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: text,
          };

          setCurrentPage((prev: any) => {
            return [...prev?.slice(0, prev?.length - 1), item];
          });
        }
      }
    } else {
      // If there is an overflow of last paragraph, create lastParagraph array
      // based on current last paragraph and splitIndex.
      if (leftoverText.current) {
        lastParagraphArray.current = leftoverText.current;
        const item3 = {
          meta: leftoverText.current.meta,
          tag: leftoverText.current.tag,
          text: leftoverText.current.text,
        };
      } else if (lastParagraphArray.current.length === 0) {
        const lastParagraph: any = currentPage[currentPage?.length - 1];
        lastParagraphData.current = lastParagraph;
        const arr = [lastParagraph.text];
        const transformedLastParagraphArray = transformParagraph(arr, 0);
        // setLastParagraphArray(transformedLastParagraphArray);
        lastParagraphArray.current = transformedLastParagraphArray;
        const item = {
          meta: lastParagraph?.meta,
          tag: lastParagraph?.tag,
          text: transformedLastParagraphArray[0],
        };

        setCurrentPage((prev: any) => {
          const withoutLast = prev?.slice(0, prev?.length - 1);

          if (item.text.trim() === "") {
            return withoutLast;
          }

          return [...withoutLast, item];
          // return [...prev?.slice(0, prev?.length - 1), item];
        });
      } else {
        if (lastParagraphArray.current.includes("")) {
          // Save current page to pages array and reset everything.
          const updatedCurrentPage = currentPage.map((item, index) =>
            index === currentPage.length - 1
              ? { ...item, text: item.text + emptySpaceForJustification }
              : item,
          );

          setPagesArray((prev: any) => [...prev, updatedCurrentPage]);

          const separationIndex = lastParagraphArray.current.indexOf("");

          let result = "";
          if (separationIndex !== -1) {
            result = lastParagraphArray.current
              .slice(separationIndex)
              .join(" ")
              .trim();
          }

          leftoverText.current = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: result,
          };
          // lastParagraphArray.slice(0, currentIndex.current + 1).join(" ");
          // const text = transformedLastParagraphArray1
          //   .slice(0, idx1 + 1)
          //   .join(" ");
          lastParagraphArray.current = [];
          textSeparationTriggered.current = false;
          currentIndex.current = 0;
          setCurrentPage([]);
          // Remaining text of the current paragraph would be added to the beginning of next page.
        } else {
          const idx2 = currentIndex.current;
          const transformedPar = transformParagraph(
            lastParagraphArray.current,
            currentIndex.current,
          );
          lastParagraphArray.current = transformedPar;
          const text1 = transformedPar.slice(0, idx2 + 1).join(" ");
          const item2 = {
            meta: lastParagraphData.current.meta,
            tag: lastParagraphData.current.tag,
            text: text1,
          };
          setCurrentPage((prev: any) => {
            const withoutLast2 = prev?.slice(0, prev?.length - 1);

            if (item2.text.trim() === "") {
              return withoutLast2;
            }

            return [...withoutLast2, item2];
          });
        }
      }
      textSeparationTriggered.current = true;
    }
  }, [textsArray, currReaderHeight, textLayout]);

  const transformParagraph = (paragraphArray: any, currentIndex: number) => {
    const text = paragraphArray[currentIndex];
    const words = text?.trim().split(/\s+/);
    const middle = Math.floor(words?.length / 2);
    const firstHalfText = words?.slice(0, middle).join(" ");
    const secondHalfText = words?.slice(middle).join(" ");

    return [
      ...paragraphArray.slice(0, currentIndex),
      firstHalfText,
      secondHalfText,
      ...paragraphArray.slice(currentIndex + 1),
    ];
  };
  // const textColors = {
  //   p: "red",
  //   h1: "blue",
  //   h2: "green",
  //   quote: "purple",
  // };
  // const listItems = asArray(data?.data?.content?.li);

  const emptySpaceForJustification = "\u202F".repeat(75);

  useEffect(() => {
    const xhtmlString = data.data;
    const load = async () => {
      const doc = parseDocument(xhtmlString, { xmlMode: true });
      const allText: any = DomUtils.findAll(
        (el) =>
          el.type === "tag" &&
          (el.name === "p" ||
            el.name === "h1" ||
            el.name === "h2" ||
            el.name === "h3" ||
            el.name === "a"),
        doc.children,
      );

      const texts = allText.map((el: any) => ({
        tag: el.name,
        text: DomUtils.textContent(el)
          .trim()
          .replace(/\s*\r?\n\s*/g, " ") // remove line breaks with surrounding whitespace
          .replace(/\s+/g, " ") // collapse multiple whitespace into single space
          .trim(),

        meta: el.attribs ?? {},
      }));

      const textsArray: any = Array.from(texts);
      // paginateText2(textsArray);
      setTextsArray(textsArray);
    };
    load();
  }, []);

  // const onScroll = (e) => {
  //   const pageWidth = pageWidthRef.current;
  //   if (!pageWidth) return;

  //   const x = e.nativeEvent.contentOffset.x;

  //   const lastIndex = pagesArray.length - 1;
  //   const lastPageX = lastIndex * pageWidth;

  //   const overshoot = x - lastPageX;

  //   const THRESHOLD = 40;

  //   if (overshoot > THRESHOLD && !lastTriggeredRef.current) {
  //     lastTriggeredRef.current = true;
  //     console.log("Hello World");
  //   }

  //   if (overshoot <= 0) {
  //     lastTriggeredRef.current = false;
  //   }
  // };

  const onMomentumScrollEnd = (e) => {
    const pageWidth = pageWidthRef.current;
    if (!pageWidth) return;
    const x = e.nativeEvent.contentOffset.x;
    currentIndexRef.current = Math.round(x / pageWidth);
    // console.log(currentIndexRef.current);
  };

  const onScrollEndDrag = (e) => {
    const vx = e.nativeEvent.velocity?.x ?? 0;

    if (currentIndexRef.current === pagesArray.length - 1 && vx < 0.5) {
      // onSwipePastLast();
      console.log(vx);
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
        {/* <FlatList
          data={[lineProps, lineProps]}
          style={styles.flatlist}
          renderItem={(itemData) => {
            return (
              <View key={itemData?.index} style={styles.flatlistItem}>
                <Text
                  // style={[
                  //   { color: "purple", fontSize: 20, textAlign: "justify" },
                  //   styles.flatlistItemText,
                  // ]}
                  style={{
                    textAlign: "justify",
                    fontSize: 20,
                    paddingHorizontal: 5,
                    width: screenDimensions.width,
                  }}
                  allowFontScaling={false}
                  maxFontSizeMultiplier={1}
                >
                  {itemData?.item?.text}
                </Text>
              </View>
            );
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          removeClippedSubviews={false}
          initialNumToRender={textsArray?.length ?? 0}
          maxToRenderPerBatch={textsArray?.length ?? 0}
          windowSize={100}
        /> */}
        {/* <FlatList
          data={textsArray}
          style={styles.flatlist}
          onContentSizeChange={(w, h) => {
            if (
              w < screenDimensions.width * 0.9 ||
              readerDimensions.width < 100 ||
              readerDimensions.height < 100
            ) {
              return;
            }
            contentSizeRef.current.width = w;
            contentSizeRef.current.height = h;
            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
              if (textLayoutsRef?.current?.length === 0) return;
              updateTextLayouts(textLayoutsRef);
            }, 200);
          }}
          onLayout={(e) => {
            const { height, width } = e.nativeEvent.layout;
            if (height < 100 || width < 100) {
              return;
            }
            updateReaderDimensions(width, height);
            layoutReadyRef.current.container = true;
            checkLayoutReady();
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(itemData) => {
                        return (
              <View key={itemData?.index} style={styles.flatlistItem}>
                <Text
                  style={[
                    styles.flatlistItemText,
                    {
                      textAlign: "justify",
                      fontSize: 20,
                      paddingHorizontal: 15,
                      width: screenDimensions.width,
                    },
                    properties[itemData.item.tag],
                  ]}
                  allowFontScaling={false}
                  maxFontSizeMultiplier={1}
                  onTextLayout={(e) => {
                    if (
                      readerDimensions.width < 200 ||
                      readerDimensions.height < 200
                    ) {
                      return;
                    }

                    const data = {
                      lines: e.nativeEvent.lines,
                      tag: itemData.item.tag,
                    };

                    textLayoutsRef.current[itemData.index] = data;

                    if (textLayoutsRef?.current?.length !== textsArray?.length)
                      return;
                    layoutReadyRef.current.textLayout = true;
                    checkLayoutReady();
                  }}
                >
                  {itemData.item.text}
                </Text>
              </View>
            );
          }}
          scrollEnabled={true}
          removeClippedSubviews={false}
          initialNumToRender={textsArray?.length ?? 0}
          maxToRenderPerBatch={textsArray?.length ?? 0}
          windowSize={100}
        /> */}
        {paginationCompleted && (
          <FlatList
            data={pagesArray}
            // style={styles.flatlist}
            // onContentSizeChange={(w, h) => {
            //   if (
            //     w < screenDimensions.width * 0.9 ||
            //     readerDimensions.width < 100 ||
            //     readerDimensions.height < 100
            //   ) {
            //     return;
            //   }
            //   contentSizeRef.current.width = w;
            //   contentSizeRef.current.height = h;
            //   if (debounceRef.current) {
            //     clearTimeout(debounceRef.current);
            //   }
            //   debounceRef.current = setTimeout(() => {
            //     if (textLayoutsRef?.current?.length === 0) return;
            //     updateTextLayouts(textLayoutsRef);
            //   }, 200);
            // }}
            // onLayout={(e) => {
            //   const { height, width } = e.nativeEvent.layout;
            //   if (height < 100 || width < 100) {
            //     return;
            //   }
            //   updateReaderDimensions(width, height);
            //   layoutReadyRef.current.container = true;
            //   checkLayoutReady();
            // }}
            // onScroll={onScroll}
            onLayout={(e) => {
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
                    width: screenDimensions.width,
                  }}
                  key={page?.index}
                >
                  {page.item.map((item, index) => {
                    return (
                      <Text key={index} style={styles[item?.tag]}>
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
              // borderColor: "blue",
              // borderWidth: 1,
              marginTop: 30,
            }}
            onLayout={(e) => {
              const { height } = e.nativeEvent.layout;
              setCurrReaderHeight(height);
            }}
          >
            {currentPage.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={styles[item?.tag]}
                  onTextLayout={(e) => {
                    setTextLayout(e.nativeEvent.lines);
                  }}
                >
                  {item?.text}
                </Text>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );

  // (
  // <View style={styles.outerContainer}>
  //   <Text style={styles.title}>{chapter.title}</Text>

  //   {/* <View style={styles.loadingOverlayContainer}>
  //     <LoadingOverlay message="Loading..." />
  //   </View> */}
  // </View>
  // );
};

export default ReaderMeasurementPhase;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
  flatlist: {
    // opacity: 0,
    // borderColor: "red",
  },
  flatlistItem: {
    overflow: "hidden",
    // paddingVertical: 2,
    // width: 400,
  },
  flatlistItemText: {
    fontSize: 20,
    // lineHeight: 22,
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
