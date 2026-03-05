import { Text, View, ViewStyle } from "react-native";
import SettingsSubsectionIcon from "../atoms/SettingsSubsectionIcon";
import { Toggle } from "../atoms/Toggle";
import { Theme } from "../../theme";

type SettingSubsectionProps = {
  theme: Theme;
  ioniconIdentifier: string;
  label: string;
  style?: ViewStyle;
};

const SettingsSubsection = ({
  theme,
  ioniconIdentifier,
  label,
  style,
}: SettingSubsectionProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          // borderColor: "blue",
          // borderWidth: 2,
          // width: "100%",
          // justifyContent: "space-between",
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
          // borderColor: "red", borderWidth: 1
          marginLeft: 10,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.colors.accentPrimary,
            fontFamily: "GoogleSans_700Bold",
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          // flex: 1,
          // borderColor: "red",
          // borderWidth: 1,
          alignItems: "flex-end",
        }}
      >
        <Toggle />
      </View>
    </View>
  );
};

export default SettingsSubsection;
