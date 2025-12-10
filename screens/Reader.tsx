import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

type Props = {
  fileUri: string; // local path to your downloaded .epub
};
const BOOK_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <style>
      html, body, #viewer {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: #ffffff;
      }
    </style>
    <!-- Load EPUB.js from CDN -->
    <script src="https://unpkg.com/epubjs/dist/epub.js"></script>
  </head>
  <body>
    <div id="viewer"></div>
    <script>
      (function () {
        var book = null;
        var rendition = null;

        function log(msg) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "LOG", message: msg })
            );
          }
        }

        // Called from React Native via injectedJavaScript
        window.initBook = function (bookPath) {
          try {
            log("Opening book: " + bookPath);
            book = ePub(bookPath); // EPUB.js handles the zip internally

            rendition = book.renderTo("viewer", {
              width: "100%",
              height: "100%",
              flow: "paginated",
              spread: "always"
            });

            rendition.display();

            book.ready.then(function () {
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({ type: "READY" })
                );
              }
            });
          } catch (e) {
            log("Error in initBook: " + e.message);
          }
        };

        function handleCommand(raw) {
          try {
            var data = JSON.parse(raw);
            if (!rendition) return;

            if (data.type === "NEXT") {
              rendition.next();
            } else if (data.type === "PREV") {
              rendition.prev();
            }
          } catch (e) {
            log("handleCommand error: " + e.message);
          }
        }

        // Messages from React Native
        document.addEventListener("message", function (event) {
          handleCommand(event.data);
        });

        // iOS sometimes uses window for message events
        window.addEventListener("message", function (event) {
          handleCommand(event.data);
        });
      })();
    </script>
  </body>
</html>
`;

export const Reader: React.FC<Props> = ({ fileUri }) => {
  const webViewRef = useRef<WebView>(null);

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "LOG") {
        console.log("[EPUB LOG]", data.message);
      }
      if (data.type === "READY") {
        console.log("Book is ready");
      }
    } catch {
      // ignore non-JSON messages
    }
  };

  const sendCommand = (type: "NEXT" | "PREV") => {
    webViewRef.current?.postMessage(JSON.stringify({ type }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: BOOK_HTML, baseUrl: "https://localhost" }}
        javaScriptEnabled
        allowFileAccess
        allowingReadAccessToURL={fileUri} // iOS safety
        onMessage={onMessage}
        injectedJavaScript={`
          window.initBook(${JSON.stringify(fileUri)});
          true; // required for injectedJavaScript
        `}
        style={{ flex: 1 }}
      />

      {/* Simple pagination controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => sendCommand("PREV")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => sendCommand("NEXT")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#111",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
// import * as Epub from "@ndvi3t/epubjs-rn";
// import { View, Text, StyleSheet } from "react-native";

// export default function Reader() {
//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//     // <Epub
//     //   src={{
//     //     uri: "https://books-library-app.s3.eu-north-1.amazonaws.com/the-bell-jar-by-sylvia-plath.epub?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV5HOVVHUQDSVM3WF%2F20251205%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20251205T180333Z&X-Amz-Expires=300&X-Amz-Signature=de7e669481f853776cb3490b2c8afd2f3f24012827db4f500e98d03ad5e0e070&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
//     //   }}
//     //   flow="paginated"
//     //   style={{ flex: 1 }}
//     // />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
