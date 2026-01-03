import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";

const ModalDummyScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details again"
        onPress={() => {
          navigation.navigate("Details");
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
          navigation.popTo("Home");
        }}
      />
    </View>
  );
};

export default ModalDummyScreen;
