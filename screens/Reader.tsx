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
import ReaderMeasurementPhase from "../components/organisms/ReaderMeasurementPhase";
import ReaderReadingPhase from "../components/organisms/ReaderReadingPhase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useNavigation,
  createStaticNavigation,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";

const ReaderScreen = ({ route }: any) => {
  const { readerIsReady }: any = useContext(ReaderContext);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { chapterData } = route.params;

  const data = {
    bookTitle: chapterData?.html?.head?.title,
    tableOfContentsHeader: chapterData?.html?.body?.div?.div?.["#text"],
    content: chapterData?.html?.body?.div?.nav?.ol,
    opfPath: chapterData.opfPath,
    epubFile: chapterData.epubFile,
    spineHrefs: chapterData.spineHrefs,
    xhtmlString: chapterData.xhtmlString,
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {readerIsReady ? (
        <ReaderReadingPhase />
      ) : (
        <ReaderMeasurementPhase data={data} />
      )}
      {/* <ReaderMeasurementPhase /> */}
    </View>
  );
};

export default ReaderScreen;
