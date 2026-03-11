import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "../../types/basic";
import { Theme } from "../../theme";

type Props = {
  onPress?: () => void;
  theme: Theme;
  ioniconIdentifier: IoniconName;
};

const PressableIcon = ({ onPress, theme, ioniconIdentifier }: Props) => {
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
