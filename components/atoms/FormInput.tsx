import { useController } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import { FormInputProps } from "../../types/user";

export const FormInput = ({
  control,
  clearErrors,
  name,
  label,
  ...inputProps
}: FormInputProps) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <>
      <TextInput
        label={label}
        mode="flat"
        value={field.value ?? ""}
        onChangeText={(text) => {
          field.onChange(text);
          if (fieldState.error) clearErrors(name);
        }}
        onBlur={field.onBlur}
        error={!!fieldState.error}
        {...inputProps}
      />
      <HelperText type="error" visible={!!fieldState.error}>
        {fieldState.error?.message}
      </HelperText>
    </>
  );
};
