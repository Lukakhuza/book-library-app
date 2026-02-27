import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BookContext } from "./BookContext";
import { getXhtmlPath } from "../services/bookServices";
import { xmlStringToTextsArray } from "../services/bookServices";
import { Props } from "../types/basic";

export const ChapterContext = createContext<any>({});

const ChapterContextProvider = ({ children }: Props) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [textsArray, setTextsArray] = useState([]);
  const { currentBook, currentBookObject } = useContext(BookContext);
  const [shouldExitBook, setShouldExitBook] = useState(false);

  useEffect(() => {
    if (!currentBookObject) return;
    const load = async () => {
      const { opfPath, spineHrefs, zip }: any = currentBookObject;
      const xhtmlPath = getXhtmlPath(opfPath, spineHrefs, currentChapter);
      const xhtmlString: any = await zip.file(xhtmlPath)?.async("string");
      const array = await xmlStringToTextsArray(xhtmlString);
      setTextsArray(array);
    };
    load();
  }, [currentBookObject, currentChapter]);

  const nextChapter = () => {
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
