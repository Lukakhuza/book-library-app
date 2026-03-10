import { View, Text, StyleSheet } from "react-native";
import { useScale } from "../../store/ThemeContext";
import { Theme } from "../../theme";

type Props = {
  theme: Theme;
  readingProgress: number;
};

const ProgressText = ({ theme, readingProgress }: Props) => {
  const { fs, ms } = useScale();

  return (
    <View>
      <Text
        style={{
          color: theme.colors.textDisabled,
          fontFamily: "GoogleSans_500Medium",
          fontSize: fs(13),
          lineHeight: fs(13) * 1.2,
          marginVertical: ms(3),
        }}
        numberOfLines={1}
      >
        {`${Math.round(readingProgress * 100)}% - 78 pages left`}
      </Text>
    </View>
  );
};

export default ProgressText;
