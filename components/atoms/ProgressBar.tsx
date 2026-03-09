import { View, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type Props = {
  progress: number;
  customStyle?: ViewStyle;
  theme: Theme;
};

export const ProgressBar = ({ progress, customStyle, theme }: Props) => {
  const { ms } = useScale();

  return (
    <View
      style={[
        {
          height: ms(4),
          backgroundColor: theme.colors.bgChip,
          borderRadius: 2,
          overflow: "hidden",
        },
        customStyle,
      ]}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: theme.colors.accentPrimary,
          borderRadius: 2,
        }}
      />
    </View>
  );
};
