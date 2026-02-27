import { RefObject } from "react";
import { TextLayoutLine } from "react-native";
import { Book } from "./book";

export type ScreenDimensions = {
  height: number;
  width: number;
};

export type Chapter = {
  title: string;
  body: string[];
};

export type ReaderDimensions = {
  height: number;
  width: number;
};

export type Properties = {
  verticalPadding: number;
  paddingTop: number;
  paddingBottom: number;
  horizontalPadding: number;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
};

export type Size = {
  width: number;
  height: number;
};

export type ContainerWidth = {
  width: number;
};

export type LayoutChecklist = {
  container: boolean;
  textLayout: boolean;
  contentSize: boolean;
  fonts: boolean;
};

export type ReaderContextType = {
  books: Book[];
  screenDimensions: ScreenDimensions;
  bookImageUri: string | null;
  chapter: Chapter;
  textsArray: [];
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
  updateBookObjectData: (bookObjectData: object) => void;
  updateTextLayouts: (textLayoutsRef: RefObject<TextLayoutLine[]>) => void;
  updatePages: (pages: string[]) => void;
  checkLayoutReady: () => void;
  updateBookImageUri: (bookImageUri: string | null) => void;
};
