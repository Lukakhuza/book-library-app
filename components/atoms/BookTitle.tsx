import { Text } from "react-native";
import { useScale } from "../../store/ThemeContext";
import { Theme } from "../../theme";

type Props = {
  theme: Theme;
  title: string;
};

const BookTitle = ({ theme, title }: Props) => {
  const { fs, ms } = useScale();

  return (
    <Text
      ellipsizeMode="tail"
      numberOfLines={2}
      style={{
        fontSize: fs(20),
        fontFamily: "GoogleSans_700Bold",
        color: theme.colors.textPrimary,
        lineHeight: ms(24),
        includeFontPadding: true,
      }}
    >
      {title}
    </Text>
  );
};

export default BookTitle;
