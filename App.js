import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import { Button } from "react-native";
import HomeScreen from "./android/screens/HomeScreen";
import SplashScreen from "./android/screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Splash"
      defaultScreenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}