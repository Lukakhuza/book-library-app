import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";

const BookDetailsScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { bookImageUri }: any = useContext(ReaderContext);

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
      {/* <View style={styles.headerContainer}>
        <Text style={styles.header}>Book Details</Text>
      </View> */}
      <View style={styles.content}>
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <Text>Book Details Here</Text>
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
    justifyContent: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
  },
});
