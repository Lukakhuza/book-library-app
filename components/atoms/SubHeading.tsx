import { Text, View } from "react-native";

type Props = {
  text: string;
};

export const SubHeading = ({ text }: Props) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};
