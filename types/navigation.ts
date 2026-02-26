import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Book } from "./readerContextTypes";

export type RootStackParamList = {
  App: undefined;
  BookDetails: { bookData: Book };
  Reader: { chapterData: string };
  MyModal: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Discover: undefined;
  Settings: undefined;
};

export type HomeStackNavigationProp =
  BottomTabNavigationProp<HomeStackParamList>;

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type AppNavigationProp = CompositeNavigationProp<
  HomeStackNavigationProp,
  RootNavigationProp
>;
