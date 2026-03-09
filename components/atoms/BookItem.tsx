import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BookContext } from "../../store/BookContext";
import { useScale, useTheme } from "../../store/ThemeContext";
import { AppNavigationProp } from "../../types/navigation";
import { BookImage } from "./BookImage";
import { ProgressBar } from "./ProgressBar";
import { Book } from "../../types/book";

type BookData = {
  book: {
    index: number;
    item: Book;
    separators: unknown;
  };
};

export const BookItem = ({ book }: BookData) => {
  const { width } = Dimensions.get("screen");
  const navigation: AppNavigationProp = useNavigation();
  const { readingProgress } = useContext(BookContext);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const { theme, isDark, toggleTheme } = useTheme();
  const { fs, ms } = useScale();

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
          backgroundColor: theme.colors.bgElevated,
          borderRadius: ms(20),
          borderColor: "black",
          borderWidth: 1,
          marginBottom: ms(20),
          paddingHorizontal: ms(8),
        })}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: ms(15),
            paddingHorizontal: ms(10),
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // borderColor: "blue",
              // borderWidth: 1,
            }}
          >
            <BookImage
              imgUri={`https://books-library-app.s3.eu-north-1.amazonaws.com/${book.item.coverKey}`}
              width={ms(70)}
            />
          </View>
          <View
            style={{
              marginHorizontal: ms(16),
              flex: 1,
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                fontSize: fs(20),
                fontFamily: "GoogleSans_700Bold",
                color: theme.colors.textPrimary,
                lineHeight: ms(24),
                // paddingVertical: ms(20),
                includeFontPadding: true,
              }}
            >
              {book.item.title}
            </Text>
            <Text
              style={{
                fontFamily: "GoogleSans_500Medium",
                color: theme.colors.textMuted,
                fontSize: fs(15),
              }}
              numberOfLines={1}
            >
              {book.item.author}
            </Text>
            <ProgressBar
              progress={readingProgress}
              customStyle={{ marginBottom: ms(5) }}
              theme={theme}
            />
            <View>
              <Text
                style={{
                  color: theme.colors.textDisabled,
                  fontFamily: "GoogleSans_500Medium",
                  fontSize: fs(13),
                }}
                numberOfLines={1}
              >
                {`${Math.round(readingProgress * 100)}% - 78 pages left`}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
