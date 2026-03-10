import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MyBooksContext } from "../store/MyBooksContext";
// import { Colors } from "../constants/Colors";
import { AppNavigationProp } from "../types/navigation";
// const scale = useRef(new Animated.Value(1)).current;
import { Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { BookItem } from "../components/molecules/BookItem";
import { Container } from "../components/atoms/Container";
import { Header } from "../components/atoms/Header";
import { SubHeading } from "../components/atoms/SubHeading";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";
import NoBooks from "../components/molecules/NoBooks";
import { LibraryContext } from "../store/LibraryContext";
import { useScale, useTheme } from "../store/ThemeContext";
import { Props } from "../types/basic";
import LoadingOverlay from "../util/LoadingOverlay";

// const handlePressIn = () => {
//   Animated.spring(scale, {
//     toValue: 1.1,
//     useNativeDriver: true,
//   }).start();
// };

// const handlePressOut = () => {
//   Animated.spring(scale, {
//     toValue: 1,
//     useNativeDriver: true,
//   }).start();
// };

const HomeScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { width } = Dimensions.get("screen");
  const navigation: AppNavigationProp = useNavigation();
  const { myBooks, isLoading: myBooksLoading } = useContext(MyBooksContext);
  const [fontsLoaded] = useFonts({ Roboto_700Bold });
  const { safeAreaInsets: insets } = useContext(LibraryContext);
  const { theme, isDark, toggleTheme } = useTheme();
  const { fs, hs, ms, ws } = useScale();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  }, []);

  const FadeInView = ({ children, style }: Props) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    );
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     // Refresh myBooks
  //   }, [myBooks]),
  // );

  if (myBooksLoading) {
    return <LoadingOverlay message="Loading Books..." theme={theme} />;
  }

  let myBooksContent;

  if (myBooks?.length === 0) {
    myBooksContent = (
      <NoBooks
        theme={theme}
        onExplore={() => {
          navigation.navigate("Discover");
        }}
      />
    );
  }

  if (myBooks?.length > 0) {
    myBooksContent = (
      <View>
        <SubHeading text="Continue Reading" theme={theme} />
        <FadeInView style={{ marginBottom: ms(180) }}>
          <FlatList
            data={myBooks}
            bounces={false}
            style={{ marginTop: 20 }}
            renderItem={(book) => {
              return <BookItem book={book} />;
            }}
          />
        </FadeInView>
      </View>
    );
  }

  return (
    <Container>
      <View>
        <SubHeading text={greeting} theme={theme} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          // borderColor: "red",
          // borderWidth: 1,
        }}
      >
        <Header
          text="What will you read?"
          theme={theme}
          customStyle={{
            // marginRight: 5,
            // width: 20,
            maxWidth: 250,
            // flex: 1,
            // borderColor: "brown",
            // borderWidth: 1,
            // flexGrow: 1,
            flexShrink: 2,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // borderColor: "blue",
            // borderWidth: 2,
            // width: 120,
            flexGrow: 1,
            // flexShrink: 1,
            // maxWidth: 120,
          }}
        >
          <ThemeSwitchButton
            onPress={() => {
              toggleTheme();
            }}
            theme={theme}
            isDark={isDark}
          />
        </View>
      </View>
      {myBooksContent}
    </Container>
  );
};
export default HomeScreen;
