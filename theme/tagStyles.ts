import { darkColors, lightColors } from "./colors";

export const tagStylesDark = {
  h1: {
    fontSize: 30,
    fontWeight: "700" as const,
    color: darkColors.textPrimary,
    textAlign: "center" as const,
    marginBottom: 5,
  },
  h2: {
    fontSize: 25,
    fontWeight: "700" as const,
    color: darkColors.textSecondary,
    textAlign: "center" as const,
    marginBottom: 5,
  },
  h3: { color: darkColors.textMuted },
  a: { color: darkColors.textMuted },
  p: {
    color: darkColors.readerText,
    fontSize: 20,
    textAlign: "justify" as const,
    marginBottom: 5,
  },
};

export const tagStylesLight = {
  h1: {
    fontSize: 30,
    fontWeight: "700" as const,
    color: lightColors.textPrimary,
    textAlign: "center" as const,
    marginBottom: 5,
  },
  h2: {
    fontSize: 25,
    fontWeight: "700" as const,
    color: lightColors.textSecondary,
    textAlign: "center" as const,
    marginBottom: 5,
  },
  h3: { color: lightColors.textMuted },
  a: { color: lightColors.textMuted },
  p: {
    color: lightColors.readerText,
    fontSize: 20,
    textAlign: "justify" as const,
    marginBottom: 5,
  },
};
