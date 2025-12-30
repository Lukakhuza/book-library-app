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

const Reader = () => {
  const { readerIsReady }: any = useContext(ReaderContext);

  return (
    <View style={styles.container}>
      {readerIsReady ? <ReaderReadingPhase /> : <ReaderMeasurementPhase />}
    </View>
  );
};

export default Reader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
