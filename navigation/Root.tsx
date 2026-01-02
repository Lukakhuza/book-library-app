// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   useWindowDimensions,
//   Pressable,
// } from "react-native";
// import { fetchBookSignedUrl } from "../api/book.api";
// import { useContext, useEffect, useState } from "react";
// import Reader from "../screens/Reader";
// import ReaderContextProvider, { ReaderContext } from "../store/ReaderContext";
// import LoadingOverlay from "../util/LoadingOverlay";
// // import Home from "../screens/Home";
// import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// // import { NavigationContainer } from "@react-navigation/native";
// import ReaderReadingPhase from "../components/organisms/ReaderReadingPhase";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import BookStack from "./BookStack";
// import ReaderMeasurementPhase from "../components/organisms/ReaderMeasurementPhase";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const Theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: "green",
//   },
// };
// const Home = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "yellow",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Text>Home Page</Text>
//     </View>
//   );
// };

// const Stack = createNativeStackNavigator();

// const BookStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="HomeScreen"
//         component={Home}
//         options={{
//           headerShown: false,
//           contentStyle: { backgroundColor: "#fff" },
//           animation: "none",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// const Root = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <View style={styles.safeArea}>
//           <NavigationContainer theme={Theme}>
//             <View style={{ height: "100%" }}>
//               <BookStack />
//               <Text>Hello</Text>
//             </View>
//           </NavigationContainer>
//         </View>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default Root;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "blue",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
// });
