import { FlatList, Dimensions, ScrollView, Text, View } from "react-native";
import { Paths, Directory, File } from "expo-file-system";

export const getDimensions = () => {
  return Dimensions.get("screen");
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const resolveHref = (opfPath: string, href: string) => {
  const baseDir = opfPath.slice(0, opfPath.lastIndexOf("/") + 1);
  return baseDir + href;
};
