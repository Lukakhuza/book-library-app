import { createContext, useEffect, useState, type ReactNode } from "react";
import { openBook } from "../services/bookServices";

export const BookContext = createContext<any>({});

type Props = {
  children: ReactNode;
};

const BookContextProvider = ({ children }: Props) => {
  const [currentBook, setCurrentBook] = useState(null);
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

  const value = { currentBook, currentBookObject, updateCurrentBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
