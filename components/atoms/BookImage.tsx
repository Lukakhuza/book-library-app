import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  ImageStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../../types/navigation";
import { Colors } from "../../constants/colors";

type BookImageProps = {
  imgUri: string;
  width: number;
  customStyle?: ImageStyle;
};

export const BookImage = ({ imgUri, width, customStyle }: BookImageProps) => {
  return (
    <Image
      source={{
        uri: imgUri,
      }}
      style={[{ width: width, height: width * 1.5 }, customStyle]}
      resizeMode="cover"
    />
  );
};
