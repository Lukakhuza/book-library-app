import { Text, View, ViewStyle } from "react-native";
import SettingsSubsectionIcon from "../atoms/SettingsSubsectionIcon";
import { Toggle } from "../atoms/Toggle";
import { Theme } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

type SettingSubsectionProps = {
  theme: Theme;
  ioniconIdentifier: string;
  label: string;
  style?: ViewStyle;
  labelColor?: string;
};

const SettingsSubsection2 = ({
  theme,
  ioniconIdentifier,
  label,
  labelColor,
  style,
}: SettingSubsectionProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 15,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View>
        <SettingsSubsectionIcon
          ioniconIdentifier={ioniconIdentifier}
          theme={theme}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            {
              fontFamily: "GoogleSans_700Bold",
              fontSize: 16,
              color: labelColor ?? theme.colors.accentPrimary,
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color={theme.colors.textMuted}
        />
      </View>
    </View>
  );
};

export default SettingsSubsection2;
