import { useEffect, useState } from "react";
import { File } from "expo-file-system";
import { FlatList, Dimensions, ScrollView, Text, View } from "react-native";
import JSZip from "jszip";
import { parseHTML } from "linkedom";

const Reader2 = ({ filePath }: { filePath: string }) => {
  const [chapterHtml, setChapterHtml] = useState("");
  const [chapterText, setChapterText] = useState("");
  const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

  console.log("Height: ", screenHeight);
  console.log("Width: ", screenWidth);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const file = new File(filePath);
        const encoded = await file.base64();
        const zip = await JSZip.loadAsync(encoded, { base64: true });
        const zipObjects = Object.keys(zip.files);
        const content: any = await zip.file(zipObjects[6])?.async("text");
        setChapterHtml(content);
        const { document } = parseHTML(content);
        const title: any = document?.querySelector("h1.title")?.textContent;
        const paragraphs: any = document?.querySelectorAll("p");
        const paragraphsTextContent = paragraphs.map((paragraph: any) => {
          return paragraph.textContent;
        });
        console.log(paragraphsTextContent);
        const fullText = paragraphsTextContent.join("\n\n");
        setChapterText(fullText);
        setChapterHtml(title);
      } catch (error) {
        console.log(error);
      }
    };
    loadBook();
  }, [filePath]);

  return (
    <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 25 }}>
      <Text style={{ textAlign: "center" }}>{chapterHtml}</Text>
      <ScrollView>
        <Text>{chapterText}</Text>
      </ScrollView>
    </View>
  );
};

export default Reader2;
