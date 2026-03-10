import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PressableIcon = ({ onPress, theme, ioniconIdentifier }: any) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Ionicons
          //   name={isDark ? "sunny-outline" : "sunny-sharp"}
          name={ioniconIdentifier}
          size={24}
          color={theme.colors.accentPrimary}
        />
      </Pressable>
    </View>
  );
};

export default PressableIcon;
