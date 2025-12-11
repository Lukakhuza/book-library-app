import { useEffect, useState } from "react";
import { File } from "expo-file-system";
import { FlatList, Dimensions, ScrollView, Text, View } from "react-native";
import JSZip from "jszip";
import { parseHTML } from "linkedom";

const Reader2 = ({ filePath }: { filePath: string }) => {
  const [chapter, setChapter] = useState<any>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

  //   console.log("Height: ", screenHeight);
  //   console.log("Width: ", screenWidth);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const file = new File(filePath);
        const encoded = await file.base64();
        const zip = await JSZip.loadAsync(encoded, { base64: true });
        const zipObjects = Object.keys(zip.files);
        const content: any = await zip.file(zipObjects[6])?.async("text");
        const { document } = parseHTML(content);
        const title: any = document?.querySelector("h1.title")?.textContent;
        const body1: any = document?.querySelectorAll("p");

        const body2: any = body1.map((paragraph: any) => {
          return paragraph.textContent;
        });
        const body3 = body2.join("\n\n");
        console.log("Full Text: ", body3);

        const chapter = {
          title: title,
          body: body3,
        };

        setChapter(chapter);
      } catch (error) {
        console.log(error);
      }
    };
    loadBook();
  }, [filePath]);

  return (
    <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 25 }}>
      {chapter ? (
        <View>
          <Text style={{ textAlign: "center" }}>{chapter.title}</Text>
          <ScrollView>
            <Text>{chapter.body}</Text>
          </ScrollView>
        </View>
      ) : (
        <Text>No Data</Text>
      )}
    </View>
  );
};

export default Reader2;
