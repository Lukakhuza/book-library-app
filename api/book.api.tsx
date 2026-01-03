export const fetchBookSignedUrl = async () => {
  const response = await fetch("http://10.0.2.2:3000/book/fetch-books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
