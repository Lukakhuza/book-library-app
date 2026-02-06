import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
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
import { paginateText } from "../../services/bookServices";

const ReaderMeasurementPhase = (data: any) => {
  const {
    chapter,
    pages,
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
  const textColors = {
    p: "red",
    h1: "blue",
    h2: "green",
    quote: "purple",
  };
  // const listItems = asArray(data?.data?.content?.li);

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
      setTextsArray(textsArray);
    };
    load();
  }, []);

  useEffect(() => {
    if (!textLayoutsRef) {
      return;
    }

    // console.log(textLayoutsRef?.current[0]);
    // console.log(textLayoutsRef?.current[1][0]);
    // console.log("Screen: ", screenDimensions);
    // paginateText(readerDimensions, textLayoutsRef, properties);
  }, [textLayoutsRef]);

  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          flex: 1,
          // borderWidth: 3,
          // borderColor: "orange",
          marginVertical: 30,
        }}
      >
        <FlatList
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
              // console.log(textLayoutsRef?.current.length);
              if (textLayoutsRef?.current?.length === 0) return;
              // console.log(textLayoutsRef);
              console.log(readerDimensions);
              updateTextLayouts(textLayoutsRef);
            }, 200);
          }}
          onLayout={(e) => {
            const { height, width } = e.nativeEvent.layout;
            if (height < 100 || width < 100) {
              return;
            }
            console.log("Reader Dimensions", height, width);
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
              <View
                key={itemData.index}
                style={[
                  styles.flatlistItem,
                  {
                    // paddingTop: properties.paddingTop,
                    // paddingBottom: properties.paddingBottom,
                    // paddingHorizontal: properties.horizontalPadding,
                    width: readerDimensions.width,
                    height: readerDimensions.height,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.flatlistItemText,
                    {
                      fontSize: properties.fontSize,
                      lineHeight: properties.lineHeight,
                    },
                    styles[itemData.item.tag],
                  ]}
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
                    // console.log(textLayoutsRef.current[0], itemData.item.tag);
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
        />
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
  },
  flatlistItem: {
    overflow: "hidden",
  },
  flatlistItemText: {
    color: "black",
    includeFontPadding: true,
    paddingHorizontal: 10,
  },
  loadingOverlayContainer: {
    backgroundColor: "#0dcadb",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  h1: { color: "blue", fontSize: 40 },
  h2: {
    color: "red",
    fontSize: 25,
    // backgroundColor: "blue",
    lineHeight: 30, // make line height dynamic, so that it is about 1.2 times or 1.3 times the font size.
    textAlign: "center",
  },
  h3: { color: "orange" },
  a: { color: "brown" },
  p: { color: "purple" },
});
