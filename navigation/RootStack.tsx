import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReaderScreen from "../screens/ReaderScreen";
import ModalDummyScreen from "../screens/modal/ModalDummyScreen";
import HomeStack from "../navigation/HomeStack";
import BookDetailsScreen from "../screens/BookDetails";

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
        BookDetails: {
          screen: BookDetailsScreen,
          options: {
            title: "Book Details",
            headerTitleAlign: "center",
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
