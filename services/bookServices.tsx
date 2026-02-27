import { Directory, File, Paths, FileInfo } from "expo-file-system";
import { fetchBookSignedUrl, getAllBooks } from "../api/book.api";
import { resolveHref } from "../util/helperFunctions";
import { parseHTML } from "linkedom";
import { XMLParser } from "fast-xml-parser";
import { parser1, parser2 } from "../util/helperFunctions";
import JSZip, { forEach } from "jszip";
import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import { Book, OpenBookResult } from "../types/book";

export const downloadBook = async (bookData: Book) => {
  try {
    // Get signed url
    const signedUrl = await fetchBookSignedUrl(bookData);
    // // Download the epub file and the book metadata into the file system:
    const bookFile = await getBook(signedUrl, bookData);
    return bookFile;
  } catch (error) {
    console.log(error);
  }
};

export const getDownloadedBooks = async () => {
  try {
    const allBooks = await getAllBooks();

    const booksDir = new Directory(Paths.document.uri, "books");
    const booksList = booksDir.list();

    // const downloadedSet = new Set(booksList.map((book) => book.fileName));

    // const downloadedBooks = allBooks.filter((book) => {
    //   return true;
    // });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromMyBooks = async (fileName: string) => {
  try {
    // Generate epub file uri
    const epubFileName = fileName;
    const booksDir = new Directory(Paths.document.uri, "books");
    const bookUri = booksDir.uri + epubFileName;

    // Delete Epub File
    const epubFile: File = new File(bookUri);
    epubFile.delete();

    // Generate json file uri
    const jsonFileName = fileName.replace(/\.epub$/i, ".json");
    const booksMetadataDir = new Directory(
      Paths.document.uri,
      "books-metadata",
    );
    const bookMetadataUri = booksMetadataDir.uri + jsonFileName;

    // Delete json file
    const jsonFile: File = new File(bookMetadataUri);
    jsonFile.delete();

    return;
  } catch (error) {
    console.log(error);
  }
};

// type FileInfo = {
//   contentUri: string;
//   creationTime: number | null;
//   exists: boolean;
//   md5: string | null;
//   modificationTime: number | null;
//   size: number;
//   type: string;
//   uri: string;
// };

export const downloadEpubFile = async (signedUrl: string, data: Book) => {
  try {
    const bookData = data;
    const booksDir = new Directory(Paths.document.uri, "books");

    if (!booksDir.exists) {
      booksDir.create();
    }

    // Create an epub file uri
    const fileUri = booksDir.uri + bookData.fileName;

    // Check if there is any info on this fileUri
    const info = new File(fileUri).info();
    console.log(info);

    // // Check for downloaded file Uri and set it to filePath
    let downLoadedFileUri: string = "";
    if (info.exists && info.uri) {
      downLoadedFileUri = info.uri;
    } else {
      const downloadedFile = await File.downloadFileAsync(signedUrl, booksDir, {
        idempotent: true,
      });
      downLoadedFileUri = downloadedFile.uri;
    }
    const file: File = new File(downLoadedFileUri);

    return file;
  } catch (error) {
    console.log(error);
  }
};

export const saveDataToJsonFile = async (
  epubFileUri: string,
  bookData: Book,
) => {
  try {
    const enhancedBookData = {
      bookData: bookData,
      epubFileUri: epubFileUri,
    };
    const booksMetadataDir = new Directory(
      Paths.document.uri,
      "books-metadata",
    );

    // If books metadata directory doesn't exist, create it:
    if (!booksMetadataDir.exists) {
      booksMetadataDir.create();
    }

    // Create a json file uri
    const jsonFileName = bookData.fileName.replace(/\.epub$/i, ".json");
    const jsonFileUri = booksMetadataDir.uri + jsonFileName;
    const file = new File(jsonFileUri);
    const stringifiedBookData = JSON.stringify(enhancedBookData);
    file.write(stringifiedBookData);
    const newFile = await new File(jsonFileUri).text();
    return newFile;
  } catch (error) {
    console.log(error);
  }
};

export const getBook = async (signedUrl: string, bookData: Book) => {
  try {
    const epubFile = await downloadEpubFile(signedUrl, bookData);
    if (!epubFile) return;
    const jsonFile = await saveDataToJsonFile(epubFile.uri, bookData);

    const bookFile = {
      epub: epubFile,
      json: jsonFile,
    };

    return bookFile;
  } catch (error) {
    console.log(error);
  }
};

export const getEpubFile = (directoryName: string, fileName: string) => {
  const booksDir = new Directory(Paths.document.uri, "books");
  const bookUri = booksDir.uri + fileName;
  const epubFile = new File(bookUri);
  return epubFile;
};

export const getZip = async (epubFile: File) => {
  console.log("Hiiii", epubFile);
  const encoded = await epubFile.base64();
  const zip = await JSZip.loadAsync(encoded, { base64: true });
  return zip;
};

export const getOpfPath = async (zip: JSZip) => {
  const containerXmlFile = await zip
    .file("META-INF/container.xml")
    ?.async("text");

  if (!containerXmlFile) return;
  const parsed = parser1.parse(containerXmlFile);

  const rootfiles = parsed.container.rootfiles.rootfile;
  const rootfile = Array.isArray(rootfiles) ? rootfiles[0] : rootfiles;

  const opfPath = rootfile["@_full-path"];
  return opfPath;
};

export const getSpineHrefs = (parsedPackage: any) => {
  type ManifestItem = {
    href: string;
    mediaType: string;
    properties?: string;
  };

  const items = parsedPackage.package?.manifest?.item;

  if (!items) {
    throw new Error("OPF manifest missing");
  }

  const manifestItems = Array.isArray(items) ? items : [items];
  const manifestMap = new Map<string, ManifestItem>();

  for (const item of manifestItems) {
    const id = item["@_id"];
    const href = item["@_href"];
    const mediaType = item["@_media-type"];
    const properties = item["@_properties"];

    if (!id || !href || !mediaType) continue;

    manifestMap.set(id, {
      href,
      mediaType,
      properties,
    });
  }

  const itemrefs = parsedPackage?.package?.spine?.itemref;

  if (!itemrefs) {
    throw new Error("OPF spine missing");
  }

  const spineItems = Array.isArray(itemrefs) ? itemrefs : [itemrefs];
  const spineHrefs: string[] = [];
  for (const itemref of spineItems) {
    const idref = itemref["@_idref"];
    const linear = itemref["@_linear"];

    if (!idref) continue;
    if (linear === "no") continue;

    const manifestItem = manifestMap.get(idref);
    if (!manifestItem) continue;

    // Skip nav / TOC
    if (manifestItem.properties?.includes("nav")) continue;

    // Only render XHTML
    if (manifestItem?.mediaType !== "application/xhtml+xml") continue;

    spineHrefs.push(manifestItem.href);
  }
  return spineHrefs;
};

export const getXhtmlPath = (
  opfPath: string,
  spineHrefs: string[],
  currentSpineIndex: number,
) => {
  const xhtmlPath = resolveHref(opfPath, spineHrefs[currentSpineIndex]);
  return xhtmlPath;
};

export const openBook = async (fileName: string): Promise<OpenBookResult> => {
  try {
    const epubFile = getEpubFile("books", fileName);
    const zip = await getZip(epubFile);
    const opfPath = await getOpfPath(zip);
    const opfXml: any = await zip.file(opfPath)?.async("string");
    const parsedPackage = parser1.parse(opfXml);
    const spineHrefs = getSpineHrefs(parsedPackage);

    const data = {
      opfPath: opfPath,
      spineHrefs: spineHrefs,
      zip: zip,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const paginateText = (
  textLayouts: any,
  readerDimensions: any,
  properties: any,
) => {
  try {
    const lineProperties = {
      ascender: textLayouts.current[1].lines[0].ascender,
      capHeight: textLayouts.current[1].lines[0].capHeight,
      descender: textLayouts.current[1].lines[0].descender,
      height: textLayouts.current[1].lines[0].height,
      text: textLayouts.current[1].lines[0]?.text,
      width: textLayouts.current[1].lines[0].width,
      x: textLayouts.current[1].lines[0].x,
      xHeight: textLayouts.current[1].lines[0].xHeight,
      y: textLayouts.current[1].lines[0].y,
    };

    const availableHeight =
      readerDimensions.height - properties.verticalPadding;

    let currentPageHeightUsed = 0;
    const pages: string[][] = [];
    let currentPage: any = [];
    let currentText = "";
    let currentTag = "";
    let data = {
      text: "",
      tag: "",
    };

    for (let i = 0; i < textLayouts?.current?.length; i++) {
      currentTag = textLayouts.current[i].tag;
      for (let j = 0; j < textLayouts?.current[i]?.lines?.length; j++) {
        if (
          currentPageHeightUsed + textLayouts?.current[i]?.lines[j]?.height <=
          availableHeight
        ) {
          currentText += " " + textLayouts.current[i].lines[j]?.text?.trim();

          currentPageHeightUsed += textLayouts.current[i].lines[j].height;
        } else {
          data = {
            text: currentText?.trim(),
            tag: currentTag,
          };
          currentPage.push(data);
          pages.push(currentPage);
          currentText = "";
          currentPage = [];
          currentPageHeightUsed = 0;
          currentText += " " + textLayouts.current[i].lines[j]?.text?.trim();
          currentPageHeightUsed += textLayouts.current[i].lines[j].height;
        }
      }
      data = {
        text: currentText?.trim(),
        tag: currentTag,
      };
      currentPage.push(data);
      currentText = "";
    }
    pages.push(currentPage);

    return pages;
  } catch (error) {
    console.log(error);
  }
};

export const transformParagraph = (
  paragraphArray: any,
  currentIndex: number,
) => {
  const text = paragraphArray[currentIndex];
  const words = text?.trim().split(/\s+/);
  const middle = Math.floor(words?.length / 2);
  const firstHalfText = words?.slice(0, middle).join(" ");
  const secondHalfText = words?.slice(middle).join(" ");

  return [
    ...paragraphArray.slice(0, currentIndex),
    firstHalfText,
    secondHalfText,
    ...paragraphArray.slice(currentIndex + 1),
  ];
};

export const xmlStringToTextsArray = async (xhtmlString: any) => {
  const doc = parseDocument(xhtmlString, { xmlMode: true });
  const allText: any = DomUtils.findAll(
    (el) =>
      el.type === "tag" &&
      (el.name === "p" ||
        el.name === "h1" ||
        el.name === "h2" ||
        el.name === "h3" ||
        el.name === "a"),
    doc.children,
  );

  const texts = allText.map((el: any) => ({
    tag: el.name,
    text: DomUtils.textContent(el)
      ?.trim()
      .replace(/\s*\r?\n\s*/g, " ") // remove line breaks with surrounding whitespace
      .replace(/\s+/g, " ") // collapse multiple whitespace into single space
      ?.trim(),

    meta: el.attribs ?? {},
  }));

  const array: any = Array.from(texts);
  return array;
};
