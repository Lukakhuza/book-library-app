import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BookContext } from "../../store/BookContext";
import { useScale, useTheme } from "../../store/ThemeContext";
import { Book } from "../../types/book";
import { AppNavigationProp } from "../../types/navigation";
import BookAuthor from "./BookAuthor";
import { BookImage } from "./BookImage";
import BookTitle from "./BookTitle";
import { ProgressBar } from "./ProgressBar";
import ProgressText from "./ProgressText";

type BookData = {
  book: {
    index: number;
    item: Book;
    separators: unknown;
  };
};

export const BookItem = ({ book }: BookData) => {
  const navigation: AppNavigationProp = useNavigation();
  const { readingProgress } = useContext(BookContext);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const { theme } = useTheme();
  const { ms } = useScale();
  const { author, title, coverKey } = book.item;
  const { bgElevated } = theme.colors;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.1);
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  const handleOnPress = () => {
    navigation.navigate("BookDetails", {
      bookData: book.item,
    });
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleOnPress}
        style={[
          styles.container,
          {
            backgroundColor: bgElevated,
            borderRadius: ms(20),
            marginBottom: ms(20),
            paddingHorizontal: ms(8),
          },
        ]}
      >
        <View
          style={[
            styles.innerContainer,
            {
              paddingVertical: ms(15),
              paddingHorizontal: ms(10),
            },
          ]}
        >
          <BookImage
            imgUri={`https://books-library-app.s3.eu-north-1.amazonaws.com/${coverKey}`}
            width={ms(70)}
          />

          <View
            style={[
              styles.bookDataContainer,
              {
                marginHorizontal: ms(16),
              },
            ]}
          >
            <BookTitle title={title} theme={theme} />
            <BookAuthor author={author} theme={theme} />
            <ProgressBar
              progress={readingProgress}
              customStyle={{ marginBottom: ms(5) }}
              theme={theme}
            />
            <ProgressText theme={theme} readingProgress={readingProgress} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { borderColor: "black", borderWidth: 1 },
  innerContainer: {
    flexDirection: "row",
  },
  bookDataContainer: {
    flex: 1,
  },
});
