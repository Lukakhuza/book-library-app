import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./navigation/Navigation";
import BookContextProvider from "./store/BookContext";
import ChapterContextProvider from "./store/ChapterContext";
import LibraryContextProvider from "./store/LibraryContext";
import MyBooksContextProvider from "./store/MyBooksContext";
import ReaderContextProvider from "./store/ReaderContext";
import { ThemeProvider } from "./store/ThemeContext";

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
