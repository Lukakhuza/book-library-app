import { View, Text, useColorScheme } from "react-native";
import {
  createStaticNavigation,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import ReaderContextProvider from "./store/ReaderContext";
import ReaderScreen from "./screens/Reader";

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
  initialRouteName: "Home",
  screenOptions: {
    headerStyle: { backgroundColor: "tomato" },
    headerTitleAlign: "center",
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { title: "Overview" },
    },
    Details: {
      screen: DetailsScreen,
      options: {
        headerRight: () => {
          return (
            <View>
              <Text>Info</Text>
            </View>
          );
        },
      },
    },
    Reader: {
      screen: ReaderScreen,
      options: {
        headerShown: false,
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
