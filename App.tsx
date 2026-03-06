import { DefaultTheme } from "@react-navigation/native";
import { useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./constants/colors";
import { Navigation } from "./navigation/Navigation";
import BookContextProvider from "./store/BookContext";
import ChapterContextProvider from "./store/ChapterContext";
import LibraryContextProvider from "./store/LibraryContext";
import MyBooksContextProvider from "./store/MyBooksContext";
import ReaderContextProvider from "./store/ReaderContext";
import { ThemeProvider } from "./store/ThemeContext";
// import { ThemedNavigation } from "./navigation/ThemedNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LibraryContextProvider>
          <MyBooksContextProvider>
            <BookContextProvider>
              <ChapterContextProvider>
                <ReaderContextProvider>
                  <Navigation />
                </ReaderContextProvider>
              </ChapterContextProvider>
            </BookContextProvider>
          </MyBooksContextProvider>
        </LibraryContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
