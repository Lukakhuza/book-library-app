import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import LoadingOverlay from "../util/LoadingOverlay";
import { getDimensions, paginateText, wait } from "../util/helperFunctions";
import { getBook } from "../util/helperFunctions";
import { ReaderContext } from "../store/ReaderContext";

const Reader = ({ signedUrl }: { signedUrl: string }) => {
  // Screen dimensions, to be set via onScreenLayout before the screen is painted:
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });

  const [pages, setPages]: any = useState([]);

  // Store screen dimensions in screenDimensions state.
  useLayoutEffect(() => {
    const { width, height } = Dimensions.get("screen");
    setScreenDimensions({
      height: height,
      width: width,
    });
  }, []);

  const textLayoutsRef = useRef<any>([]);

  // Text Layouts:
  const [textLayouts, setTextLayouts]: any = useState(null);

  // Reader Dimensions:
  const [readerDimensions, setReaderDimensions] = useState({
    height: 0,
    width: 0,
  });

  // Current Chapter:
  const [chapter, setChapter]: any = useState({
    title: "",
    body: [],
  });

  // Checklist to make sure everything is ready before pagination logic is run:
  const layoutReadyRef = useRef({
    container: false,
    textLayout: false,
    contentSize: false,
    fonts: true,
  });

  // Text Properties:
  const [properties, setProperties] = useState({
    paddingTop: 17.23809814,
    paddingBottom: 0,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  });

  const availableHeight =
    readerDimensions.height -
    (properties.paddingTop + properties.paddingBottom);
  const MAX_LINES_PER_PAGE = Math.floor(
    availableHeight / properties.lineHeight
  );
  const PAGE_HEIGHT = MAX_LINES_PER_PAGE * properties.lineHeight;

  const contentSizeRef = useRef({
    width: 0,
    height: 0,
  });

  const containerWidthRef = useRef(0);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const didPaginateRef = useRef(false);

  // Load the chapter based on the file signedUrl provided in props.
  useEffect(() => {
    const load = async () => {
      const book = await getBook(signedUrl);
      const newBook = book?.body;
      setChapter({
        title: book?.title,
        body: newBook,
      });
    };
    load();
  }, [signedUrl]);

  const checkLayoutReady = () => {
    if (!didPaginateRef) return;

    const ready = Object.values(layoutReadyRef.current).every(Boolean);

    if (!ready) return;
    didPaginateRef.current = true;

    const pages = paginateText(textLayouts, readerDimensions, properties);
    setPages(pages);
  };

  useEffect(() => {
    if (!textLayouts) return;
    layoutReadyRef.current.contentSize = true;
    checkLayoutReady();
  }, [textLayouts]);

  if (pages.length > 0) {
    return (
      <View>
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
                  backgroundColor: "turqouise",
                }}
              >
                <Text
                  style={{
                    fontSize: properties.fontSize,
                    lineHeight: properties.lineHeight,
                    color: "black",
                    includeFontPadding: true,
                    backgroundColor: "yellow",
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
      </View>
    );
  }
  let text = "";
  for (let i = 0; i < chapter.body.length; i++) {
    text += chapter.body[i];
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#40E0D0" }}>
      <View>
        <Text style={styles.title}>{chapter.title}</Text>
        <FlatList
          data={chapter.body}
          style={{
            opacity: 1,
          }}
          onContentSizeChange={(w, h) => {
            if (w < screenDimensions.width * 0.9) {
              return;
            }
            contentSizeRef.current.width = w;
            contentSizeRef.current.height = h;
            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
              if (textLayoutsRef.current.length === 0) return;

              setTextLayouts(textLayoutsRef);
            }, 200);
          }}
          onLayout={(e) => {
            const { height, width } = e.nativeEvent.layout;
            if (height < 100 || width < 100) {
              return;
            }
            containerWidthRef.current = e.nativeEvent.layout.width;
            setReaderDimensions({
              width: width,
              height: height,
            });
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
                  backgroundColor: "turqouise",
                }}
              >
                <Text
                  style={{
                    fontSize: properties.fontSize,
                    lineHeight: properties.lineHeight,
                    color: "black",
                    includeFontPadding: true,
                    backgroundColor: "yellow",
                    textAlign: "right",
                  }}
                  onTextLayout={(e) => {
                    if (containerWidthRef.current < 200) return;
                    textLayoutsRef.current[itemData.index] =
                      e.nativeEvent.lines;
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
      </View>
    </View>
  );
};

export default Reader;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
});
