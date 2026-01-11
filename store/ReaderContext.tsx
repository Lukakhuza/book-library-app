import {
  createContext,
  useState,
  type ReactNode,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { Dimensions } from "react-native";
import { getBook, getBookMetadata } from "../util/helperFunctions";
import { fetchBookSignedUrl } from "../api/book.api";
import { paginateText } from "../util/helperFunctions";
import { getAllBooks } from "../api/book.api";
import { TextLayoutLine } from "react-native";
import { RefObject } from "react";

type Book = {
  title: string;
  author: string;
  coverKey: string;
  epubKey: string;
  language: string;
  publishedYear: string;
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
  signedUrl: string;
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
};

export const ReaderContext = createContext<ReaderContextType | any>({
  books: [],
  screenDimensions: {
    height: 0,
    width: 0,
  },
  bookImageUri: "",
  signedUrl: "",
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
});

type Props = {
  children: ReactNode;
};

const ReaderContextProvider = ({ children }: Props) => {
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [signedUrl, setSignedUrl] = useState<any>(null);
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
    paddingTop: 17.23809814,
    paddingBottom: 0,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 600,
  });
  const [readerIsReady, setReaderIsReady] = useState(false);
  const [bookImageUri, setBookImageUri] = useState();
  const [books, setBooks] = useState<Book[]>([]);

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

  useEffect(() => {
    // const load = async () => {
    //   const url = await fetchBookSignedUrl();
    //   console.log(url);
    //   setSignedUrl(url);
    // };
    // load();
  }, []);

  // Load the book based on the file signedUrl provided in props.
  useEffect(() => {
    const load = async () => {
      // const chapter = await getBook(signedUrl);
      const metadata: any = await getBookMetadata(signedUrl);
      updateBookImageUri(metadata);

      setChapter({
        title: chapter?.title,
        body: chapter?.body,
      });
    };
    // load();
  }, [signedUrl]);

  const textLayoutsRef = useRef<any>([]);

  // Checklist to make sure everything is ready before pagination logic is run:
  const layoutReadyRef = useRef({
    container: false,
    textLayout: false,
    contentSize: false,
    fonts: true,
  });

  const availableHeight =
    readerDimensions.height -
    (properties.paddingTop + properties.paddingBottom);
  const MAX_LINES_PER_PAGE = Math.floor(
    availableHeight / properties.lineHeight
  );
  const PAGE_HEIGHT = MAX_LINES_PER_PAGE * properties.lineHeight;

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
    const pages = paginateText(textLayouts, readerDimensions, properties);
    setPages(pages);
    setReaderIsReady(true);
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

  const updateBookImageUri = (bookImageUri: string | any) => {
    setBookImageUri(bookImageUri);
  };

  const value = {
    books: books,
    properties: properties,
    signedUrl: signedUrl,
    bookImageUri: bookImageUri,
    chapter: chapter,
    pages: pages,
    readerDimensions: readerDimensions,
    screenDimensions: screenDimensions,
    textLayouts: textLayouts,
    readerIsReady: readerIsReady,
    contentSizeRef: contentSizeRef,
    layoutReadyRef: layoutReadyRef,
    containerWidthRef: containerWidthRef,
    debounceRef: debounceRef,
    textLayoutsRef: textLayoutsRef,
    updateReaderDimensions: updateReaderDimensions,
    updateTextLayouts: updateTextLayouts,
    updatePages: updatePages,
    checkLayoutReady: checkLayoutReady,
    updateBookImageUri: updateBookImageUri,
  };

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
};

export default ReaderContextProvider;
