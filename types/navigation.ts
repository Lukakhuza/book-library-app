import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  StaticParamList,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStack from "../navigation/RootStack";
import { NavigatorScreenParams } from "@react-navigation/native";
import Tabs from "../navigation/Tabs";
import { Book } from "./book";

type RootStackParamList = {
  SignUp: undefined;
  BookDetails: { bookData: Book };
  Tabs:
    | NavigatorScreenParams<{
        Home: undefined;
        Discover: undefined;
        Settings: undefined;
      }>
    | undefined;
  Reader: undefined;
};

export type TabsParamList = StaticParamList<typeof Tabs>;

export type TabsNavigationProp = BottomTabNavigationProp<TabsParamList>;

export type RootStackProp = NativeStackNavigationProp<RootStackParamList>;

export type AppNavigationProp = CompositeNavigationProp<
  TabsNavigationProp,
  RootStackProp
>;
