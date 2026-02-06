import { FlatList, Dimensions, ScrollView, Text, View } from "react-native";
import { Paths, Directory, File } from "expo-file-system";
import { XMLParser } from "fast-xml-parser";

export const getDimensions = () => {
  return Dimensions.get("screen");
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const resolveHref = (opfPath: string, href: string) => {
  const baseDir = opfPath.slice(0, opfPath.lastIndexOf("/") + 1);
  return baseDir + href;
};

export const asArray = (value: any) => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
};

export const parser1 = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export const parser2 = new XMLParser({
  ignoreAttributes: false,
  trimValues: true,
});
