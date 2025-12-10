import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { fetchBook } from "./api/book.api";
import { useEffect, useState } from "react";
import { Paths, Directory, File } from "expo-file-system";
import * as Webview from "react-native-webview";

export default function App() {
  const loadFunction = async () => {
    // console.log(Webview);
    const result = await fetchBook();
    console.log(result);
    const booksDir = new Directory(Paths.document.uri, "books");

    const signedUrl =
      "https://books-library-app.s3.eu-north-1.amazonaws.com/the-bell-jar-by-sylvia-plath.epub?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5HOVVHUQDSVM3WF%2F20251206%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20251206T080646Z&X-Amz-Expires=300&X-Amz-Signature=22fc9aa884f915d0a8249eded1d1666e8c4d4b03a364790eb084f676cdf19e6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject";

    if (!booksDir.exists) {
      booksDir.create();
    }

    console.log(booksDir.list());

    // const downloadedFile = await File.downloadFileAsync(signedUrl, booksDir);
    return "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub";
  };

  loadFunction();

  const localPath =
    "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub";
  // const [signedUrl, setSignedUrl] = useState(null);
  useEffect(() => {
    const load = async () => {
      const result = await fetchBook();
      // setSignedUrl(result);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Heeellloooo</Text>
    </View>
  );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
