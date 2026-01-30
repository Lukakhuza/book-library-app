import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useContext, useCallback } from "react";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("screen");
  const { myBooks }: any = useContext(ReaderContext);

  useFocusEffect(
    useCallback(() => {
      // Refresh myBooks
    }, [myBooks])
  );

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
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
          }}
        >
          <FlatList
            data={myBooks}
            contentContainerStyle={{
              alignItems: "center",
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
                    borderRadius: 20,
                    width: width * 0.5,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 10,
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
