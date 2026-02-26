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
      screen: DiscoverScreen,
      options: {
        title: "Discover",
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="book-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
      },
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

export default HomeStack;
