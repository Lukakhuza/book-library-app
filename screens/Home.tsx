import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../store/ReaderContext";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { bookImageUri }: any = useContext(ReaderContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details");
        }}
      />
      {bookImageUri && (
        <Image
          source={{ uri: bookImageUri }}
          style={{ width: 200, height: 300 }}
          resizeMode="contain"
        />
      )}

      <Button
        title="Go to Reader"
        onPress={() => {
          navigation.navigate("Reader");
        }}
      />
    </View>
  );
};
export default HomeScreen;
