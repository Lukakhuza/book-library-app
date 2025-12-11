import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { getInfoAsync, readAsStringAsync } from "expo-file-system/legacy";
import JSZip from "jszip";

const EPUB_READER_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/epubjs/dist/epub.js"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
      }
      #viewer {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>

  <body>
    <div id="viewer"></div>

    <script>
  // Support BOTH iOS and Android
  function receiveMessage(event) {
    var base64 = event.data;

    try {
      var book = ePub("data:application/epub+zip;base64," + base64);
      var rendition = book.renderTo("viewer", {
        width: "100%",
        height: "100%",
        flow: "paginated",
      });

      rendition.display();
    } catch (err) {
      document.body.innerHTML = "<pre>Error: " + err.message + "</pre>";
    }
  }

  // iOS
  document.addEventListener("message", receiveMessage);
  // Android
  window.addEventListener("message", receiveMessage);
</script>
  </body>
</html>
`;

export default function EpubWebView({ filePath }: { filePath: string }) {
  //   const webViewRef: any = useRef(null);
  const webViewRef = useRef<WebView>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [webViewReady, setWebViewReady] = useState(false);

  // 1. Read EPUB file as base64
  useEffect(() => {
    const loadBook = async () => {
      try {
        // Ensure file exists
        const info = await getInfoAsync(filePath);
        console.log("INFO: ", info);

        const encoded = await readAsStringAsync(filePath, {
          encoding: "base64",
        });
        console.log("First 50 chars:", encoded.slice(0, 50));

        const inspectEpub = async (base64: string) => {
          const zip = await JSZip.loadAsync(base64, { base64: true });
          const content = await zip.file("OEBPS/ch04.xhtml")?.async("text");
          console.log("OPF File:", content);
          //   console.log("ZIP entries:", Object.keys(zip.files));
        };

        inspectEpub(encoded);
        // console.log("File Path: ", filePath);
        // if (!info.exists || info.isDirectory) {
        //   console.log("Info :", info);
        //   console.error("❌ EPUB file does not exist:", filePath);
        //   return;
        // }

        // const encoded = await readAsStringAsync(filePath, {
        //   encoding: "base64",
        // });

        // setBase64(encoded);
      } catch (err) {
        console.error("❌ Failed to read EPUB:", err);
      }
    };

    loadBook();
  }, [filePath]);

  // 2. Send base64 to WebView once both are ready
  useEffect(() => {
    if (base64 && webViewReady && webViewRef.current) {
      console.log("WVR ", webViewRef.current);
      webViewRef.current.injectJavaScript(`
      window.ReactNativeWebView.postMessage("READY");
    `);
    }
  }, [base64, webViewReady]);

  return (
    <View style={{ flex: 1, backgroundColor: "yellow" }}>
      {(!base64 || !webViewReady) && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {/* <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: EPUB_READER_HTML }}
        javaScriptEnabled
        onMessage={(event) => {
          if (event.nativeEvent.data === "WEBVIEW_READY") {
            setWebViewReady(true);
          }
        }}
        style={{ flex: 1 }}
      /> */}
    </View>
  );
}
