import { Element } from "domhandler";
import {
  deleteAsync,
  documentDirectory,
  downloadAsync,
  FileSystemDownloadResult,
  getInfoAsync,
  makeDirectoryAsync,
  readAsStringAsync,
  readDirectoryAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { DomUtils, parseDocument } from "htmlparser2";
import { fetchBookSignedUrl } from "../api/book.api";
import { Book, DomArray, PageItem } from "../types/book";

export const downloadBook = async (bookData: Book) => {
  try {
    // Get signed url
    const signedUrl: string = await fetchBookSignedUrl(bookData);

    // // Download the epub file and the book metadata into the file system:
    const bookFile = await getBook(signedUrl, bookData);
    return bookFile;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromMyBooks = async (fileName: string) => {
  try {
    // Generate epub file uri
    const epubFileName = fileName;
    const booksDir = documentDirectory + "books";
    const bookUri = booksDir + epubFileName;

    // Delete Epub File
    await deleteAsync(bookUri, { idempotent: true });

    // Generate json file uri
    const jsonFileName = fileName.replace(/\.epub$/i, ".json");
    const booksMetadataDir = documentDirectory + "books-metadata";
    const bookMetadataUri = booksMetadataDir + jsonFileName;

    // Delete json file
    await deleteAsync(bookMetadataUri, { idempotent: true });

    return;
  } catch (error) {
    console.log(error);
  }
};

export const downloadEpubFile: (
  signedUrl: string,
  data: Book,
) => Promise<FileSystemDownloadResult | undefined> = async (
  signedUrl: string,
  data: Book,
) => {
  try {
    const bookData = data;
    // Create a directory uri
    const dirUri = documentDirectory + "books/";
    // Find out if there is an existing direction at this uri.
    const dirInfo = await getInfoAsync(dirUri);
    // if there is no directory, create one. If there is a directory, skip the creation step.
    if (!dirInfo.exists || !dirInfo.isDirectory) {
      await makeDirectoryAsync(dirUri, { intermediates: true });
    }
    // Create an epub file uri
    const fileUri = dirUri + bookData.fileName;
    // Check if there is any file at this fileUri.
    const fileInfo = await getInfoAsync(fileUri);
    // If there is no file at this fileUri, download the file and save it at the uri.
    if (!fileInfo.exists) {
      const file = await downloadAsync(signedUrl, fileUri);
      return file;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveDataToJsonFile = async (
  epubFileUri: string,
  bookData: Book,
) => {
  try {
    const enhancedBookData = {
      bookData: bookData,
      epubFileUri: epubFileUri,
    };

    const dirUri = documentDirectory + "books-metadata/";

    const dirInfo = await getInfoAsync(dirUri);

    if (!dirInfo.exists || !dirInfo.isDirectory) {
      await makeDirectoryAsync(dirUri, { intermediates: true });
    }

    // Create a json file uri
    const jsonFileName = bookData.fileName.replace(/\.epub$/i, ".json");
    const jsonFileUri = dirUri + jsonFileName;
    // const file = new File(jsonFileUri);
    const stringifiedBookData = JSON.stringify(enhancedBookData);
    await writeAsStringAsync(jsonFileUri, stringifiedBookData);
    const newFile = await readAsStringAsync(jsonFileUri);
    return newFile;
  } catch (error) {
    console.log(error);
  }
};

export const getBook = async (signedUrl: string, bookData: Book) => {
  try {
    const epubFile = await downloadEpubFile(signedUrl, bookData);
    if (!epubFile) return;
    const jsonFile: string | undefined = await saveDataToJsonFile(
      epubFile.uri,
      bookData,
    );
    const bookFile = {
      epub: epubFile,
      json: jsonFile,
    };

    return bookFile;
  } catch (error) {
    console.log(error);
  }
};

export const getEpubFile = async (directoryName: string, fileName: string) => {
  const dir = await readDirectoryAsync(documentDirectory + "books/");
  const booksDir = documentDirectory + "books/";
  const bookUri = booksDir + fileName;
  return bookUri;
};

export const openBook = async (
  fileName: string,
): Promise<string | undefined> => {
  try {
    const epubFile = await getEpubFile("books", fileName);
    return epubFile;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const transformParagraph = (
  paragraphArray: string[],
  currentIndex: number,
) => {
  const text = paragraphArray[currentIndex];
  const words = text?.trim().split(/\s+/);
  const middle = Math.floor(words?.length / 2);
  const firstHalfText = words?.slice(0, middle).join(" ");
  const secondHalfText = words?.slice(middle).join(" ");

  return [
    ...paragraphArray.slice(0, currentIndex),
    firstHalfText,
    secondHalfText,
    ...paragraphArray.slice(currentIndex + 1),
  ];
};

export const xmlStringToTextsArray = async (xhtmlString: string) => {
  const doc = parseDocument(xhtmlString, { xmlMode: true });
  const allText: DomArray = DomUtils.findAll(
    (el) =>
      el.type === "tag" &&
      (el.name === "p" ||
        el.name === "h1" ||
        el.name === "h2" ||
        el.name === "h3" ||
        el.name === "a"),
    doc.children,
  );

  const texts = allText.map((el: Element) => ({
    tag: el.name,
    text: DomUtils.textContent(el)
      ?.trim()
      .replace(/\s*\r?\n\s*/g, " ") // remove line breaks with surrounding whitespace
      .replace(/\s+/g, " ") // collapse multiple whitespace into single space
      ?.trim(),

    meta: el.attribs ?? {},
  }));

  const array = Array.from(texts) as PageItem[];

  return array;
};

export const getMyBooks = async (books: Book[], dirSpecifier: string) => {
  const booksMetadataDir = documentDirectory + dirSpecifier + "/";
  const booksList = await readDirectoryAsync(booksMetadataDir);
  const fileNameSet = new Set();
  for (const book of booksList) {
    const bookUri = booksMetadataDir + book;
    const text = await readAsStringAsync(bookUri);
    const data = JSON.parse(text);
    fileNameSet.add(data.bookData.fileName);
  }
  let myBooks = [];
  for (const book of books) {
    if (fileNameSet.has(book.fileName)) {
      myBooks.push(book);
    }
  }
  return myBooks;
};

// export const getCurrentLocation = debounce(async (currentLocation: any) => {
// console.log(sta);
// Continue from here
// const response = await fetch(`${url}/update-cart`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });
// const resData = await response.json();
// return resData;
// }, 5000);
