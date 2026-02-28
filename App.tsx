import { useColorScheme } from "react-native";
import {
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import ReaderContextProvider from "./store/ReaderContext";
import ChapterContextProvider from "./store/ChapterContext";
import BookContextProvider from "./store/BookContext";
import MyBooksContextProvider from "./store/MyBooksContext";
import LibraryContextProvider from "./store/LibraryContext";
import { Navigation } from "./navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ddb52f",
    primary: "rgba(10, 13, 222, 1)",
    card: "rgb(120,120,120)",
  },
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <LibraryContextProvider>
        <MyBooksContextProvider>
          <BookContextProvider>
            <ChapterContextProvider>
              <ReaderContextProvider>
                <Navigation theme={scheme === "dark" ? DarkTheme : MyTheme} />
              </ReaderContextProvider>
            </ChapterContextProvider>
          </BookContextProvider>
        </MyBooksContextProvider>
      </LibraryContextProvider>
    </SafeAreaProvider>
  );
}
