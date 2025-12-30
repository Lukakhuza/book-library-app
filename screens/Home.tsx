import { Image, Text, View } from "react-native";

const Home = () => {
  return (
    <View>
      <Text>Home Page</Text>
      <Image
        source={require("../assets/book/The-Bell-Jar.jpg")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default Home;
