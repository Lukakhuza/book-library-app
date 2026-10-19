import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/colors";
import DiscoverScreen from "../screens/Discover";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import { useIsAuthenticated, useIsSignedOut } from "../store/AuthContext";
import LoginScreen from "../screens/LoginScreen";

const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    headerShown: false,
    animation: "shift",
    tabBarStyle: {
      backgroundColor: Colors.dark.bgScreen,
      borderTopColor: Colors.dark.bgChip,
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      if: useIsAuthenticated,
      options: {
        title: "Home",
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
    Login: {
      screen: LoginScreen,
      if: useIsSignedOut,
      options: {
        title: "Log In",
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons
              name={focused ? "enter" : "enter-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
    Discover: {
      screen: DiscoverScreen,
      options: {
        title: "Discover",
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
    Settings: {
      screen: SettingsScreen,
      if: useIsAuthenticated,
      options: {
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
  },
});

export default Tabs;
