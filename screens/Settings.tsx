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
import { Colors } from "../constants/colors";
import { useTheme } from "../store/ThemeContext";

const SettingsScreen = () => {
  const navigation: HomeStackNavigationProp = useNavigation();
  const { theme } = useTheme();

  return (
    <Container>
      <Header text="Settings" theme={theme} />
      <Button
        title="Go Home"
        color={theme.colors.bgCard}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </Container>
  );
};

export default SettingsScreen;
