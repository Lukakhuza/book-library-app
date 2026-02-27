import JSZip from "jszip";

export type Book = {
  __v: number;
  _id: string;
  author: string;
  coverKey: string;
  epubKey: string;
  fileName: string;
  language: string;
  publishedYear: string;
  title: string;
};

export type BookRouteProps = {
  route: {
    key: string;
    name: string;
    params: {
      bookData: Book;
      path: string;
    };
  };
};

export type OpenBookResult = {
  opfPath: string;
  spineHrefs: string[];
  zip: JSZip;
};
