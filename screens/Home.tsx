import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useContext, useEffect } from "react";
import { ReaderContext } from "../store/ReaderContext";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const { bookImageUri }: any = useContext(ReaderContext);

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
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
        title="Discover"
        onPress={() => {
          navigation.navigate("Discover");
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
    </LinearGradient>
  );
};
export default HomeScreen;
