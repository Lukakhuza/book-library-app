import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import { BookItem } from "../components/atoms/BookItem";
import { Container } from "../components/atoms/Container";
import { Header } from "../components/atoms/Header";
import { SubHeading } from "../components/atoms/SubHeading";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";
import { LibraryContext } from "../store/LibraryContext";
import { useTheme } from "../store/ThemeContext";
import LoadingOverlay from "../util/LoadingOverlay";
import { Props } from "../types/basic";

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

  const FadeInView = ({ children }: Props) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
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
      <View style={styles.content}>
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <Text
            style={[styles.noBooksText, { color: theme.colors.textPrimary }]}
          >
            You currently have no books.
          </Text>
          <Text
            style={[styles.noBooksText, { color: theme.colors.textPrimary }]}
          >
            Click below to explore:
          </Text>
        </View>
        <Button
          title="Discover"
          color={theme.colors.bgCard}
          onPress={() => {
            navigation.navigate("Discover");
          }}
        />
      </View>
    );
  }

  if (myBooks?.length > 0) {
    myBooksContent = (
      <FadeInView
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={myBooks}
          bounces={false}
          contentContainerStyle={
            {
              // alignItems: "stretch",
              // paddingTop: 20,
              // paddingBottom: 15,
              // width: "100%",
              // flex: 1,
            }
          }
          style={{ marginTop: 20 }}
          renderItem={(book) => {
            return <BookItem book={book} />;
          }}
        />
      </FadeInView>
    );
  }

  return (
    <Container>
      <View>
        <SubHeading text="Good Evening" theme={theme} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Header text="What will you read?" theme={theme} />
        <ThemeSwitchButton
          viewStyle={{ marginRight: 5, marginTop: 5 }}
          onPress={() => {
            toggleTheme();
          }}
          theme={theme}
          isDark={isDark}
        />
      </View>
      <SubHeading text="Continue Reading" theme={theme} />
      {myBooksContent}
    </Container>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 5,
  },
});
