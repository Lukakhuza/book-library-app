import { Book } from "../types/book";

export const fetchBookSignedUrl = async (bookData: Book): Promise<string> => {
  const response = await fetch("http://10.0.2.2:3000/book/fetch-books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch book url: ${response.status}`);
  }

  const resData: string = await response.json();
  return resData;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await fetch("http://10.0.2.2:3000/book/get-all-books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const resData: Book[] = await response.json();

  return resData;
};
