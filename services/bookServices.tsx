import { Directory, File, Paths } from "expo-file-system";
import { fetchBookSignedUrl, getAllBooks } from "../api/book.api";
import { resolveHref } from "../util/helperFunctions";
import { parseHTML } from "linkedom";
import { XMLParser } from "fast-xml-parser";
import JSZip, { forEach } from "jszip";

export const downloadBook = async (bookData: object) => {
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
    const epubFile = new File(bookUri);
    epubFile.delete();

    // Generate json file uri
    const jsonFileName = fileName.replace(/\.epub$/i, ".json");
    const booksMetadataDir = new Directory(
      Paths.document.uri,
      "books-metadata"
    );
    const bookMetadataUri = booksMetadataDir.uri + jsonFileName;

    // Delete json file
    const jsonFile = new File(bookMetadataUri);
    jsonFile.delete();

    return;
  } catch (error) {
    console.log(error);
  }
};

export const downloadEpubFile = async (signedUrl: string, data: object) => {
  try {
    const bookData: any = data;
    const booksDir = new Directory(Paths.document.uri, "books");

    if (!booksDir.exists) {
      booksDir.create();
    }

    // Create an epub file uri
    const fileUri = booksDir.uri + bookData.fileName;

    // Check if there is any info on this fileUri
    const info = new File(fileUri).info();

    // // Check for downloaded file Uri and set it to filePath
    let downLoadedFileUri: any = "";
    if (info.exists) {
      downLoadedFileUri = info.uri;
    } else {
      const downloadedFile = await File.downloadFileAsync(signedUrl, booksDir, {
        idempotent: true,
      });
      downLoadedFileUri = downloadedFile.uri;
    }
    const file = new File(downLoadedFileUri);
    return file;
  } catch (error) {
    console.log(error);
  }
};

