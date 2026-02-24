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

export const ChapterContext = createContext<any>({});

type Props = {
  children: ReactNode;
};

const ChapterContextProvider = ({ children }: Props) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [textsArray, setTextsArray] = useState([]);
  const { currentBook, currentBookObject } = useContext(BookContext);
  const [spineHrefs, setSpineHrefs] = useState([]);

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
    console.log(currentBookObject.spineHrefs.length);
    console.log(currentChapter);
    if (currentChapter < currentBookObject.spineHrefs.length - 1) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter((prev) => prev - 1);
    }
  };
  const value = {
    currentChapter,
    textsArray,
    nextChapter,
    previousChapter,
  };

  return (
    <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>
  );
};

export default ChapterContextProvider;
