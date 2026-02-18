import {
  createContext,
  useState,
  type ReactNode,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { Dimensions } from "react-native";
import { getBook } from "../services/bookServices";
import { paginateText } from "../services/bookServices";
import { getDownloadedBooks } from "../services/bookServices";
import { getAllBooks } from "../api/book.api";
import { TextLayoutLine } from "react-native";
import { RefObject } from "react";
import { Directory, File, Paths } from "expo-file-system";

type Book = {
  title: string;
  author: string;
  coverKey: string;
  epubKey: string;
  language: string;
  publishedYear: string;
  fileName: string;
};

type ScreenDimensions = {
  height: number;
  width: number;
};

type Chapter = {
  title: string;
  body: string[];
};

type ReaderDimensions = {
  height: number;
  width: number;
};

type Properties = {
  verticalPadding: number;
  paddingTop: number;
  paddingBottom: number;
  horizontalPadding: number;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
};

type Size = {
  width: number;
  height: number;
};

type ContainerWidth = {
  width: number;
};

type LayoutChecklist = {
  container: boolean;
  textLayout: boolean;
  contentSize: boolean;
  fonts: boolean;
};

type ReaderContextType = {
  books: Book[];
  screenDimensions: ScreenDimensions;
  bookImageUri: string | null;
  chapter: Chapter;
  pages: [];
  readerDimensions: ReaderDimensions;
  textLayouts: TextLayoutLine[];
  readerIsReady: boolean;
  properties: Properties;
  contentSizeRef: RefObject<Size>;
  containerWidthRef: RefObject<ContainerWidth>;
  layoutReadyRef: RefObject<LayoutChecklist>;
  debounceRef: RefObject<NodeJS.Timeout | null>;
  textLayoutsRef: RefObject<TextLayoutLine[]>;
  updateReaderDimensions: (width: number, height: number) => void;
  updateTextLayouts: (textLayoutsRef: RefObject<TextLayoutLine[]>) => void;
  updatePages: (pages: string[]) => void;
  checkLayoutReady: () => void;
  updateBookImageUri: (bookImageUri: string | null) => void;
  addToMyBooks: (book: object) => {};
  removeFromMyBooks: (fileName: string) => {};
};

export const ReaderContext = createContext<ReaderContextType | any>({
  books: [],
  myBooks: [],
  lineProps: [],
  downloadedBooks: [],
  screenDimensions: {
    height: 0,
    width: 0,
  },
  bookImageUri: "",
  chapter: {
    title: "",
    body: [],
  },
  pages: [],
  readerDimensions: {
    height: 0,
    width: 0,
  },
  textLayouts: [],
  readerIsReady: false,
  properties: {
    verticalPadding: 18.6190490722656,
    h2: {
      fontSize: 25,
      fontWeight: 700,
      color: "red",
      textAlign: "center",
    },
    p: {
      color: "purple",
    },
    paddingTop: 10,
    paddingBottom: 10,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  },
  contentSizeRef: { current: { width: 0, height: 0 } },
  containerWidthRef: { current: { width: 0 } },
  layoutReadyRef: {
    current: {
      container: false,
      textLayout: false,
      contentSize: false,
      fonts: false,
    },
  },
  debounceRef: { current: null },
  textLayoutsRef: { current: [] },
  updateReaderDimensions: (width: number, height: number) => {},
  updateTextLayouts: (textLayoutsRef: RefObject<TextLayoutLine[]>) => {},
  updatePages: (pages: any) => {},
  checkLayoutReady: () => {},
  updateBookImageUri: () => {},
  updateSpine: () => {},
});

type Props = {
  children: ReactNode;
};

const ReaderContextProvider = ({ children }: Props) => {
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [lineProps, setLineProps] = useState([]);
  const [pages, setPages]: any = useState([]);
  const [textLayouts, setTextLayouts] = useState<TextLayoutLine[]>([]);
  const [readerDimensions, setReaderDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [chapter, setChapter]: any = useState({
    title: "",
    body: [],
  });
  const [properties, setProperties] = useState({
    verticalPadding: 18.6190490722656,
    h2: {
      fontSize: 25,
      fontWeight: 700,
      color: "red",
      textAlign: "center",
    },
    p: {
      color: "purple",
      fontSize: 20,
      textAlign: "justify",
    },
    paddingTop: 10,
    paddingBottom: 10,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  });
  const [readerIsReady, setReaderIsReady] = useState(false);
  const [bookImageUri, setBookImageUri] = useState();
  const [books, setBooks] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [spine, setSpine] = useState(null);
  const [location, setLocation] = useState({
    spineIndex: 0,
    pageIndex: 0,
  });
  // Store screen dimensions in screenDimensions state.
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

  // Priority 1
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

  // useEffect(() => {
  //   const load = async () => {
  //     const downloadedBooks = await getDownloadedBooks();
  //   };
  //   load();
  // }, []);

  const textLayoutsRef = useRef<any>([]);

  // Checklist to make sure everything is ready before pagination logic is run:
  const layoutReadyRef = useRef({
    container: false,
    textLayout: false,
    contentSize: false,
    fonts: true,
  });

  // const availableHeight =
  //   readerDimensions.height -
  //   (properties.paddingTop + properties.paddingBottom);
  // const MAX_LINES_PER_PAGE = Math.floor(
  //   availableHeight / properties.lineHeight,
  // );
  // const PAGE_HEIGHT = MAX_LINES_PER_PAGE * properties.lineHeight;

  const contentSizeRef = useRef<Size>({
    width: 0,
    height: 0,
  });

  const containerWidthRef = useRef<ContainerWidth>({ width: 0 });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const didPaginateRef = useRef<boolean>(false);

  const checkLayoutReady = () => {
    if (!didPaginateRef) return;
    const ready = Object.values(layoutReadyRef.current).every(Boolean);
    if (!ready) return;
    didPaginateRef.current = true;
    const lineProperties: any = paginateText(
      textLayouts,
      readerDimensions,
      properties,
    );
    setLineProps(lineProperties);
    // setPages(pages);
    // setReaderIsReady(true);
  };

  useEffect(() => {
    if (!textLayouts) return;
    layoutReadyRef.current.contentSize = true;
    checkLayoutReady();
  }, [textLayouts]);

  const updateReaderDimensions = (width: number, height: number) => {
    setReaderDimensions({ width: width, height: height });
  };

  const updateTextLayouts = (textLayoutsRef: any) => {
    setTextLayouts(textLayoutsRef);
  };

  const updatePages = (pages: any) => {
    setPages(pages);
  };

  const updateSpine = (spine: any) => {
    setSpine(spine);
  };

  const updateBookImageUri = (bookImageUri: string | any) => {
    setBookImageUri(bookImageUri);
  };

  const addToMyBooks = (book: any) => {
    setMyBooks((prev) => [...prev, book]);
  };

  const removeFromMyBooks = (fileName: string) => {
    setMyBooks((prev) => prev.filter((book) => book.fileName !== fileName));
  };

  const value = {
    books,
    myBooks,
    properties,
    lineProps,
    bookImageUri,
    chapter,
    pages,
    readerDimensions,
    screenDimensions,
    textLayouts,
    readerIsReady,
    contentSizeRef,
    layoutReadyRef,
    containerWidthRef,
    debounceRef,
    textLayoutsRef,
    updateReaderDimensions,
    updateTextLayouts,
    updatePages,
    updateSpine,
    checkLayoutReady,
    updateBookImageUri,
    addToMyBooks,
    removeFromMyBooks,
  };

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
};

export default ReaderContextProvider;
