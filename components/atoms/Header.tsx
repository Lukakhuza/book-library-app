import {
  GoogleSans_500Medium,
  GoogleSans_700Bold,
  useFonts,
} from "@expo-google-fonts/google-sans";
import { OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type Props = {
  text: string;
  customStyle?: ViewStyle;
  theme: Theme;
};

// const isFontLoaded = Font.isLoaded("Georgia");

export const Header = ({ text, customStyle, theme }: Props) => {
  const { fs } = useScale();
  const [fontsLoaded] = useFonts({
    GoogleSans_500Medium,
    GoogleSans_700Bold,
    OpenSans_600SemiBold,
  });

  return (
    <View style={[styles.headerContainer, customStyle]}>
      <Text
        style={[
          styles.headerText,
          {
            color: theme.colors.textPrimary,
            fontSize: fs(28),
            // textAlign: "center",
          },
        ]}
        numberOfLines={2}

        // allowFontScaling={false}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    // fontSize: 28,
    fontFamily: "OpenSans_700Bold",
  },
  headerContainer: {
    // marginTop: 20,
    // marginBottom: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
});
