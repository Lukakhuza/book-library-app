import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";

const LoadingScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();

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
      <Button
        title="Go to Reader"
        onPress={() => {
          navigation.navigate("Loading");
        }}
      />
    </View>
  );
};
export default LoadingScreen;
