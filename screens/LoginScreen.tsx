// import { Button, Text, View } from "react-native";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Container } from "../components/atoms/Container";
import { createUser, loginUser } from "../api/users.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { emailSchema, passwordSchema } from "../util/schemas";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../types/navigation";
import { AuthContext } from "../store/AuthContext";

type LoginForm = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const LoginScreen = () => {
  const navigation: AppNavigationProp = useNavigation();
  const { signIn, signOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    clearErrors,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      setShowPassword(false);
      const { token, refreshToken } = await loginUser(values);
      await signIn(token);
      console.log("RefreshToken: ", refreshToken);
    } catch (error) {
      resetField("password");
      Alert.alert(`Error: ${error.name}`, error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Email"
                mode="flat"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.email) clearErrors("email");
                }}
                onBlur={onBlur}
                disabled={isSubmitting}
                error={!!errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email?.message}
              </HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Password"
                mode="flat"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.password) clearErrors("password");
                }}
                onBlur={onBlur}
                error={!!errors.password}
                secureTextEntry={!showPassword}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                disabled={isSubmitting}
                onSubmitEditing={() => {
                  if (!isSubmitting) handleSubmit(onSubmit)();
                }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    disabled={isSubmitting}
                    onPress={() => setShowPassword((prev) => !prev)}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password?.message}
              </HelperText>
            </>
          )}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          Log In
        </Button>
        <View style={styles.signupRow}>
          <Text>Don't have an account?</Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Button>
        </View>
        <Button
          mode="text"
          onPress={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { marginBottom: 24, textAlign: "center" },
  input: { marginTop: 12 },
  button: { marginTop: 16 },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
