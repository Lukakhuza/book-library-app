import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";
import { Directory, File, Paths } from "expo-file-system";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("screen");
  const { bookImageUri, myBooks }: any = useContext(ReaderContext);

  console.log(myBooks);

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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Books</Text>
      </View>
      {myBooks.length === 0 && (
        <View style={styles.content}>
          <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
            <Text style={styles.noBooksText}>You currently have no books.</Text>
            <Text style={styles.noBooksText}>Click below to explore:</Text>
          </View>
          <Button
            title="Discover"
            onPress={() => {
              navigation.navigate("Discover");
            }}
          />
        </View>
      )}
      {myBooks.length > 0 && (
        <View
          style={{
            flex: 1,
            // alignItems: "center",
            // borderColor: "brown",
            // borderWidth: 3,
          }}
        >
          <FlatList
            data={myBooks}
            // columnWrapperStyle={{ gap: 12, justifyContent: "flex-end" }}
            contentContainerStyle={{
              alignItems: "center",
              // flexGrow: 1,
              flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
              // borderColor: "red",
              // borderWidth: 10,
              // paddingHorizontal: 30,
              paddingTop: 20,
              paddingBottom: 15,
            }}
            renderItem={(book) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("BookDetails", { bookData: book.item });
                  }}
                  style={{
                    backgroundColor: "lightblue",
                    // borderColor: "blue",
                    // borderWidth: 3,
                    borderRadius: 20,
                    // flex: 1,
                    width: width * 0.5,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                    // marginVertical: 10,
                    paddingHorizontal: 8,
                  }}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={{
                      textAlign: "center",
                      color: "Gray",
                      fontWeight: 500,
                    }}
                  >
                    {book.item.title}
                  </Text>
                  <Image
                    source={{
                      uri: `https://books-library-app.s3.eu-north-1.amazonaws.com/${book.item.coverKey}`,
                    }}
                    style={{ width: 90, height: 135, marginTop: 10 }}
                    resizeMode="cover"
                  />
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </LinearGradient>
  );
};
export default HomeScreen;

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
