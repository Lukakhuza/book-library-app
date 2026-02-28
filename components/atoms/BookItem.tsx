import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../../types/navigation";
import { Colors } from "../../constants/colors";
import { BookImage } from "./BookImage";
import { ProgressBar } from "./ProgressBar";

export const BookItem = ({ book }: any) => {
  const { width } = Dimensions.get("screen");
  const navigation: AppNavigationProp = useNavigation();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(1.1);
          opacity.value = withSpring(0.8);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
          opacity.value = withSpring(1);
        }}
        onPress={() => {
          navigation.navigate("BookDetails", {
            bookData: book.item,
          });
        }}
        style={({ pressed }) => ({
          backgroundColor: Colors.dark.bgElevated,
          borderRadius: 20,
          // width: width * 0.5,
          // alignItems: "center",
          // justifyContent: "flex-end",
          marginBottom: 20,
          paddingHorizontal: 8,
        })}

        //

        //     bgApp:       "#1C1A17",
        // bgScreen:    "#242018",
        // bgCard:      "#2E2A24",
        // bgElevated:  "#3A3228",
        // bgInput:     "#2E2A24",
        // bgChip:      "#3D372F",
        // bgNotch:     "#1C1A17",
        // bgOverlay:   "rgba(28,26,23,0.95)",
        // textPrimary:   "#F5EFE4",
        // textSecondary: "#D8CBAD",
        // textMuted:     "#9E9585",
        // textDisabled:  "#6E6558",
        // accentPrimary: "#D4A96A",
        // accentDark:    "#B8904F",
        // accentDanger:  "#C47A7A",
        // accentSuccess: "#7AC47A",
        // accentTag:     "#B8904F",
        // borderDefault: "#3D372F",
        // borderCard:    "#4A4035",
        // borderDivider: "#322D27",
        // readerBg:   "#26221C",
        // readerText: "#D8CBAD",
      >
        <View
          style={{
            flexDirection: "row",
            // width: "100%",
            // flex: 1,
            // paddingLeft: 30,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <BookImage
            imgUri={`https://books-library-app.s3.eu-north-1.amazonaws.com/${book.item.coverKey}`}
            width={70}
          />
          {/* <View> */}
          <View
            style={{
              marginHorizontal: 16,
              borderColor: "yellow",
              borderWidth: 1,
              flex: 1,
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                fontSize: 20,
                fontFamily: "GoogleSans_700Bold",
                color: Colors.dark.textPrimary,
                // borderColor: "orange",
                // borderWidth: 2,
                lineHeight: 24,
              }}
            >
              {book.item.title}
            </Text>
            <Text
              style={{
                fontFamily: "GoogleSans_500Medium",
                color: Colors.dark.textMuted,
                // borderColor: "blue",
                // borderWidth: 2,
              }}
            >
              {book.item.author}
            </Text>
            <ProgressBar progress={0.56} />
          </View>
          {/* <View style={{ width: "50%" }}></View> */}
        </View>
        {/* </View> */}
      </Pressable>
    </Animated.View>
  );
};
