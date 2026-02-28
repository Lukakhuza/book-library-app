import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  GoogleSans_700Bold,
  GoogleSans_500Medium,
} from "@expo-google-fonts/google-sans";
import { OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
// import * as Font from "expo-font";
// // import { useFonts } from "expo-font";
import { Colors } from "../../constants/colors";

type Props = {
  text: string;
};

// const isFontLoaded = Font.isLoaded("Georgia");
// console.log("Georgia loaded:", fontsLoaded);

export const Header = ({ text }: Props) => {
  const [fontsLoaded] = useFonts({
    GoogleSans_500Medium,
    GoogleSans_700Bold,
    OpenSans_600SemiBold,
  });

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    color: Colors.dark.textPrimary,
    fontFamily: "OpenSans_700Bold",
  },
  headerContainer: {
    // marginTop: 20,
    // marginBottom: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
});
