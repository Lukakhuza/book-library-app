import { Image, ImageStyle } from "react-native";

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
