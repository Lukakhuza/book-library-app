import { Directory, File, Paths } from "expo-file-system";
import { fetchBookSignedUrl, getAllBooks } from "../api/book.api";
import { getBook } from "../util/helperFunctions";

export const downloadBook = async (bookData: object) => {
  // Get signed url
  const signedUrl = await fetchBookSignedUrl(bookData);
  // Download the epub file and the book metadata into the file system:
  const book = await getBook(signedUrl, bookData);
};

export const getDownloadedBooks = async () => {
  const allBooks = await getAllBooks();
  // console.log(allBooks);
  const booksDir = new Directory(Paths.document.uri, "books");
  const booksList = booksDir.list();
  // console.log(booksList);
  // const downloadedSet = new Set(booksList.map((book) => book.fileName));
  // console.log(fileNameSet);

  // const downloadedBooks = allBooks.filter((book) => {
  //   console.log("Test 5", book);
  //   return true;
  // });

  // console.log("Test 3", booksList.length);
};

export const deleteFromMyBooks = async (fileName: string) => {
  // Generate epub file uri
  const epubFileName = fileName;
  const booksDir = new Directory(Paths.document.uri, "books");
  const bookUri = booksDir.uri + epubFileName;

  // Delete Epub File
  const epubFile = new File(bookUri);
  epubFile.delete();

  // Generate json file uri
  const jsonFileName = fileName.replace(/\.epub$/i, ".json");
  const booksMetadataDir = new Directory(Paths.document.uri, "books-metadata");
  const bookMetadataUri = booksMetadataDir.uri + jsonFileName;

  // Delete json file
  const jsonFile = new File(bookMetadataUri);
  jsonFile.delete();
  return;
};
