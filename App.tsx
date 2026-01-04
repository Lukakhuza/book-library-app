import { View, Text, useColorScheme } from "react-native";
import {
  createStaticNavigation,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import DiscoverScreen from "./screens/Discover";
import ReaderContextProvider from "./store/ReaderContext";
import ReaderScreen from "./screens/Reader";
import SettingsScreen from "./screens/Settings";
import ModalDummyScreen from "./screens/modal/ModalDummyScreen";
import HomeStack from "./navigation/HomeStack";
import { Ionicons } from "@expo/vector-icons";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(140, 201, 125)",
    primary: "rgba(10, 13, 222, 1)",
    card: "rgb(120,120,120)",
  },
};

const RootStack = createNativeStackNavigator({
  groups: {
    Home: {
      screens: {
        App: {
          screen: HomeStack,
          options: {
            headerShown: false,
          },
        },
        Reader: {
          screen: ReaderScreen,
          options: {
            headerShown: false,
          },
        },
      },
    },
    Modal: {
      screenOptions: {
        presentation: "modal",
      },
      screens: {
        MyModal: ModalDummyScreen,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const scheme = useColorScheme();
  return (
    <ReaderContextProvider>
      <Navigation theme={scheme === "dark" ? DarkTheme : MyTheme} />
    </ReaderContextProvider>
  );
}
