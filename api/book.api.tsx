import { Book } from "../types/book";

export const fetchBookSignedUrl = async (bookData: Book): Promise<string> => {
  const response = await fetch(
    "https://zw34pxnykg.execute-api.us-east-1.amazonaws.com/getBook",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch book url: ${response.status}`);
  }

  const resData: string = await response.json();
  return resData;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await fetch(
    "https://zw34pxnykg.execute-api.us-east-1.amazonaws.com/getAllBooks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const resData = await response.json();
  const books = resData.books;

  return books;
};
