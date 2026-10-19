import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookDetailsScreen from "../screens/BookDetails";
import ReaderScreen from "../screens/ReaderScreen";
import Tabs from "./Tabs";
import SignUpScreen from "../screens/SignUpScreen";

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false, animation: "fade_from_bottom" },
  screens: {
    Tabs: Tabs,
    SignUp: {
      screen: SignUpScreen,
      options: { headerShown: false },
    },
    BookDetails: {
      screen: BookDetailsScreen,
      options: { headerShown: false },
    },
    Reader: {
      screen: ReaderScreen,
      options: { headerShown: false },
    },
  },
});

export default RootStack;
