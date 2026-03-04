import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReaderScreen from "../screens/ReaderScreen";
import ModalDummyScreen from "../screens/modal/ModalDummyScreen";
import HomeStack from "../navigation/HomeStack";
import BookDetailsScreen from "../screens/BookDetails";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Colors } from "../constants/colors";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    animation: "fade_from_bottom",
  },
  groups: {
    Home: {
      screens: {
        App: {
          screen: HomeStack,
          options: {
            headerShown: false,
          },
        },
        BookDetails: {
          screen: BookDetailsScreen,
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

export default RootStack;
