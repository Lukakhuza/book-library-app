import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ReaderContext } from "../../store/ReaderContext";
import { Colors } from "../../constants/Colors";

const ReaderReadingPhase = () => {
  const {
    chapter,
    pages,
    properties: properties,
    readerDimensions,
  }: any = useContext(ReaderContext);

  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          flex: 1,
          // borderWidth: 3,
          // borderColor: "orange",
          marginVertical: 30,
          // marginHorizontal: 20,
        }}
      >
        {pages && (
          <FlatList
            data={pages}
            style={styles.flatlist}
            onContentSizeChange={(w, h) => {
              // if (
              //   w < screenDimensions.width * 0.9 ||
              //   readerDimensions.width < 100 ||
              //   readerDimensions.height < 100
              // ) {
              //   return;
              // }
              // contentSizeRef.current.width = w;
              // contentSizeRef.current.height = h;
              // if (debounceRef.current) {
              //   clearTimeout(debounceRef.current);
              // }
              // debounceRef.current = setTimeout(() => {
              //   if (textLayoutsRef?.current?.length === 0) return;
              //   updateTextLayouts(textLayoutsRef);
              // }, 200);
            }}
            onLayout={(e) => {
              const { height, width } = e.nativeEvent.layout;
              // if (height < 100 || width < 100) {
              //   return;
              // }
              // updateReaderDimensions(width, height);
              // layoutReadyRef.current.container = true;
              // checkLayoutReady();
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={(itemData) => {
              // console.log(itemData.item[0]);
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
                  {itemData.item.map((textItem) => {
                    // console.log(textItem.text);
                    return (
                      <View
                        style={
                          {
                            // flex: 1,
                            // borderWidth: 1,
                            // borderColor: "black",
                          }
                        }
                      >
                        <Text
                          style={[
                            styles.flatlistItemText,
                            {
                              fontSize: properties.fontSize,
                              lineHeight: properties.lineHeight,
                            },
                            styles[textItem.tag],
                          ]}
                        >
                          {textItem.text}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            }}
            scrollEnabled={true}
            removeClippedSubviews={false}
            // initialNumToRender={pages?.length ?? 0}
            // maxToRenderPerBatch={pages?.length ?? 0}
            initialNumToRender={35}
            maxToRenderPerBatch={35}
            windowSize={100}
          />
        )}
      </View>
    </View>
  );
};

export default ReaderReadingPhase;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#40e0d0",
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
    width: 411,
    textAlign: "justify",
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
