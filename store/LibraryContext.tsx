import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useLayoutEffect,
} from "react";
import { Dimensions } from "react-native";
import { getAllBooks } from "../api/book.api";
import { Props } from "../types/basic";
import { Book } from "../types/book";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type LibraryContextType = {
  books: Book[];
  screenDimensions: {
    height: number;
    width: number;
  };
  safeAreaInsets: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
};

export const LibraryContext = createContext<LibraryContextType>({
  books: [],
  screenDimensions: {
    width: 0,
    height: 0,
  },
  safeAreaInsets: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});

const LibraryContextProvider = ({ children }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const safeAreaInsets = useSafeAreaInsets();
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const { width, height } = Dimensions.get("screen");
    setScreenDimensions({
      height: height,
      width: width,
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    load();
  }, []);

  const value = { books, screenDimensions, safeAreaInsets };

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
};

export default LibraryContextProvider;
