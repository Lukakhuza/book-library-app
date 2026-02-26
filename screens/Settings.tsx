import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { Colors } from "../constants/Colors";
import { HomeStackNavigationProp } from "../types/navigation";

const SettingsScreen = () => {
  const navigation: HomeStackNavigationProp = useNavigation();

  return (
    <LinearGradient
      colors={["#d3d86cf5", "#f85454ff"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Settings Screen</Text>
      <Ionicons name="home-outline" size={20} color="blue" />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </LinearGradient>
  );
};

export default SettingsScreen;
