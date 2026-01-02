import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
};

export default BookStack;
