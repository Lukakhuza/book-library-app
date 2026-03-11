import JSZip from "jszip";
import { ElementType } from "htmlparser2";

export type Book = {
  __v: number;
  book_id: string;
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

export interface DomElement {
  type: any;
  name?: string;
  attribs: Record<string, string>;
  children: DomElement[];
  parent?: DomElement | null;
  next?: DomElement | null;
  prev?: DomElement | null;
  startIndex?: number | null;
  endIndex?: number | null;
}

export type DomArray = DomElement[];
