import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const SettingsSubsectionIcon = ({ ioniconIdentifier, theme }: any) => {
  return (
    <View
      style={{
        // flex: 1,
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
