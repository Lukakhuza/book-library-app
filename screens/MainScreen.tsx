import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const MainScreen = ({ signedUrl }: any) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
      </head>
      <body style="margin:0;padding:0;overflow:hidden;height:100vh;">
      <div id="viewer" style="width:100%; height:100vh;"></div>
        <script>
          var book = ePub("${signedUrl}");
          var rendition = book.renderTo("viewer", { width: "100%", height: "100%" });
          rendition.display();
        </script>
      </body>
    </html>
  `;
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      onMessage={() => {
        console.log("Test 30");
      }}
      style={{
        backgroundColor: "blue",
        flex: 1,
        borderColor: "green",
        borderWidth: 3,
        height: "100%",
        width: "100%",
      }}
      allowFileAccess={true}
    />
  );
};

export default MainScreen;
