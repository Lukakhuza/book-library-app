import { createContext, useContext, useEffect, useState } from "react";
import { getXhtmlPath, xmlStringToTextsArray } from "../services/bookServices";
import { Props } from "../types/basic";
import { OpenBookResult, PageItem } from "../types/book";
import { BookContext } from "./BookContext";

type ChapterContextType = {
  currentChapter: number;
  textsArray: PageItem[];
  shouldExitBook: boolean;
  nextChapter: () => void;
  previousChapter: () => void;
  resetShouldExitBook: () => void;
  updateCurrentChapter: (chapterIndex: number) => void;
};

export const ChapterContext = createContext<ChapterContextType>({
  currentChapter: 0,
  textsArray: [],
  shouldExitBook: false,
  nextChapter: () => {},
  previousChapter: () => {},
  resetShouldExitBook: () => {},
  updateCurrentChapter: (chapterIndex: number) => {},
});

const ChapterContextProvider = ({ children }: Props) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [textsArray, setTextsArray] = useState<PageItem[]>([]);
  const { currentBook, currentBookObject } = useContext(BookContext);
  const [shouldExitBook, setShouldExitBook] = useState(false);

  useEffect(() => {
    if (!currentBookObject) return;
    const load = async () => {
      const { opfPath, spineHrefs, zip }: OpenBookResult = currentBookObject;
      const xhtmlPath = getXhtmlPath(opfPath, spineHrefs, currentChapter);
      const xhtmlString: string | undefined = await zip
        .file(xhtmlPath)
        ?.async("string");
      if (!xhtmlString) return;
      const array = await xmlStringToTextsArray(xhtmlString);
      setTextsArray(array);
    };
    load();
  }, [currentBookObject, currentChapter]);

  const nextChapter = () => {
    if (!currentBookObject) return;
    if (currentChapter < currentBookObject.spineHrefs.length - 1) {
      setCurrentChapter((prev) => prev + 1);
    } else {
      setShouldExitBook(true);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter((prev) => prev - 1);
    } else {
      setShouldExitBook(true);
    }
  };

  const resetShouldExitBook = () => {
    setShouldExitBook(false);
  };

  const updateCurrentChapter = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
  };

  const value = {
    currentChapter,
    textsArray,
    shouldExitBook,
    nextChapter,
    previousChapter,
    resetShouldExitBook,
    updateCurrentChapter,
  };

  return (
    <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>
  );
};

export default ChapterContextProvider;
