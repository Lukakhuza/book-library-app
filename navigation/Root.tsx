import { Dimensions, StyleSheet, Text, View } from "react-native";
import { fetchBookSignedUrl } from "../api/book.api";
import { useContext, useEffect, useState } from "react";
import Reader from "../screens/Reader";
import ReaderContextProvider, { ReaderContext } from "../store/ReaderContext";
import LoadingOverlay from "../util/LoadingOverlay";
import Home from "../screens/Home";

const Root = () => {
  return <View style={styles.container}></View>;
};

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
