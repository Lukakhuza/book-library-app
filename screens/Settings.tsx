import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Ionicons name="home-outline" size={20} color="blue" />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("App", { screen: "Home" });
        }}
      />
    </View>
  );
};

export default SettingsScreen;
