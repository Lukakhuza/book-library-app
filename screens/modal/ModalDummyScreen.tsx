import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { AppNavigationProp } from "../../types/navigation";

const ModalDummyScreen = () => {
  const navigation: AppNavigationProp = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details again"
        onPress={() => {
          navigation.navigate("Discover");
        }}
      />
      <Button
        title="Update Title"
        onPress={() => {
          navigation.setOptions({ title: "Updated!" });
        }}
      />
      <Button
        title="Go to the first screen"
        onPress={() => {
          navigation.popToTop();
        }}
      />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default ModalDummyScreen;
