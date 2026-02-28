import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Container } from "../components/atoms/Container";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { Colors } from "../constants/Colors";
import { HomeStackNavigationProp } from "../types/navigation";
import { Header } from "../components/atoms/Header";

const SettingsScreen = () => {
  const navigation: HomeStackNavigationProp = useNavigation();

  return (
    <Container>
      <Header text="Settings" />
      <Ionicons name="home-outline" size={20} color="blue" />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </Container>
  );
};

export default SettingsScreen;
