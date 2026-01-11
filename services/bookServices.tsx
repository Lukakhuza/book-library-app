import { fetchBookSignedUrl } from "../api/book.api";

export const downloadBook = async (bookData: object) => {
  const url = await fetchBookSignedUrl(bookData);
};
