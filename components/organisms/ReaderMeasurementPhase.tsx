import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../../store/ReaderContext";
import LoadingOverlay from "../../util/LoadingOverlay";
import { parseHTML } from "linkedom";
import { asArray, getTextDeep, mapContent } from "../../util/helperFunctions";
import { XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { resolveHref } from "../../util/helperFunctions";
import { ScrollView } from "react-native";
import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";

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

  const listItems = asArray(data?.data?.content?.li);

  const {
    data: { opfPath, epubFile, html, xhtmlString },
  } = data;

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.title}>{data.data.bookTitle}</Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginVertical: 10,
        }}
      >
        {data.data.tableOfContentsHeader}
      </Text>
      <FlatList
        data={listItems}
        style={{ marginBottom: 50 }}
        renderItem={(item) => {
          const hasSubchapters = asArray(item?.item?.ol?.li.length).length > 0;
          return (
            <Pressable
              onPress={async () => {
                const encoded = await epubFile.base64();
                const zip = await JSZip.loadAsync(encoded, { base64: true });
                const xhtmlPath = resolveHref(opfPath, "index.xhtml");
                const xhtmlString: any = await zip
                  .file(xhtmlPath)
                  ?.async("string");

                const doc = parseDocument(xhtmlString, { xmlMode: true });
                const allText: any = DomUtils.findAll(
                  (el) =>
                    el.type === "tag" &&
                    (el.name === "p" ||
                      el.name === "h1" ||
                      el.name === "h2" ||
                      el.name === "h3" ||
                      el.name === "a"),
                  doc.children
                );

                const textsArray = allText.map((el) => ({
                  tag: el.name,
                  text: DomUtils.textContent(el).trim(),
                  meta: el.attribs ?? {},
                }));
                textsArray.forEach((item) => {
                  console.log(item.tag, item.text);
                });
                // console.log(
                //   allText.map((t) => {
                //     DomUtils.textContent(t);
                //   })
                // );

                // const h1s = DomUtils.textContent(h1);
                // console.log(h1s);
                // const text = DomUtils.textContent(h3);
                // const cleaned = xhtmlString
                //   .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
                //   .replace(/<!DOCTYPE[\s\S]*?>\s*/i, "")
                //   .trim();
                // const parser = new XMLParser({
                //   ignoreAttributes: false,
                //   trimValues: true,
                // });
                // const obj = parser.parse(cleaned);
                // console.log("HERE", obj.html.body.div.div.div.div.div);
                // const result = document?.querySelector("h1.title")?.textContent;
                // console.log(result);
                // console.log(
                //   "Test 6",
                //   obj?.html?.body.div.div.div.div[2].div.div.h3.span
                // );
                // console.log("Test 6", obj?.html?.body.div.div.div.div[2].div.p);
                // const data = getTextDeep(obj?.html?.body.div.div.div);
                // console.log(data);
                // console.log(data);
                // console.log(obj?.html?.head?.title);
                // console.log("ქართული");
                // console.log(
                //   obj?.html?.body.div.div.div.div?.[0]?.h1?.["#text"]
                // );
                // console.log(
                //   obj?.html?.body.div.div.div.div?.[1]?.h2?.["#text"]
                // );
                // console.log(
                //   obj?.html?.body.div.div.div.div?.[2].div?.div?.h3?.span[0][
                //     "#text"
                //   ],
                //   obj?.html?.body.div.div.div.div?.[2].div?.div?.h3?.span[1][
                //     "#text"
                //   ]
                // );
                // console.log(
                //   obj?.html?.body.div.div.div.div?.[2].div.p.span[0]["#text"],
                //   ":",
                //   obj?.html?.body.div.div.div.div?.[2].div.p.span[1]["#text"]
                // );
                // console.log(obj?.html?.body.div.div.div.div?.[3]?.p["#text"]);
                // console.log(obj?.html?.body.div.div.div.div?.[4].div.p[0]);
                // console.log(obj?.html?.body.div.div.div.div?.[4].div.p[1]);
                // const file = zip.file(path);
                // const content = await file?.async("string");
                // const zipObjects = Object.keys(zip.files);
                // const content: any = await zip
                //   .file("bk01-toc.xhtml")
                //   ?.async("text");
                // const { document } = parseHTML(content);
                // const body1: any = document?.querySelectorAll("p");
                // console.log(document);
                // console.log(body1);
                // console.log(zipObjects);
                // console.log(xhtmlPath);
              }}
              style={{ marginLeft: 30, marginVertical: 5 }}
            >
              <Text>{item.item.a["#text"]}</Text>
              {hasSubchapters &&
                item?.item?.ol?.li.map((sub: any, idx: any) => {
                  return (
                    <Pressable
                      key={idx}
                      style={{ marginLeft: 15 }}
                      onPress={() => {
                        // const xhtmlPath = resolveHref(
                        //   opfPath,
                        //   sub?.a?.["@_href"]
                        // );
                        // console.log(xhtmlPath);
                      }}
                    >
                      <Text>{sub?.a?.["#text"]}</Text>
                    </Pressable>
                  );
                })}
            </Pressable>
          );
        }}
      />
    </View>
  );
  // (
  // <View style={styles.outerContainer}>
  //   <Text style={styles.title}>{chapter.title}</Text>
  //   <FlatList
  //     data={chapter.body}
  //     style={styles.flatlist}
  //     onContentSizeChange={(w, h) => {
  //       if (
  //         w < screenDimensions.width * 0.9 ||
  //         readerDimensions.width < 100 ||
  //         readerDimensions.height < 100
  //       ) {
  //         return;
  //       }
  //       contentSizeRef.current.width = w;
  //       contentSizeRef.current.height = h;

  //       if (debounceRef.current) {
  //         clearTimeout(debounceRef.current);
  //       }
  //       debounceRef.current = setTimeout(() => {
  //         if (textLayoutsRef.current.length === 0) return;
  //         updateTextLayouts(textLayoutsRef);
  //       }, 200);
  //     }}
  //     onLayout={(e) => {
  //       const { height, width } = e.nativeEvent.layout;
  //       if (height < 100 || width < 100) {
  //         return;
  //       }
  //       updateReaderDimensions(width, height);
  //       layoutReadyRef.current.container = true;
  //       checkLayoutReady();
  //     }}
  //     horizontal
  //     pagingEnabled
  //     showsHorizontalScrollIndicator={false}
  //     keyExtractor={(_, i) => i.toString()}
  //     renderItem={(itemData) => {
  //       return (
  //         <View
  //           style={[
  //             styles.flatlistItem,
  //             {
  //               paddingTop: properties.paddingTop,
  //               paddingBottom: properties.paddingBottom,
  //               paddingHorizontal: properties.horizontalPadding,
  //               width: readerDimensions.width,
  //               height: readerDimensions.height,
  //             },
  //           ]}
  //         >
  //           <Text
  //             style={[
  //               styles.flatlistItemText,
  //               {
  //                 fontSize: properties.fontSize,
  //                 lineHeight: properties.lineHeight,
  //               },
  //             ]}
  //             onTextLayout={(e) => {
  //               if (
  //                 readerDimensions.width < 200 ||
  //                 readerDimensions.height < 200
  //               )
  //                 return;
  //               textLayoutsRef.current[itemData.index] = e.nativeEvent.lines;
  //               if (textLayoutsRef.current.length !== chapter.body.length)
  //                 return;
  //               layoutReadyRef.current.textLayout = true;
  //               checkLayoutReady();
  //             }}
  //           >
  //             {itemData.item}
  //           </Text>
  //         </View>
  //       );
  //     }}
  //     scrollEnabled={true}
  //     removeClippedSubviews={false}
  //     initialNumToRender={chapter.body.length}
  //     maxToRenderPerBatch={chapter.body.length}
  //     windowSize={100}
  //   />
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
    opacity: 0,
  },
  flatlistItem: {
    overflow: "hidden",
  },
  flatlistItemText: { color: "black", includeFontPadding: true },
  loadingOverlayContainer: {
    backgroundColor: "#0dcadb",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
