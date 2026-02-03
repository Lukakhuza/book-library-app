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
              style={[
                styles.flatlistItem,
                {
                  paddingTop: properties.paddingTop,
                  paddingBottom: properties.paddingBottom,
                  paddingHorizontal: properties.horizontalPadding,
                  width: readerDimensions.width,
                  height: readerDimensions.height,
                },
              ]}
            >
              {itemData.item.map((line: string, index: number) => (
                <Text
                  key={index}
                  style={[
                    styles.flatlistItemText,
                    {
                      fontSize: properties.fontSize - 1,
                      lineHeight: properties.lineHeight,
                    },
                  ]}
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
  outerContainer: { backgroundColor: "#40e0d0" },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
  flatlistItem: { overflow: "hidden" },
  flatlistItemText: { textAlign: "auto" },
});
