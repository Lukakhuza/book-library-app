import JSZip from "jszip";
import { ElementType } from "htmlparser2";
import { Element } from "domhandler";

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

export type Tag = "p" | "h1" | "h2" | "h3" | "a";

export type PageItem = {
  meta: Record<string, unknown> | string;
  text: string;
  tag: Tag;
};

export type Page = PageItem[];
export type Pages = Page[];

export type LeftoverText = {
  meta: Record<string, unknown> | string;
  text: string;
  tag: Tag;
} | null;

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

export type DomArray = Element[];
