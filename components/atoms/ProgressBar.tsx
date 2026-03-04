import { View, ViewStyle } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  progress: number;
  customStyle?: ViewStyle;
  theme: any;
};

export const ProgressBar = ({ progress, customStyle, theme }: Props) => {
  // progress is a value between 0 and 1 (e.g. 0.68 = 68%)
  return (
    <View
      style={[
        {
          height: 4,
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
