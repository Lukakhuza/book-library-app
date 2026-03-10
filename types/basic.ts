import { type ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

export type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
