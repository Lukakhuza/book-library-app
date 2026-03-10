import { Text, View, ViewStyle } from "react-native";
import SettingsSubsectionIcon from "../atoms/SettingsSubsectionIcon";
import { Toggle } from "../atoms/Toggle";
import { Theme } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { IoniconName } from "../../types/basic";

type SettingSubsectionProps = {
  theme: Theme;
  ioniconIdentifier: IoniconName;
  label: string;
  labelColor?: string;
  style?: ViewStyle;
  controllerType: "toggle" | "arrow";
};

const SettingsSubsection = ({
  theme,
  ioniconIdentifier,
  label,
  labelColor,
  style,
  controllerType,
}: SettingSubsectionProps) => {
  let controller;

  if (controllerType === "arrow") {
    controller = (
      <Ionicons
        name="chevron-forward-outline"
        size={30}
        color={theme.colors.textMuted}
      />
    );
  } else if (controllerType === "toggle") {
    controller = <Toggle theme={theme} />;
  }

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
          style={{
            color: labelColor ?? theme.colors.accentPrimary,
            fontFamily: "GoogleSans_700Bold",
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        {controller}
      </View>
    </View>
  );
};

export default SettingsSubsection;
