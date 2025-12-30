import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Reader from "../screens/Reader";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Reader" component={Reader} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
