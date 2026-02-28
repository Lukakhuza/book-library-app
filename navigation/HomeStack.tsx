import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import DiscoverScreen from "../screens/Discover";
import SettingsScreen from "../screens/Settings";
import BookDetailsScreen from "../screens/BookDetails";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerStyle: { backgroundColor: "tomato" },
    headerTitleAlign: "center",
    headerShown: false,
    animation: "shift",
  },
  screens: {
    Home: {
      screen: HomeScreen,
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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
    },
    Settings: {
      screen: SettingsScreen,
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
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
    },
  },
});

export default HomeStack;
