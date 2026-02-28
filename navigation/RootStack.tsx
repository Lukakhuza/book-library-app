import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReaderScreen from "../screens/ReaderScreen";
import ModalDummyScreen from "../screens/modal/ModalDummyScreen";
import HomeStack from "../navigation/HomeStack";
import BookDetailsScreen from "../screens/BookDetails";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

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
          options: ({ navigation }) => ({
            title: "Book Details",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("App")}>
                <Ionicons name="home-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }),
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
