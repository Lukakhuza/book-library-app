import { Dimensions, StyleSheet, Text, View } from "react-native";
import { fetchBookSignedUrl } from "./api/book.api";
import { useEffect, useState } from "react";
import Reader from "./screens/Reader";
import ReaderContextProvider from "./store/ReaderContext";

export default function App() {
  const [signedUrl, setSignedUrl] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const url = await fetchBookSignedUrl();
      setSignedUrl(url);
    };
    load();
  }, []);

  return (
    <ReaderContextProvider>
      <View style={styles.container}>
        {signedUrl ? (
          <Reader signedUrl={signedUrl} />
        ) : (
          <View>
            <Text>No Book Selected</Text>
          </View>
        )}
      </View>
    </ReaderContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
