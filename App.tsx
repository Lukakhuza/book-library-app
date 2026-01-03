import { View, Text, useColorScheme } from "react-native";
import {
  createStaticNavigation,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import ReaderContextProvider from "./store/ReaderContext";
import ReaderScreen from "./screens/Reader";
import SettingsScreen from "./screens/Settings";
import ModalDummyScreen from "./screens/modal/ModalDummyScreen";
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

const HomeStack = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerStyle: { backgroundColor: "tomato" },
    headerTitleAlign: "center",
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Home",
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="home-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
    },
    Discover: {
      screen: DetailsScreen,
      options: {
        title: "Discover",
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="book-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
      // tabBarIcon: <Ionicons name="home-outline" size={10} color="blue" />,
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="settings-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
    },
  },
});

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
