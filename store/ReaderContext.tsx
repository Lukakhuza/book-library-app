import {
  createContext,
  useState,
  type ReactNode,
  useRef,
  useEffect,
  RefObject,
} from "react";
import { TextLayoutLine } from "react-native";
import { paginateText } from "../services/bookServices";
import {
  Size,
  ContainerWidth,
  ReaderContextType,
} from "../types/readerContextTypes";
import { Props } from "../types/basic";
import { Directory, File, Paths } from "expo-file-system";
import { getXhtmlPath } from "../services/bookServices";
import { MyBooksContext } from "./MyBooksContext";

export const ReaderContext = createContext<ReaderContextType | any>({
  books: [],
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
  bookObjectData: {},
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
  updateBookObjectData: (bookObjectData: object) => {},
  updateTextLayouts: (textLayoutsRef: RefObject<TextLayoutLine[]>) => {},
  updatePages: (pages: any) => {},
  checkLayoutReady: () => {},
  updateBookImageUri: () => {},
  updateSpine: () => {},
});

const ReaderContextProvider = ({ children }: Props) => {
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });
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
  const [spine, setSpine] = useState(null);
  const [bookObjectData, setBookObjectData] = useState<any>(null);
  const [textsArray, setTextsArray] = useState([]);
  // Store screen dimensions in screenDimensions state.

  const textLayoutsRef = useRef<any>([]);

  // Checklist to make sure everything is ready before pagination logic is run:
  const layoutReadyRef = useRef({
    container: false,
    textLayout: false,
    contentSize: false,
    fonts: true,
  });

  const contentSizeRef = useRef<Size>({
    width: 0,
    height: 0,
  });

  const containerWidthRef = useRef<ContainerWidth>({ width: 0 });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const didPaginateRef = useRef<boolean>(false);

  // const checkLayoutReady = () => {
  //   if (!didPaginateRef) return;
  //   const ready = Object.values(layoutReadyRef.current).every(Boolean);
  //   if (!ready) return;
  //   didPaginateRef.current = true;
  //   const lineProperties: any = paginateText(
  //     textLayouts,
  //     readerDimensions,
  //     properties,
  //   );
  //   setLineProps(lineProperties);
  //   // setPages(pages);
  //   // setReaderIsReady(true);
  // };

  useEffect(() => {
    if (!textLayouts) return;
    layoutReadyRef.current.contentSize = true;
    // checkLayoutReady();
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

  const updateBookObjectData = (bookObjectData: any) => {
    setBookObjectData(bookObjectData);
  };

  const value = {
    bookObjectData,
    properties,
    bookImageUri,
    chapter,
    pages,
    readerDimensions,
    screenDimensions,
    textLayouts,
    readerIsReady,
    textsArray,
    contentSizeRef,
    layoutReadyRef,
    containerWidthRef,
    debounceRef,
    textLayoutsRef,
    updateReaderDimensions,
    updateTextLayouts,
    updatePages,
    updateSpine,
    // checkLayoutReady,
    updateBookImageUri,
    updateBookObjectData,
  };

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
};

export default ReaderContextProvider;
