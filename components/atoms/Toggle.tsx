import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";

export const Toggle = () => {
  const [isOn, setIsOn] = useState(true);
  const translateX = useState(new Animated.Value(isOn ? 22 : 2))[0];

  const toggle = () => {
    const toValue = isOn ? 2 : 22;
    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
    setIsOn((v) => !v);
  };

  return (
    <Pressable
      onPress={toggle}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: isOn ? "#C9A84C" : "#3A3220" },
        ]}
      >
        <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
  },
  knob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
});
