import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

type Props = {
  message: string;
  theme: any;
};

const LoadingOverlay = ({ message, theme }: Props) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.message, { color: theme.colors.textPrimary }]}>
        {message}
      </Text>
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
