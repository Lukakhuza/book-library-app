// import TextSize from "react-native-text-size";
// import { Dimensions } from "react-native";

// const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

// export const paginateText = async (text: string) => {
//   const words = text.split(" ");
//   let pages = [];
//   let currentPage = "";

//   const size: any = await TextSize.measure({
//     text: text,
//     width: screenWidth - 40, // padding
//     fontSize: 18,
//     lineHeight: 26,
//   });

//   // If adding this word exceeds page height
//   if (size.height > screenHeight - 80) {
//     pages.push(currentPage.trim());
//     currentPage = words[i]; // start next page
//   } else {
//     currentPage = testText;
//   }

//   //   push last page
//   pages.push(currentPage.trim());

//   return pages;
// };
