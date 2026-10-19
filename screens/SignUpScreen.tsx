// screens/SignUpScreen.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { createUser } from "../api/users.api";
import { FormInput } from "../components/atoms/FormInput";
import { useTheme } from "../store/ThemeContext";
import { SignupForm } from "../types/user";
import LoadingOverlay from "../util/LoadingOverlay";
import { signupFormSchema } from "../util/schemas";
import { RootStackProp } from "../types/navigation";

const SignUpScreen = () => {
  const navigation = useNavigation<RootStackProp>();
  const { theme, isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ confirmPassword, ...values }: SignupForm) => {
    setIsLoading(true);
    const payload = { ...values, phoneNumber: values.phoneNumber || undefined };
    try {
      await createUser(payload);
      navigation.navigate("Tabs", { screen: "Home" });
      Alert.alert("Success", "Your Account has been created.");
    } catch (error) {
      Alert.alert(`Error: ${error.name}`, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const eyeIcon = (
    <TextInput.Icon
      icon={showPassword ? "eye-off" : "eye"}
      onPress={() => setShowPassword((prev) => !prev)}
    />
  );

  if (isLoading)
    return <LoadingOverlay theme={theme} message="Creating User..." />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text variant="headlineMedium" style={styles.title}>
          Create account
        </Text>

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="firstName"
          label="First name"
          autoCapitalize="words"
          autoComplete="given-name"
          textContentType="givenName"
        />
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="lastName"
          label="Last name"
          autoCapitalize="words"
          autoComplete="family-name"
          textContentType="familyName"
        />
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="phoneNumber"
          label="Phone number (optional)"
          keyboardType="phone-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
        />
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="password"
          label="Password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          right={eyeIcon}
        />
        <HelperText type="info" style={styles.hint}>
          At least 8 characters, one uppercase letter and one number
        </HelperText>
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="confirmPassword"
          label="Confirm password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={() => {
            if (!isSubmitting) handleSubmit(onSubmit)();
          }}
          right={eyeIcon}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.loginRow}>
          <Text variant="bodyMedium">Already have an account?</Text>
          <Button mode="text" compact onPress={() => navigation.goBack()}>
            Log in
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  title: { marginBottom: 24, textAlign: "center" },
  hint: { marginTop: -8 },
  button: { marginTop: 16 },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
