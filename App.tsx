import { StyleSheet, View } from "react-native";
import Root from "./navigation/Root";
import ReaderContextProvider from "./store/ReaderContext";

export default function App() {
  return (
    <View style={styles.container}>
      <ReaderContextProvider>
        <Root />
      </ReaderContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
