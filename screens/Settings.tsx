// import { useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Container } from "../components/atoms/Container";
// import { Colors } from "../constants/Colors";
import { Header } from "../components/atoms/Header";
import { useTheme } from "../store/ThemeContext";
import { HomeStackNavigationProp } from "../types/navigation";

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
