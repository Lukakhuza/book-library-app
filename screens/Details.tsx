import { FlatList, Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { ReaderContext } from "../store/ReaderContext";
import { useContext } from "react";

const DetailsScreen = () => {
  const navigation: any = useNavigation();
  const { books }: any = useContext(ReaderContext);

  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <FlatList
        data={books}
        columnWrapperStyle={{ gap: 12, justifyContent: "flex-end" }}
        contentContainerStyle={{
          // flexGrow: 1,
          // justifyContent: "center",
          // alignItems: "center",
          // paddingHorizontal: 30,
          paddingTop: 40,
          paddingBottom: 15,
        }}
        renderItem={(book) => {
          return (
            <View
              style={{
                backgroundColor: "gray",
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
                style={{ textAlign: "center", color: "white", fontWeight: 500 }}
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
            </View>
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default DetailsScreen;
