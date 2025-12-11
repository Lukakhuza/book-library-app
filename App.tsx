import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchBook } from "./api/book.api";
import { useEffect, useState } from "react";
import { Paths, Directory, File } from "expo-file-system";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system/build/ExpoFileSystem.types";
import { readAsStringAsync } from "expo-file-system/legacy";
// import Reader1 from "./screens/Reader1";
import EpubWebView from "./screens/EPubWebView";
import Reader2 from "./screens/Reader2";

export default function App() {
  const [base64StringState, setBase64StringState] = useState("");
  const loadFunction = async () => {
    // const result = await fetchBook();
    // const booksDir = new Directory(Paths.document.uri, "books");

    const base64String: string = await readAsStringAsync(
      "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub",
      {
        encoding: "base64",
      }
    );

    // const signedUrl =
    //   "https://books-library-app.s3.eu-north-1.amazonaws.com/the-bell-jar-by-sylvia-plath.epub?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5HOVVHUQDSVM3WF%2F20251206%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20251206T080646Z&X-Amz-Expires=300&X-Amz-Signature=22fc9aa884f915d0a8249eded1d1666e8c4d4b03a364790eb084f676cdf19e6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject";

    // if (!booksDir.exists) {
    //   booksDir.create();
    // }

    // const base64 = new File(booksDir, { encoding: EncodingType.Base64 }).text();

    setBase64StringState(base64String);

    // const downloadedFile = await File.downloadFileAsync(signedUrl, booksDir);
    // return "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub";
    return base64String;
  };

  loadFunction();

  // const localPath =
  //   "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub";
  // const [signedUrl, setSignedUrl] = useState(null);
  useEffect(() => {
    const load = async () => {
      // const result = await fetchBook();

      const base64String = await readAsStringAsync(
        "file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub",
        {
          encoding: "base64",
        }
      );

      setBase64StringState(base64String);
      // setSignedUrl(result);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      {base64StringState.length > 0 && (
        <Reader2 filePath="file:///data/user/0/com.lukakhuza.BookLibraryApp/files/books/the-bell-jar-by-sylvia-plath.epub" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
