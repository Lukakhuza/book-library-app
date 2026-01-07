import { useColorScheme } from "react-native";
import {
  createStaticNavigation,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import ReaderContextProvider from "./store/ReaderContext";
import RootStack from "./navigation/RootStack";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ddb52f",
    primary: "rgba(10, 13, 222, 1)",
    card: "rgb(120,120,120)",
  },
};

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const scheme = useColorScheme();
  return (
    <ReaderContextProvider>
      <Navigation theme={scheme === "dark" ? DarkTheme : MyTheme} />
    </ReaderContextProvider>
  );
}
