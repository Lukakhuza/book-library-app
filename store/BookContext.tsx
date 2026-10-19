import { createContext, useContext, useEffect, useState } from "react";
import { getEpubFile, openBook } from "../services/bookServices";
import { Props } from "../types/basic";
import { MyBooksContext } from "./MyBooksContext";
import { Book, OpenBookResult } from "../types/book";

type BookContextType = {
  currentBook: Book | null;
  currentBookObject: string | null;
  readingProgress: number;
  updateCurrentBook: (book: Book) => void;
};

export const BookContext = createContext<BookContextType>({
  currentBook: null,
  currentBookObject: null,
  readingProgress: 0.55,
  updateCurrentBook: (book: Book) => {},
});

const BookContextProvider = ({ children }: Props) => {
  const { myBooks } = useContext(MyBooksContext);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [readingProgress, setReadingProgress] = useState(0.6);
  const [currentBookObject, setCurrentBookObject] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!currentBook) return;
    // check if currentBook exists in myBooks, if not return
    const exists = myBooks.some((book) => book.book_id === currentBook.book_id);
    if (!exists) return;
    const load = async () => {
      const epubFile = await getEpubFile("books", currentBook.fileName);
      setCurrentBookObject(epubFile);
    };
    load();
  }, [currentBook]);

  const updateCurrentBook = (book: Book) => {
    setCurrentBook(book);
  };

  const value = {
    currentBook,
    currentBookObject,
    readingProgress,
    updateCurrentBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
