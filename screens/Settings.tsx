import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Container } from "../components/atoms/Container";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/atoms/Header";
import { SubHeading } from "../components/atoms/SubHeading";
import { ThemeSwitchButton } from "../components/atoms/ThemeSwitchButton";
import SettingsSubsection from "../components/molecules/SettingsSubsection";
import { useTheme } from "../store/ThemeContext";
import { HomeStackNavigationProp } from "../types/navigation";

const SettingsScreen = () => {
  const navigation: HomeStackNavigationProp = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginVertical: 5,
        }}
      >
        <Header text="Settings" theme={theme} />
        <ThemeSwitchButton
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
      <ScrollView>
        <SubHeading
          text="Notifications"
          theme={theme}
          style={{ marginLeft: 10, marginBottom: 5 }}
        />
        <View
          style={{
            backgroundColor: theme.colors.bgElevated,
            height: 200,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            marginBottom: 20,
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
            controllerType="toggle"
          />
          <SettingsSubsection
            label="Daily Reading Goal"
            ioniconIdentifier="reader"
            theme={theme}
            style={{
              borderBottomColor: theme.colors.textMuted,
              borderBottomWidth: 0.5,
            }}
            controllerType="toggle"
          />
          <SettingsSubsection
            label="Weekly Digest"
            ioniconIdentifier="calendar"
            theme={theme}
            controllerType="toggle"
          />
        </View>

        <SubHeading
          text="Account"
          theme={theme}
          style={{ marginLeft: 10, marginBottom: 5 }}
        />
        <View
          style={{
            backgroundColor: theme.colors.bgElevated,
            height: 400,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            marginBottom: 20,
          }}
        >
          <SettingsSubsection
            label="Subscription"
            ioniconIdentifier="card-outline"
            theme={theme}
            style={{
              borderBottomColor: theme.colors.textMuted,
              borderBottomWidth: 0.5,
            }}
            controllerType="arrow"
          />
          <SettingsSubsection
            label="Privacy & Security"
            ioniconIdentifier="lock-closed"
            theme={theme}
            style={{
              borderBottomColor: theme.colors.textMuted,
              borderBottomWidth: 0.5,
            }}
            controllerType="arrow"
          />
          <SettingsSubsection
            label="Sync & Backup"
            ioniconIdentifier="cloud"
            theme={theme}
            style={{
              borderBottomColor: theme.colors.textMuted,
              borderBottomWidth: 0.5,
            }}
            controllerType="arrow"
          />
          <SettingsSubsection
            label="Rate the App"
            ioniconIdentifier="star"
            theme={theme}
            style={{
              borderBottomColor: theme.colors.textMuted,
              borderBottomWidth: 0.5,
            }}
            controllerType="arrow"
          />
          <SettingsSubsection
            label="Help & Support"
            ioniconIdentifier="help-circle-sharp"
            theme={theme}
            controllerType="arrow"
          />
        </View>

        <View
          style={{
            backgroundColor: theme.colors.bgElevated,
            height: 80,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            marginBottom: 20,
          }}
        >
          <SettingsSubsection
            label="Log Out"
            labelColor={theme.colors.accentDanger}
            ioniconIdentifier="log-out-outline"
            theme={theme}
            controllerType="arrow"
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SettingsScreen;
