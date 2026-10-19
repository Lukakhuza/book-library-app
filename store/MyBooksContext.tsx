import {
  documentDirectory,
  readAsStringAsync,
  readDirectoryAsync,
} from "expo-file-system";
import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "../types/basic";
import { Book } from "../types/book";
import { LibraryContext } from "./LibraryContext";
import { deleteDatabaseAsync, openDatabaseAsync } from "expo-sqlite";
import { getMyBooks } from "../services/bookServices";
import { BookState } from "../types/book";
import { MyBooksContextType } from "../types/book";

export const MyBooksContext = createContext<MyBooksContextType>({
  myBooks: [],
  myBooksReady: false,
  myBooksState: new Map(),
  isLoading: false,
  addToMyBooks: (book: Book) => {},
  removeFromMyBooks: (fileName: string) => {},
  updateMyBooks: (books: Book[]) => {},
  updateMyBooksState: (bookId: string, bookState: BookState) => {},
});

const MyBooksContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myBooksReady, setMyBooksReady] = useState(false);
  const { books } = useContext(LibraryContext);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [myBooksState, setMyBooksState] = useState<Map<string, BookState>>(
    new Map(),
  );

  useEffect(() => {
    if (books?.length === 0) return;
    const load = async () => {
      try {
        const [result] = await Promise.all([
          getMyBooks(books, "books-metadata"),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        setMyBooks(result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [books]);

  useEffect(() => {
    if (myBooks.length === 0) return;
    const init = async () => {
      // If a database & table don't exist, create them
      const db = await openDatabaseAsync("library.db");
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS book_state (
          book_id    TEXT PRIMARY KEY NOT NULL,
          cfi        TEXT NOT NULL,
          location   INTEGER,
          progress   REAL NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL
        );
      `,
      );
      for (let i = 0; i < myBooks.length; i++) {
        await db.runAsync(
          `INSERT OR IGNORE INTO book_state (book_id, cfi, location, progress, updated_at)
            VALUES (?, ?, ?, ?, ?)`,
          [myBooks[i].book_id, null, 0, 0, Date.now()],
        );
      }
      const rows: BookState[] = await db.getAllAsync(
        "SELECT * FROM book_state",
      );
      const map = new Map();
      for (let i = 0; i < rows.length; i++) {
        const book_id = rows[i].book_id;
        const bookState = {
          cfi: rows[i].cfi,
          location: rows[i].location,
          progress: rows[i].progress,
          updated_at: rows[i].updated_at,
        };
        map.set(book_id, bookState);
      }
      setMyBooksState(map);
      setMyBooksReady(true);
    };
    init();
  }, [myBooks]);

  const addToMyBooks = (book: Book) => {
    setMyBooks((prev) => [...prev, book]);
  };

  const removeFromMyBooks = (fileName: string) => {
    setMyBooks((prev) => prev.filter((book) => book.fileName !== fileName));
  };

  const updateMyBooks = (books: Book[]) => {
    setMyBooks(books);
  };

  const updateMyBooksState = (bookId: string, bookState: BookState) => {
    setMyBooksState((prev) => {
      const next = new Map(prev);
      const x = bookState;
      next.set(bookId, {
        cfi: x.cfi,
        location: x.location,
        progress: x.progress,
        updated_at: Date.now(),
      });
      return next;
    });
    // setMyBooksState();
    // setMyBooksState(bookState);
  };

  const value = {
    myBooks,
    myBooksState,
    myBooksReady,
    addToMyBooks,
    removeFromMyBooks,
    updateMyBooks,
    updateMyBooksState,
    isLoading,
  };

  return (
    <MyBooksContext.Provider value={value}>{children}</MyBooksContext.Provider>
  );
};

export default MyBooksContextProvider;
