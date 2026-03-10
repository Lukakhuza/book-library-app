import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Theme } from "../../theme";
import { IoniconName } from "../../types/basic";

type Props = {
  ioniconIdentifier: IoniconName;
  theme: Theme;
};

const SettingsSubsectionIcon = ({ ioniconIdentifier, theme }: Props) => {
  return (
    <View
      style={{
        padding: 5,
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 5,
        margin: 5,
      }}
    >
      <Ionicons
        name={ioniconIdentifier}
        size={20}
        color={theme.colors.accentPrimary}
      />
    </View>
  );
};

export default SettingsSubsectionIcon;
