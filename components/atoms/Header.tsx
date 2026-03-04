import { StyleSheet, Text, View, ViewStyle } from "react-native";
import {
  useFonts,
  GoogleSans_700Bold,
  GoogleSans_500Medium,
} from "@expo-google-fonts/google-sans";
import { OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Colors } from "../../constants/colors";

type Props = {
  text: string;
  customStyle?: ViewStyle;
  theme: any;
};

// const isFontLoaded = Font.isLoaded("Georgia");

export const Header = ({ text, customStyle, theme }: Props) => {
  const [fontsLoaded] = useFonts({
    GoogleSans_500Medium,
    GoogleSans_700Bold,
    OpenSans_600SemiBold,
  });

  return (
    <View style={[styles.headerContainer, customStyle]}>
      <Text style={[styles.headerText, { color: theme.colors.textPrimary }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontFamily: "OpenSans_700Bold",
  },
  headerContainer: {
    // marginTop: 20,
    // marginBottom: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
});
