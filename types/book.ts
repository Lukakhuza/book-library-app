import { Element } from "domhandler";
import JSZip from "jszip";

export type Book = {
  __v: number;
  book_id: string;
  author: string;
  coverKey: string;
  epubKey: string;
  fileName: string;
  language: string;
  publishedYear: string;
  title: string;
};

export type Tag = "p" | "h1" | "h2" | "h3" | "a";

export type PageItem = {
  meta: Record<string, unknown> | string;
  text: string;
  tag: Tag;
};

export type Page = PageItem[];
export type Pages = Page[];

export type BookRouteProps = {
  route: {
    key: string;
    name: string;
    params: {
      bookData: Book;
      path: string;
    };
  };
};

export type OpenBookResult = {
  opfPath: string;
  spineHrefs: string[];
  zip: JSZip;
};

export type DomArray = Element[];

export type BookState = {
  book_id?: string;
  cfi: string;
  location: number;
  progress: number;
  updated_at: number;
};

export type MyBooksContextType = {
  myBooks: Book[];
  myBooksReady: boolean;
  myBooksState: Map<string, BookState>;
  isLoading: boolean;
  addToMyBooks: (book: Book) => void;
  removeFromMyBooks: (fileName: string) => void;
  updateMyBooks: (books: Book[]) => void;
  updateMyBooksState: (bookId: string, bookState: BookState) => void;
};
