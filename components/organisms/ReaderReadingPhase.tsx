import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ReaderContext } from "../../store/ReaderContext";

const ReaderReadingPhase = () => {
  const {
    chapter,
    pages,
    properties: properties,
    readerDimensions,
  }: any = useContext(ReaderContext);

  return (
    <View style={{ backgroundColor: "#40e0d0" }}>
      <Text style={styles.title}>{chapter.title}</Text>
      <FlatList
        data={pages}
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
              {itemData.item.map((line: string, index: number) => (
                <Text
                  key={index}
                  style={{
                    fontSize: properties.fontSize - 1,
                    lineHeight: properties.lineHeight,
                    textAlign: "auto",
                  }}
                >
                  {line}
                </Text>
              ))}
            </View>
          );
        }}
        scrollEnabled={true}
        removeClippedSubviews={false}
        initialNumToRender={chapter.body.length}
        maxToRenderPerBatch={chapter.body.length}
        windowSize={100}
      />
    </View>
  );
};

export default ReaderReadingPhase;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
});
