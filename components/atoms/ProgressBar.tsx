import { View, ViewStyle } from "react-native";

type Props = {
  progress: number;
  customStyle?: ViewStyle;
};

export const ProgressBar = ({ progress, customStyle }: Props) => {
  // progress is a value between 0 and 1 (e.g. 0.68 = 68%)
  return (
    <View
      style={[
        {
          height: 4,
          backgroundColor: "#3D372F", // track color
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
          backgroundColor: "#D4A96A", // fill color
          borderRadius: 2,
        }}
      />
    </View>
  );
};
