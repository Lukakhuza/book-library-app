import { createContext, useContext, useEffect, useState } from "react";
import { openBook } from "../services/bookServices";
import { Props } from "../types/basic";
import { MyBooksContext } from "./MyBooksContext";
import { Book } from "../types/book";

export const BookContext = createContext<any>({});

const BookContextProvider = ({ children }: Props) => {
  const { myBooks } = useContext(MyBooksContext);
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [readingProgress, setReadingProgress] = useState(0.67);
  const [currentBookObject, setCurrentBookObject] = useState(null);

  useEffect(() => {
    if (!currentBook) return;
    // check if currentBook exists in myBooks, if not return
    const exists = myBooks.some((book) => book._id === currentBook._id);
    if (!exists) return;
    const load = async () => {
      const bookObjectData: any = await openBook(currentBook.fileName);
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
