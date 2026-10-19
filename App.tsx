import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation/Navigation";
import BookContextProvider from "./store/BookContext";
import LibraryContextProvider from "./store/LibraryContext";
import MyBooksContextProvider from "./store/MyBooksContext";
import ReaderContextProvider from "./store/ReaderContext";
import { ReaderProvider } from "@epubjs-react-native/core";
import { ThemeProvider } from "./store/ThemeContext";
import AuthContextProvider from "./store/AuthContext";
import UserDataContextProvider from "./store/UserDataContext";
import { PaperProvider, Provider } from "react-native-paper";
import AppContent from "./components/organisms/AppContent";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthContextProvider>
          <UserDataContextProvider>
            <LibraryContextProvider>
              <MyBooksContextProvider>
                <BookContextProvider>
                  <ReaderContextProvider>
                    <ReaderProvider>
                      <PaperProvider>
                        <AppContent />
                      </PaperProvider>
                    </ReaderProvider>
                  </ReaderContextProvider>
                </BookContextProvider>
              </MyBooksContextProvider>
            </LibraryContextProvider>
          </UserDataContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
