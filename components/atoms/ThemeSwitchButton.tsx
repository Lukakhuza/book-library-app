import { View, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

type CustomStyles = {
  viewStyle?: ViewStyle;
};

export const ThemeSwitchButton = ({ viewStyle }: CustomStyles) => {
  return (
    <View
      style={[
        {
          borderColor: "black",
          backgroundColor: Colors.dark.bgChip,
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
          // justifyContent: "space-between",
          width: 95,
        },
        viewStyle,
      ]}
    >
      <Ionicons name={"sunny-outline"} size={25} color={"#D4A96A"} />
      <Text
        style={{
          color: "#D4A96A",
          paddingHorizontal: 10,
        }}
      >
        Light
      </Text>
    </View>
  );
};
