import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  message: string;
};

const LoadingOverlay = ({ message }: Props) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  message: {
    fontSize: 15,
  },
});
