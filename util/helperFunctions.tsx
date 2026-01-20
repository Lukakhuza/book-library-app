import { FlatList, Dimensions, ScrollView, Text, View } from "react-native";
import JSZip from "jszip";
import { parseHTML } from "linkedom";
import { Paths, Directory, File } from "expo-file-system";

export const getDimensions = () => {
  return Dimensions.get("screen");
};

export const getBook = async (signedUrl: string, bookData: object) => {
  try {
    const epubFile = await downloadEpubFile(signedUrl, bookData);
    await saveDataToJsonFile(epubFile.uri, bookData);

    const encoded = await epubFile.base64();
    const zip = await JSZip.loadAsync(encoded, { base64: true });
    const zipObjects = Object.keys(zip.files);
    // console.log(zipObjects);
    const content: any = await zip.file(zipObjects[5])?.async("text");
    // console.log(content);
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

export const paginateText = (
  textLayouts: any,
  readerDimensions: any,
  properties: any
) => {
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
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const downloadEpubFile = async (signedUrl: string, data: object) => {
  const bookData = data;
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
};

const saveDataToJsonFile = async (epubFileUri: string, bookData: object) => {
  const enhancedBookData = {
    bookData: bookData,
    epubFileUri: epubFileUri,
  };
  const booksMetadataDir = new Directory(Paths.document.uri, "books-metadata");

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
};
