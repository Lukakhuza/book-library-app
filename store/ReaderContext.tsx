import { createContext, RefObject, useEffect, useRef, useState } from "react";
import { TextLayoutLine } from "react-native";
import { Props } from "../types/basic";
import {
  ContainerWidth,
  ReaderContextType,
  Size,
} from "../types/readerContextTypes";
import { OpenBookResult } from "../types/book";

export const ReaderContext = createContext<ReaderContextType>({
  screenDimensions: {
    height: 0,
    width: 0,
  },
  readerDimensions: {
    height: 0,
    width: 0,
  },
  textLayouts: [],
  bookObjectData: null,
  properties: {
    verticalPadding: 18.6190490722656,
    h2: {
      fontSize: 25,
      fontWeight: "700" as const,
      color: "red",
      textAlign: "center" as const,
    },
    p: {
      color: "purple",
    },
    paddingTop: 10,
    paddingBottom: 10,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600" as const,
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
  updateReaderDimensions: (width: number, height: number) => {},
});

const ReaderContextProvider = ({ children }: Props) => {
  const [screenDimensions, setScreenDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [textLayouts, setTextLayouts] = useState<TextLayoutLine[]>([]);
  const [readerDimensions, setReaderDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [properties, setProperties] = useState({
    verticalPadding: 18.6190490722656,
    h2: {
      fontSize: 25,
      fontWeight: "700" as const,
      color: "red",
      textAlign: "center" as const,
    },
    p: {
      color: "purple",
      fontSize: 20,
      textAlign: "justify" as const,
    },
    paddingTop: 10,
    paddingBottom: 10,
    horizontalPadding: 20,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600" as const,
  });
  // const [spine, setSpine] = useState(null);
  const [bookObjectData, setBookObjectData] = useState<OpenBookResult | null>(
    null,
  );
  // Store screen dimensions in screenDimensions state.

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

  useEffect(() => {
    if (!textLayouts) return;
    layoutReadyRef.current.contentSize = true;
    // checkLayoutReady();
  }, [textLayouts]);

  const updateReaderDimensions = (width: number, height: number) => {
    setReaderDimensions({ width: width, height: height });
  };

  const value = {
    bookObjectData,
    properties,
    readerDimensions,
    screenDimensions,
    textLayouts,
    contentSizeRef,
    layoutReadyRef,
    containerWidthRef,
    debounceRef,
    updateReaderDimensions,
  };

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
};

export default ReaderContextProvider;
