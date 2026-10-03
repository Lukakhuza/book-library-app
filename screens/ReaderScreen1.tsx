import { Reader } from "@epubjs-react-native/core";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { LibraryContext } from "../store/LibraryContext";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";

const ReaderScreen = () => {
  const { screenDimensions } = useContext(LibraryContext);
  console.log(useFileSystem);

  return (
    <View>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        fileSystem={useFileSystem}
        width={"100%"}
        height={700}
      />
    </View>
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center" as const,
    fontSize: 20,
    fontWeight: "600" as const,
  },
  flatlistItem: {
    overflow: "hidden",
  },
  flatlistItemText: {
    fontSize: 20,
    includeFontPadding: false, // 🔑
  },
});

// const tagStyles: Record<Tag, TextStyle> = StyleSheet.create({});
