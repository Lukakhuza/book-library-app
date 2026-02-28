import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { LibraryContext } from "../../store/LibraryContext";
import { Props } from "../../types/basic";
import { Colors } from "../../constants/colors";

console.log(Colors);

export const Container = ({ children }: Props) => {
  const { safeAreaInsets: insets } = useContext(LibraryContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#242018",
        paddingHorizontal: 23,
        paddingTop: insets.top,
      }}
    >
      {children}
    </View>
  );
};
