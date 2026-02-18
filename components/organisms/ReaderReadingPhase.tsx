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

  // console.log(pages[0]?.[1]?.text.length);

  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          flex: 1,
          // borderWidth: 3,
          // borderColor: "orange",
          // marginVertical: 30,
          // marginHorizontal: 20,
        }}
      >
        {pages && (
          <FlatList
            data={pages}
            style={styles.flatlist}
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
                      paddingTop: properties.paddingTop,
                      paddingBottom: properties.paddingBottom,
                      paddingHorizontal: properties.horizontalPadding,
                      width: readerDimensions.width,
                      height: readerDimensions.height,
                    },
                  ]}
                >
                  {itemData.item.map((textItem) => {
                    // console.log(properties[textItem.tag]);
                    // console.log(properties[itemData.item.tag]);
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
                            properties[textItem.tag],
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
            initialNumToRender={pages?.length ?? 0}
            maxToRenderPerBatch={pages?.length ?? 0}
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
    // backgroundColor: "#40e0d0",
  },
  title: {
    // textAlign: "center",
    // fontSize: 20,
    // fontWeight: 600,
  },
  flatlist: {
    // opacity: 0,
  },
  flatlistItem: {
    overflow: "hidden",
    // justifyContent: "space-evenly",
  },
  loadingOverlayContainer: {
    // backgroundColor: "#0dcadb",
    // position: "absolute",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  h1: {
    // color: "blue", fontSize: 40
  },
  h3: { color: "orange" },
  a: { color: "brown" },
});
