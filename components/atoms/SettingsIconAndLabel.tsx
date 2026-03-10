import { View, Text } from "react-native";
import SettingsScreen from "../../screens/Settings";
import SettingsSubsectionIcon from "./SettingsSubsectionIcon";

const SettingsIconAndLabel = ({
  label,
  labelColor,
  theme,
  ioniconIdentifier,
}: any) => {
  return (
    <View>
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
    </View>
  );
};

export default SettingsIconAndLabel;
