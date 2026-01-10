import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";
import { downloadBook } from "../services/bookServices";

const BookDetailsScreen = ({ route }: any) => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { bookImageUri }: any = useContext(ReaderContext);

  const { bookData } = route.params;

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={{
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.content}>
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <Image
            source={{
              uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${bookData.coverKey}`,
            }}
            style={{ width: 270, height: 405, marginTop: 10 }}
            resizeMode="cover"
          />
          <View style={styles.bookInfo}>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Title:</Text>
              <Text numberOfLines={2}>{bookData.title}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Author:</Text>
              <Text numberOfLines={2}>{bookData.author}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Language:</Text>
              <Text>{bookData.language}</Text>
            </View>
            <View style={styles.bookInfoLine}>
              <Text style={styles.label}>Published:</Text>
              <Text>{bookData.publishedYear}</Text>
            </View>
          </View>
          <Pressable
            style={styles.downloadButton}
            onPress={() => {
              downloadBook(bookData);
            }}
          >
            <Text style={styles.downloadButtonText}>Download</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};
export default BookDetailsScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
  },
  label: {
    fontWeight: 900,
    marginRight: 25,
  },
  bookInfo: {
    marginTop: 15,
    marginHorizontal: 3,
  },
  bookInfoLine: {
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  downloadButton: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: "brown",
    borderRadius: 15,
    backgroundColor: "lightgray",
  },
  downloadButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    marginVertical: 7,
  },
});
