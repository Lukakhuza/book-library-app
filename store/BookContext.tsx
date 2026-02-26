import { createContext, useEffect, useState, type ReactNode } from "react";
import { openBook } from "../services/bookServices";
import { Props } from "../types/basic";

export const BookContext = createContext<any>({});

const BookContextProvider = ({ children }: Props) => {
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [currentBookObject, setCurrentBookObject] = useState(null);

  useEffect(() => {
    if (!currentBook) return;
    const load = async () => {
      const bookObjectData: any = await openBook(currentBook.fileName);
      setCurrentBookObject(bookObjectData);
    };
    load();
  }, [currentBook]);

  const updateCurrentBook = (book: any) => {
    setCurrentBook(book);
  };

  const value = {
    currentBook,
    currentBookObject,
    updateCurrentBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
