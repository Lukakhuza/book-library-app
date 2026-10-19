import { Control, UseFormClearErrors } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { z } from "zod";
import { signupFormSchema } from "../util/schemas";

export type UserInputType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | undefined;
};

export type SignupForm = z.infer<typeof signupFormSchema>;

export type FormInputProps = {
  control: Control<SignupForm>;
  clearErrors: UseFormClearErrors<SignupForm>;
  name: keyof SignupForm;
  label: string;
} & Omit<
  React.ComponentProps<typeof TextInput>,
  "value" | "onChangeText" | "onBlur" | "error" | "label"
>;
