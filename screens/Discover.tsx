import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { ReaderContext } from "../store/ReaderContext";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";

const DiscoverScreen = () => {
  const navigation: any = useNavigation();
  const { books }: any = useContext(ReaderContext);

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={{ flex: 1, paddingHorizontal: 15 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore Books</Text>
      </View>
      <FlatList
        data={books}
        columnWrapperStyle={{ gap: 12, justifyContent: "flex-end" }}
        contentContainerStyle={{
          // flexGrow: 1,
          // justifyContent: "center",
          // alignItems: "center",
          // paddingHorizontal: 30,
          paddingTop: 20,
          paddingBottom: 15,
        }}
        renderItem={(book) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("BookDetails");
              }}
              style={{
                backgroundColor: "#4b4848ee",
                borderRadius: 20,
                flex: 1,
                width: "45%",
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
                  color: "white",
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
        numColumns={2}
      />
    </LinearGradient>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
