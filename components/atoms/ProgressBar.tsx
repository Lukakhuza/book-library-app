import { StyleSheet, View, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { useScale } from "../../store/ThemeContext";

type Props = {
  progress: number;
  customStyle?: ViewStyle;
  theme: Theme;
};

export const ProgressBar = ({ progress, customStyle, theme }: Props) => {
  const { ms } = useScale();
  const { accentPrimary, bgChip } = theme.colors;

  return (
    <View
      style={[
        styles.outer,
        {
          height: ms(4),
          backgroundColor: bgChip,
        },
        customStyle,
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            width: `${progress * 100}%`,
            backgroundColor: accentPrimary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: { borderRadius: 2, overflow: "hidden" },
  inner: { height: "100%", borderRadius: 2 },
});
