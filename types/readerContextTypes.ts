import { RefObject } from "react";
import { TextLayoutLine, TextStyle } from "react-native";
import { Book, OpenBookResult } from "./book";

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
  h2: TextStyle;
  p: TextStyle;
  fontWeight: TextStyle["fontWeight"];
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
  bookObjectData: OpenBookResult | null;
  screenDimensions: ScreenDimensions;
  readerDimensions: ReaderDimensions;
  textLayouts: TextLayoutLine[];
  properties: Properties;
  contentSizeRef: RefObject<Size>;
  containerWidthRef: RefObject<ContainerWidth>;
  layoutReadyRef: RefObject<LayoutChecklist>;
  debounceRef: RefObject<NodeJS.Timeout | null>;
  updateReaderDimensions: (width: number, height: number) => void;
};
