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

export const asArray = (value: any) => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
};

const isObj = (v: any) => v && typeof v === "object" && !Array.isArray(v);

// Collects ALL descendant text (including spans/em/strong, etc.)
export const getTextDeep = (node: any) => {
  console.log("Test 4", node.div);
  if (node == null) return "";
  if (typeof node === "string") return node;

  // fast-xml-parser style
  if (typeof node["#text"] === "string") return node["#text"];

  if (!isObj(node)) return "";

  // console.log(node);
  let out = "";
  for (const key of Object.keys(node)) {
    if (key.startsWith("@_")) continue; // ignore attributes
    const child = node[key];

    for (const c of asArray(child)) {
      const t = getTextDeep(c);

      if (t) out += (out ? "TT1" : "TT2") + t;
    }
  }

  return out.replace(/\s+/g, " ").trim();
};

export const mapContent = (data: any) => {
  console.log(data);
};
