import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/screen/Dashboard";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "./src/screen/LoginScreen";
import Register from "./src/screen/Register";
import SpashScreen from "./src/screen/SpashScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  const globalScreenOptons = {
    headerStyle: { backgroundColor: "#2c6BED" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={globalScreenOptons}>
          <Stack.Screen
            name="Splash"
            component={SpashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
