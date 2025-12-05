import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { fetchBook } from "./api/book.api";
import MainScreen from "./screens/MainScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [signedUrl, setSignedUrl] = useState(null);
  useEffect(() => {
    const load = async () => {
      const result = await fetchBook();
      console.log("Test 0", result);
      setSignedUrl(result);
    };
    load();
  }, []);

  return <MainScreen signedUrl={signedUrl} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
