import { lightColors, darkColors } from "./colors";
import { tagStylesDark, tagStylesLight } from "./tagStyles";

export const lightTheme = { colors: lightColors, tagStyles: tagStylesLight };
export const darkTheme = { colors: darkColors, tagStyles: tagStylesDark };

export type Theme = typeof lightTheme;