export const saveDataToJsonFile = async (
  epubFileUri: string,
  bookData: any
) => {
  try {
    const enhancedBookData = {
      bookData: bookData,
      epubFileUri: epubFileUri,
    };
    const booksMetadataDir = new Directory(
      Paths.document.uri,
      "books-metadata"
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

export const getBook = async (signedUrl: string, bookData: object) => {
  try {
    const epubFile: any = await downloadEpubFile(signedUrl, bookData);
    const jsonFile = await saveDataToJsonFile(epubFile.uri, bookData);

    const bookFile = {
      epub: epubFile,
      json: jsonFile,
    };

    return bookFile;

    // It is working upto here. Continue from here on.
    const encoded: any = await epubFile?.base64();
    const zip = await JSZip.loadAsync(encoded, { base64: true });
    const zipObjects = Object.keys(zip.files);
    const content: any = await zip.file(zipObjects[5])?.async("text");
    // await zip.file("OEBPS/package.opf")?.async("text");

    const { document } = parseHTML(content);
    const title: string | undefined =
      document?.querySelector("h1.title")?.textContent;

    const body1: any = document?.querySelectorAll("p");
    const body2: any = body1.map((paragraph: any) => {
      return JSON.stringify(paragraph.textContent)
        .replaceAll(/\\n/g, " ")
        .replace(/^["']|["']$/g, "");
    });
    const chapter = {
      title: title,
      body: body2,
    };

    return chapter;
  } catch (error) {
    console.log(error);
  }
};

export const openBook = async (fileName: any) => {
  try {
    const booksDir = new Directory(Paths.document.uri, "books");
    const bookUri = booksDir.uri + fileName;
    const epubFile = new File(bookUri);
    const encoded = await epubFile.base64();
    const zip = await JSZip.loadAsync(encoded, { base64: true });
    const containerXmlFile: any = await zip
      .file("META-INF/container.xml")
      ?.async("text");

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });

    const parsed = parser.parse(containerXmlFile);

    const rootfiles = parsed.container.rootfiles.rootfile;
    const rootfile = Array.isArray(rootfiles) ? rootfiles[0] : rootfiles;

    const opfPath = rootfile["@_full-path"];
    const opfXml: any = await zip.file(opfPath)?.async("string");
    const parsedPackage = parser.parse(opfXml);

    // console.log("Parsed Package: ", parsedPackage);
    // console.log("Metadata", parsedPackage.package.metadata);
    // console.log(
    //   "Manifest",
    //   parsedPackage?.package?.manifest?.item[9]?.["@_href"]
    // );
    // console.log("Spine", parsedPackage.package.spine.itemref);

    type ManifestItem = {
      href: string;
      mediaType: string;
      properties?: string;
    };

    const manifest = parsedPackage.package?.manifest;
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
      // console.log(manifestItem);
      if (!manifestItem) continue;

      // Skip nav / TOC
      // if (manifestItem.properties?.includes("nav")) continue;

      // Only render XHTML
      if (manifestItem.mediaType !== "application/xhtml+xml") continue;

      spineHrefs.push(manifestItem.href);
    }

    const xhtmlPath = resolveHref(opfPath, spineHrefs[0]);

    // console.log("OBJ 2: ", obj2.html.body.div.div.div.div);
    const xhtmlString: any = await zip.file(xhtmlPath)?.async("string");
    // console.log("XHTML: ", xhtmlString);

    const cleaned = xhtmlString
      .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
      .replace(/<!DOCTYPE[\s\S]*?>\s*/i, "")
      .trim();

    const parser2 = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });

    const obj = parser2.parse(cleaned);

    const data = {
      opfPath: opfPath,
      html: obj.html,
      epubFile: epubFile,
      spineHrefs: spineHrefs,
      xhtmlString: xhtmlString,
    };

    return data;
    console.log("Table of Contents: ", obj.html.body.div.div["#text"]);
    console.log("Title: ", obj.html.head.title);
    console.log("Title: ", obj.html.body.div.nav.ol);

    console.log(obj.html.body.div.nav.ol.li[1]);

    console.log(obj.html.body.div.nav.ol.li[1].ol.li);
    // const { document } = parseHTML(xhtmlString);
    // const content = document.querySelector("head");
    // console.log(content);

    return;
    const parsed2 = parser.parse(xhtmlString);
    // const content: any = await zip.file(zipObjects[4])?.async("text");
    // const contentPackage: any = await zip
    //   .file("OEBPS/package.opf")
    //   ?.async("text");

    // return;
    const title: string | undefined =
      document?.querySelector("h1.title")?.textContent;

    const body1: any = document?.querySelectorAll("p");
    const body2: any = body1.map((paragraph: any) => {
      return JSON.stringify(paragraph.textContent)
        .replaceAll(/\\n/g, " ")
        .replace(/^["']|["']$/g, "");
    });
    const chapter = {
      title: title,
      body: body2,
    };

    return chapter;
  } catch (error) {
    console.log(error);
  }
};

export const paginateText = (
  textLayouts: any,
  readerDimensions: any,
  properties: any
) => {
  try {
    const availableHeight =
      readerDimensions.height - properties.verticalPadding * 2;
    const MAX_LINES_PER_PAGE = Math.floor(
      availableHeight / properties.lineHeight
    );

    const pages: string[][] = [];
    let lineIndex = 0;
    let currentPage: any = [];

    // for (let i = 0; i < textLayouts.current.length; i++) {
    //   for (let j = 0; j < textLayouts.current[i].length; j++) {
    //     currentPage.push(textLayouts.current[i][j].text.trim());
    //     if (lineIndex % 34 === 0) {
    //       pages.push(currentPage);
    //       currentPage = [];
    //     }
    //     lineIndex++;
    //   }
    //   if (currentPage.length !== 0) {
    //     currentPage.push("");
    //     if (lineIndex % 34 === 0) {
    //       pages.push(currentPage);
    //       currentPage = [];
    //     }
    //     lineIndex++;
    //   }
    // }
    // pages.push(currentPage);

    for (let i = 0; i < textLayouts.current.length; i++) {
      for (let j = 0; j < textLayouts.current[i].length; j++) {
        currentPage.push(textLayouts.current[i][j].text.trim());
        lineIndex++;
        if (lineIndex % 34 === 0) {
          pages.push(currentPage);
          currentPage = [];
        }
      }
      if (currentPage.length === 0) {
        continue;
      }
      currentPage.push("");
      lineIndex++;
      if (lineIndex % 34 === 0) {
        pages.push(currentPage);
        currentPage = [];
      }
    }
    pages.push(currentPage);

    return pages;
  } catch (error) {
    console.log(error);
  }
};
