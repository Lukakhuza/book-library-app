export const fetchBook = async () => {
  const response = await fetch("http://10.0.2.2:3000/book/fetch-books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  return resData;
};
