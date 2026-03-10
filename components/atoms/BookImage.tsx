import { Image, View, ImageStyle, StyleSheet } from "react-native";

type BookImageProps = {
  imgUri: string;
  width: number;
  customImageStyle?: ImageStyle;
};

export const BookImage = ({
  imgUri,
  width,
  customImageStyle,
}: BookImageProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imgUri,
        }}
        style={[{ width: width, height: width * 1.5 }, customImageStyle]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
});
