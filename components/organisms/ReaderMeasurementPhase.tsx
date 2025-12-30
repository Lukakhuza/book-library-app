import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext } from "react";
import { ReaderContext } from "../../store/ReaderContext";
import { useRef } from "react";
import { paginateText } from "../../util/helperFunctions";
import LoadingOverlay from "../../util/LoadingOverlay";

const ReaderMeasurementPhase = () => {
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.title}>{chapter.title}</Text>
      <FlatList
        data={chapter.body}
        style={{
          opacity: 0,
        }}
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
            if (textLayoutsRef.current.length === 0) return;
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
            <View
              style={{
                paddingTop: properties.paddingTop,
                paddingBottom: properties.paddingBottom,
                paddingHorizontal: properties.horizontalPadding,
                width: readerDimensions.width,
                height: readerDimensions.height,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  fontSize: properties.fontSize,
                  lineHeight: properties.lineHeight,
                  color: "black",
                  includeFontPadding: true,
                }}
                onTextLayout={(e) => {
                  if (
                    readerDimensions.width < 200 ||
                    readerDimensions.height < 200
                  )
                    return;
                  textLayoutsRef.current[itemData.index] = e.nativeEvent.lines;
                  if (textLayoutsRef.current.length !== chapter.body.length)
                    return;
                  layoutReadyRef.current.textLayout = true;
                  checkLayoutReady();
                }}
              >
                {itemData.item}
              </Text>
            </View>
          );
        }}
        scrollEnabled={true}
        removeClippedSubviews={false}
        initialNumToRender={chapter.body.length}
        maxToRenderPerBatch={chapter.body.length}
        windowSize={100}
      />
      <View
        style={{
          backgroundColor: "#0dcadb",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <LoadingOverlay message="Loading..." />
      </View>
    </View>
  );
};

export default ReaderMeasurementPhase;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
});
