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
  withTiming,
} from "react-native-reanimated";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useContext, useCallback, useRef, useEffect, useState } from "react";
import { MyBooksContext } from "../store/MyBooksContext";
import { LinearGradient } from "expo-linear-gradient";
// import { Colors } from "../constants/Colors";
import { AppNavigationProp } from "../types/navigation";
// const scale = useRef(new Animated.Value(1)).current;
import * as reanimated from "react-native-reanimated";
import { BookItem } from "../components/atoms/BookItem";
import { Header } from "../components/atoms/Header";
import LoadingOverlay from "../util/LoadingOverlay";
import { LibraryContext } from "../store/LibraryContext";
import { Container } from "../components/atoms/Container";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Colors } from "../constants/colors";
import { ProgressBar } from "../components/atoms/ProgressBar";

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

  const FadeInView = ({ children }: any) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 2000 });
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
    return <LoadingOverlay message="Loading Books..." />;
  }

  let myBooksContent;

  if (myBooks?.length === 0) {
    myBooksContent = (
      <View style={styles.content}>
        <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <Text style={styles.noBooksText}>You currently have no books.</Text>
          <Text style={styles.noBooksText}>Click below to explore:</Text>
        </View>
        <Button
          title="Discover"
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
        <Text
          style={{
            textTransform: "uppercase",
            fontFamily: "Roboto_700Bold",
            letterSpacing: 2,
            fontSize: 15,
            color: Colors.dark.textMuted,
          }}
        >
          Good Evening
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header text="What will you read?" />
        <ThemeSwitchButton viewStyle={{ marginRight: 5, marginTop: 5 }} />
      </View>
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
