import { Directory, Paths } from "expo-file-system";
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
