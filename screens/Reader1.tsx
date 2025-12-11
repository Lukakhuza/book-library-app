import { Text, View } from "react-native";
import WebView from "react-native-webview";

// src/epubReaderHtml.ts

export const EPUB_READER_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        background-color: #ffffff;
      }
      #viewer {
        height: 100%;
        width: 100%;
      }
      .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #555;
      }
    </style>
    <!-- EPUB.js from CDN -->
    <script src="https://unpkg.com/epubjs/dist/epub.js"></script>
  </head>
  <body>
    <div id="viewer"></div>
    <div id="loading" class="loader">Loading book…</div>

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

const Reader1 = ({ base64String }: any) => {
  console.log(base64String.length);
  return (
    <View>
      <Text style={{ flex: 1 }}>Hello World</Text>
      <WebView
        source={{
          uri: `data:application/epub+zip;base64,${base64String}`,
        }}
        style={{ flex: 1, backgroundColor: "blue" }}
      />
    </View>
  );
};

export default Reader1;
