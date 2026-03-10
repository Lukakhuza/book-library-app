import { Text } from "react-native";
import { useScale } from "../../store/ThemeContext";
import { Theme } from "../../theme";

type Props = {
  theme: Theme;
  author: string;
};

const BookAuthor = ({ theme, author }: Props) => {
  const { fs, ms } = useScale();

  return (
    <Text
      style={{
        fontFamily: "GoogleSans_500Medium",
        color: theme.colors.textMuted,
        fontSize: fs(15),
        lineHeight: fs(15) * 1.2,
        marginBottom: ms(7),
        marginVertical: ms(4),
      }}
      numberOfLines={1}
    >
      {author}
    </Text>
  );
};

export default BookAuthor;
