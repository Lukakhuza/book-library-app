// import { useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Button, Pressable, View, Text } from "react-native";
import { Container } from "../components/atoms/Container";
// import { Colors } from "../constants/Colors";
import { Header } from "../components/atoms/Header";
import { useTheme } from "../store/ThemeContext";
import { HomeStackNavigationProp } from "../types/navigation";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";
import { Ionicons } from "@expo/vector-icons";
import { Toggle } from "../components/atoms/Toggle";
import { SubHeading } from "../components/atoms/SubHeading";
import SettingsSubsectionIcon from "../components/atoms/SettingsSubsectionIcon";
import SettingsSubsection from "../components/molecules/SettingsSubsection";

const SettingsScreen = () => {
  const navigation: HomeStackNavigationProp = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // borderColor: "brown",
          alignItems: "flex-start",
          // borderWidth: 2,
          marginVertical: 5,
        }}
      >
        <Header text="Settings" theme={theme} />
        <ThemeSwitchButton
          // viewStyle={{ marginRight: 5, marginTop: 5 }}
          onPress={() => {
            toggleTheme();
          }}
          theme={theme}
          isDark={isDark}
        />
      </View>
      <View>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: theme.colors.bgElevated,
            height: 130,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          })}
        >
          <View
            style={{
              // borderColor: "blue",
              // borderWidth: 2,
              flex: 3,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.accentPrimary,
                borderRadius: 100,
                width: 70,
                height: 70,
                // flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 30,
                  color: theme.colors.textPrimary,
                }}
              >
                A
              </Text>
            </View>
          </View>
          <View
            style={{
              // borderColor: "blue",
              // borderWidth: 2,
              flex: 7,
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 1, justifyContent: "space-around" }}>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto_700Bold",
                    fontSize: 23,
                    color: theme.colors.textPrimary,
                  }}
                >
                  Avid Reader
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "GoogleSans_500Medium",
                    color: theme.colors.textMuted,
                    fontSize: 15,
                  }}
                >
                  reader@gmail.com
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    borderColor: theme.colors.textMuted,
                    borderWidth: 0.5,
                    flex: 1,
                    marginRight: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <Ionicons name="book" size={20} color={"orange"} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: theme.colors.accentPrimary }}>
                      42
                    </Text>
                    <Text style={{ color: theme.colors.accentPrimary }}>
                      Books
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderColor: theme.colors.textMuted,
                    borderWidth: 0.5,
                    flex: 1,
                    marginLeft: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 5,
                  }}
                >
                  <View>
                    <Ionicons name="flame" size={20} color={"orange"} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: theme.colors.accentPrimary }}>
                      14 Day
                    </Text>
                    <Text style={{ color: theme.colors.accentPrimary }}>
                      Streak
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              // borderColor: "blue",
              // borderWidth: 2,
              flex: 2,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderColor: theme.colors.textMuted,
                borderRadius: 20,
                width: 40,
                height: 40,
                borderWidth: 0.5,
                paddingLeft: 3,
                // paddingVertical: 10,
                // paddingRight: 5,
              }}
            >
              <Ionicons
                name="chevron-forward-outline"
                size={30}
                color={theme.colors.textMuted}
              />
            </View>
          </View>
        </Pressable>
      </View>
      <SubHeading
        text="Notifications"
        theme={theme}
        style={{ marginLeft: 10, marginBottom: 5 }}
      />
      {/* <View> */}
      <View
        style={{
          backgroundColor: theme.colors.bgElevated,
          height: 200,
          borderRadius: 20,
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 20,
          // paddingVertical: 10,
          // paddingHorizontal: 15,
          // justifyContent: "space-between",
          // flexDirection: "row",
          // alignItems: "center",
        }}
      >
        <SettingsSubsection
          label="Push Notifications"
          ioniconIdentifier="notifications"
          theme={theme}
          style={{
            borderBottomColor: theme.colors.textMuted,
            borderBottomWidth: 0.5,
          }}
        />
        <SettingsSubsection
          label="Daily Reading Goal"
          ioniconIdentifier="reader"
          theme={theme}
          style={{
            borderBottomColor: theme.colors.textMuted,
            borderBottomWidth: 0.5,
          }}
        />
        <SettingsSubsection
          label="Weekly Digest"
          ioniconIdentifier="calendar"
          theme={theme}
        />
      </View>
      {/* </View> */}
      {/* <Button
        title="Go Home"
        color={theme.colors.bgCard}
        onPress={() => {
          navigation.navigate("Home");
        }}
      /> */}
    </Container>
  );
};

export default SettingsScreen;
