import { createContext, useContext, useEffect, useState } from "react";
import { openBook } from "../services/bookServices";
import { Props } from "../types/basic";
import { MyBooksContext } from "./MyBooksContext";
import { Book, OpenBookResult } from "../types/book";

// type ChapterContextType = {
//   currentChapter: number;
//   textsArray: string[];
//   shouldExitBook: boolean;
//   nextChapter: () => void;
//   previousChapter: () => void;
//   resetShouldExitBook: () => void;
//   updateCurrentChapter: (chapterIndex: number) => void;
// };

type BookContextType = {
  currentBook: Book | null;
  currentBookObject: OpenBookResult | null;
  readingProgress: number;
  updateCurrentBook: (book: Book) => void;
};

// export const ChapterContext = createContext<ChapterContextType>({
//   currentChapter: 0,
//   textsArray: [],
//   shouldExitBook: false,
//   nextChapter: () => {},
//   previousChapter: () => {},
//   resetShouldExitBook: () => {},
//   updateCurrentChapter: (chapterIndex: number) => {},
// });

export const BookContext = createContext<BookContextType>({
  currentBook: null,
  currentBookObject: null,
  readingProgress: 0.67,
  updateCurrentBook: (book: Book) => {},
});

const BookContextProvider = ({ children }: Props) => {
  const { myBooks } = useContext(MyBooksContext);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [readingProgress, setReadingProgress] = useState(0.67);
  const [currentBookObject, setCurrentBookObject] =
    useState<OpenBookResult | null>(null);

  useEffect(() => {
    if (!currentBook) return;
    // check if currentBook exists in myBooks, if not return
    const exists = myBooks.some((book) => book.book_id === currentBook.book_id);
    if (!exists) return;
    const load = async () => {
      const bookObjectData: OpenBookResult | undefined = await openBook(
        currentBook.fileName,
      );
      if (!bookObjectData) return;
      setCurrentBookObject(bookObjectData);
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
