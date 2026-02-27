import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from "react";
import { LibraryContext } from "./LibraryContext";
import { Directory, File, Paths } from "expo-file-system";
import { Props } from "../types/basic";
import { Book } from "../types/book";

type MyBooksContextType = {
  myBooks: Book[];
  addToMyBooks: (book: Book) => void;
  removeFromMyBooks: (fileName: string) => void;
  updateMyBooks: (books: Book[]) => void;
};

export const MyBooksContext = createContext<MyBooksContextType>({
  myBooks: [],
  addToMyBooks: (book: Book) => {},
  removeFromMyBooks: (fileName: string) => {},
  updateMyBooks: (books: Book[]) => {},
});

const MyBooksContextProvider = ({ children }: Props) => {
  const { books } = useContext(LibraryContext);
  const [myBooks, setMyBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (books?.length === 0) return;
    const load = async () => {
      const booksMetadataDir = new Directory(
        Paths.document.uri,
        "books-metadata",
      );
      const booksList = booksMetadataDir.list();
      const fileNameSet = new Set();
      for (const book of booksList) {
        const file = new File(book.uri);
        const text = await file.text();
        const data = JSON.parse(text);
        fileNameSet.add(data.bookData.fileName);
      }
      let myBooks = [];
      for (const book of books) {
        if (fileNameSet.has(book.fileName)) {
          myBooks.push(book);
        }
      }
      setMyBooks(myBooks);
    };
    load();
  }, [books]);

  const addToMyBooks = (book: Book) => {
    setMyBooks((prev) => [...prev, book]);
  };

  const removeFromMyBooks = (fileName: string) => {
    setMyBooks((prev) => prev.filter((book) => book.fileName !== fileName));
  };

  const updateMyBooks = (books: Book[]) => {
    setMyBooks(books);
  };

  const value = {
    myBooks,
    addToMyBooks,
    removeFromMyBooks,
    updateMyBooks,
  };

  return (
    <MyBooksContext.Provider value={value}>{children}</MyBooksContext.Provider>
  );
};

export default MyBooksContextProvider;
