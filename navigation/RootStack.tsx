import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReaderScreen from "../screens/ReaderScreen";
import ModalDummyScreen from "../screens/modal/ModalDummyScreen";
import HomeStack from "../navigation/HomeStack";
import BookDetailsScreen from "../screens/BookDetails";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
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
          options: ({ navigation }) => ({
            // title: "Book Details",
            headerTitle: () => (
              <Ionicons
                name={"sunny-outline"}
                size={25}
                color={Colors.dark.accentPrimary}
              />
              // <Ionicons name="book-outline" size={22} color="#D4A96A" />
            ),
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: Colors.dark.bgScreen,
              elevation: 0,
            },
            headerShadowVisible: false,
            headerTintColor: Colors.dark.accentPrimary,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("App")}>
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={Colors.dark.accentPrimary}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Ionicons
                name="share-social-outline"
                size={24}
                color={Colors.dark.accentPrimary}
              />
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
