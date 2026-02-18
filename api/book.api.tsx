import { DomUtils, parseDocument } from "htmlparser2";
import { parseHTML } from "linkedom";

export const fetchBookSignedUrl = async (bookData: object) => {
  const response = await fetch("http://10.0.2.2:3000/book/fetch-books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });
  const resData = await response.json();
  return resData;
};

export const getAllBooks = async () => {
  const response = await fetch("http://10.0.2.2:3000/book/get-all-books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  return resData;
};
